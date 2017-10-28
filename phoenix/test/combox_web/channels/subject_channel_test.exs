defmodule ComboxWeb.SubjectChannelTest do
  use ComboxWeb.ChannelCase

  alias ComboxWeb.SubjectChannel

  setup do
    insert(:subject, %{url: "some.url/articles/1"})
    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(SubjectChannel, "subject:some.url/articles/1")

    {:ok, socket: socket}
  end

  test "not existing subject returns no such subject" do
    assert {:error, %{reason: "no such subject"}} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(SubjectChannel, "subject:some.url/articles/0")
  end

  test "existing subject returns subject info" do
    assert {:ok, reply, _socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(SubjectChannel, "subject:some.url/articles/1")
    assert %{subject: %{comments_count: 0}} = reply
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
