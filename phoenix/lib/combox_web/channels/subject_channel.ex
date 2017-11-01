defmodule ComboxWeb.SubjectChannel do
  use ComboxWeb, :channel
  alias Phoenix.View
  alias Combox.{Repo, Subject, Comment}
  alias ComboxWeb.{ChangesetView, CommentView}
  import Ecto.Query, only: [where: 3, order_by: 2]
  import Ecto.Changeset, only: [put_change: 3]

  def join("subject:" <> subject_url, _payload, socket) do
    case Repo.get_by(Subject, url: subject_url) do
      nil -> {:error, %{reason: "no such subject"}}
      subject -> {
        :ok,
        %{
          subject: %{id: subject.id, comments_count: subject.comments_count},
          comments: View.render_many(
            Comment
            |> where([c], c.subject_id == ^subject.id)
            |> order_by([asc: :inserted_at, asc: :id])
            |> Repo.all,

            CommentView, "comment.json"
          )
        },
        assign(socket, :subject, subject)
      }
    end
  end

  def handle_in("post_comment", params, socket) do
    parent_id =
      case params["parent_id"] do
        nil -> nil
        parent_id ->
          parent = Repo.get!(Comment, parent_id)
          if (parent.subject_id == socket.assigns.subject.id) do
            parent.id
          else
            nil
          end
      end
    changeset =
      socket.assigns.subject
      |> Ecto.build_assoc(:comments, user_id: socket.assigns[:user_id])
      |> Comment.changeset_for_insert(params)
      |> put_change(:parent_id, parent_id)

    case Repo.insert(changeset) do
      {:ok, comment} ->
        comment_json = View.render_one(comment, CommentView, "comment.json")
        broadcast_from! socket, "new_comment", %{comment: comment_json}
        {:reply, {:ok, %{comment: comment_json}}, socket}
      {:error, changeset} ->
        {:reply, {:error, View.render(
          ChangesetView, "error.json", changeset: changeset
        )}, socket}
    end
  end
end
