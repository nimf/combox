defmodule Combox.Comment do
  use Ecto.Schema
  import Ecto.Changeset
  alias Combox.{Comment, User, Subject}


  schema "comments" do
    field :email, :string
    field :message, :string
    field :name, :string, default: "Anonymous"
    field :votes_balance, :integer, default: 0

    belongs_to :subject, Subject
    belongs_to :user, User
    belongs_to :parent, Comment

    timestamps()
  end

  @doc false
  def changeset_for_insert(%Comment{} = comment, attrs) do
    comment
    |> cast(attrs, [:message, :name, :email, :votes_balance])
    |> validate_required([:message, :subject_id])
    |> assoc_constraint(:subject)
    |> assoc_constraint(:parent)
    |> prepare_changes(fn changeset ->
      Ecto.assoc(changeset.data, :subject)
      |> changeset.repo.update_all(inc: [comments_count: 1])
      changeset
    end)
  end
end
