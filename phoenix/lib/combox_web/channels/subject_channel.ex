defmodule ComboxWeb.SubjectChannel do
  use ComboxWeb, :channel
  alias Phoenix.View
  alias Combox.{Repo, Subject, Comment, ChangesetView}

  def join("subject:" <> subject_url, _payload, socket) do
    case Repo.get_by(Subject, url: subject_url) do
      nil -> {:error, %{reason: "no such subject"}}
      subject -> {
        :ok,
        %{subject: %{id: subject.id, comments_count: subject.comments_count}},
        assign(socket, :subject, subject)
      }
    end
  end

  def handle_in("post_comment", params, socket) do
    changeset =
      socket.assigns.subject
      |> Ecto.build_assoc(:comments, user_id: socket.assigns[:user_id])
      |> Comment.changeset(params)

    case Repo.insert(changeset) do
      {:ok, _message} ->
        {:reply, :ok, socket}
      {:error, changeset} ->
        {:reply, {:error, View.render(
          ChangesetView, "error.json", changeset: changeset
        )}, socket}
    end
  end
end
