defmodule Combox.Comment do
  use Ecto.Schema
  import Ecto.Changeset
  alias Combox.{Comment, User, Subject}


  schema "comments" do
    field :email, :string
    field :message, :string
    field :name, :string, default: "Anonymous"
    field :votes_balance, :integer

    belongs_to :subject, Subject
    belongs_to :user, User
    belongs_to :parent, Comment

    timestamps()
  end

  @doc false
  def changeset(%Comment{} = comment, attrs) do
    comment
    |> cast(attrs, [:message, :name, :email, :votes_balance])
    |> validate_required([:message, :subject_id])
    |> assoc_constraint(:subject)
  end
end
