defmodule Combox.CommentTest do
  use Combox.DataCase

  alias Combox.{Comment}

  @valid_attrs %{message: "Comment text"}
  @invalid_attrs %{}

  test "comment must belong to a subject" do
    changeset = Comment.changeset(%Comment{}, @valid_attrs)
    refute changeset.valid?
  end

  test "changeset with valid attributes" do
    changeset = insert(:subject, %{url: "some.url/articles/1"})
      |> Ecto.build_assoc(:comments)
      |> Comment.changeset(@valid_attrs)

    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = insert(:subject, %{url: "some.url/articles/1"})
      |> Ecto.build_assoc(:comments)
      |> Comment.changeset(@invalid_attrs)

    refute changeset.valid?
  end
end
