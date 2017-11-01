defmodule Combox.CommentTest do
  use Combox.DataCase

  alias Combox.{Repo, Subject, Comment}

  @valid_attrs %{message: "Comment text"}
  @invalid_attrs %{}

  test "comment must belong to a subject" do
    changeset = Comment.changeset_for_insert(%Comment{}, @valid_attrs)
    refute changeset.valid?
  end

  test "changeset with valid attributes is valid and updates count" do
    subject = insert(:subject, %{url: "some.url/articles/1"})
    changeset = subject
      |> Ecto.build_assoc(:comments)
      |> Comment.changeset_for_insert(@valid_attrs)

    assert changeset.valid?
    assert 0 == subject.comments_count
    Repo.insert(changeset)
    subject = Repo.get!(Subject, subject.id)
    assert 1 == subject.comments_count
  end

  test "changeset with invalid attributes" do
    changeset = insert(:subject, %{url: "some.url/articles/1"})
      |> Ecto.build_assoc(:comments)
      |> Comment.changeset_for_insert(@invalid_attrs)

    refute changeset.valid?
  end
end
