defmodule ComboxWeb.SubjectChannelTest do
  use ComboxWeb.ChannelCase

  alias ComboxWeb.{SubjectChannel, CommentView}

  setup do
    subject = insert(:subject)
    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(SubjectChannel, "subject:" <> subject.url)

    {:ok, socket: socket, subject: subject}
  end

  test "not existing subject returns no such subject" do
    assert {:error, %{reason: "no such subject"}} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(SubjectChannel, "subject:some.url/articles/0")
  end

  test "existing subject returns subject info and comments",
    %{subject: subject} do
    comment = insert(:comment, %{subject: subject})
    assert {:ok, reply, _socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(SubjectChannel, "subject:" <> subject.url)

    assert %{subject: %{comments_count: 0, id: subject.id}, comments:
      Phoenix.View.render_many([comment], CommentView, "comment.json")
    } == reply
  end

  test "broadcasts are pushed to the client", %{socket: socket} do
    broadcast_from! socket, "broadcast", %{"some" => "data"}
    assert_push "broadcast", %{"some" => "data"}
  end

  test "anonymous posts a comment succesfully", %{socket: socket} do
    ref = push socket, "post_comment",
      %{"name" => "Anonymous", "message" => "Comment text"}
    assert_reply ref, :ok
  end

  test "posting comment without a message fails", %{socket: socket} do
    ref = push socket, "post_comment",
      %{"name" => "Anonymous", "message" => ""}
    assert_reply ref, :error, %{errors: %{message: ["can't be blank"]}}
  end
end
