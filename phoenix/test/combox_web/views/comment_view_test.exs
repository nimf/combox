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
        createdAt: (comment.inserted_at |> NaiveDateTime.to_iso8601) <> "Z",
        message: comment.message,
        isGuest: true,
        authorName: comment.name,
        votes: comment.votes_balance,
        userId: comment.user_id,
        parentId: comment.parent_id
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
        createdAt: (child.inserted_at |> NaiveDateTime.to_iso8601) <> "Z",
        message: child.message,
        isGuest: true,
        authorName: child.name,
        votes: child.votes_balance,
        userId: child.user_id,
        parentId: comment.id
      }
  end
end
