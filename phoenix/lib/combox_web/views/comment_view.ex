defmodule ComboxWeb.CommentView do
  use ComboxWeb, :view

  def render("comment.json", %{comment: comment}) do
    %{
      id: comment.id,
      # We add Z to the timestamp, because it is stored as UTC time, but
      # default formatting to ISO8601 does not adds "Z" which means UTC time
      createdAt: (comment.inserted_at |> NaiveDateTime.to_iso8601) <> "Z",
      message: comment.message,
      isGuest: true,
      authorName: comment.name,
      votes: comment.votes_balance,
      userId: comment.user_id,
      parentId: comment.parent_id
    }
  end
end
