defmodule ComboxWeb.CommentViewTest do
  use ComboxWeb.ConnCase, async: true

  # import Phoenix.View
  import Combox.Factory
  alias ComboxWeb.CommentView

  test "renders comment" do
    comment = insert(:comment)
    assert Phoenix.View.render_one(comment, CommentView, "comment.json") ==
      %{
        id: comment.id,
        inserted_at: (comment.inserted_at |> NaiveDateTime.to_iso8601) <> "Z",
        message: comment.message,
        name: comment.name,
        votes: comment.votes_balance,
        user_id: comment.user_id,
        parent_id: comment.parent_id
      }
  end

  test "renders child comment" do
    comment = insert(:comment)
    child = insert(:comment, %{
      subject: comment.subject, parent: comment
    })
    assert Phoenix.View.render_one(child, CommentView, "comment.json") ==
      %{
        id: child.id,
        inserted_at: (child.inserted_at |> NaiveDateTime.to_iso8601) <> "Z",
        message: child.message,
        name: child.name,
        votes: child.votes_balance,
        user_id: child.user_id,
        parent_id: comment.id
      }
  end
end
