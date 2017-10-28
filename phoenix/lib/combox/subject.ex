defmodule Combox.Subject do
  use Ecto.Schema
  import Ecto.Changeset
  alias Combox.{Subject, Resource, Comment}


  schema "subjects" do
    field :title, :string
    field :url, :string
    field :comments_count, :integer

    belongs_to :resource, Resource
    has_many :comments, Comment

    timestamps()
  end

  @doc false
  def changeset(%Subject{} = subject, attrs) do
    subject
    |> cast(attrs, [:title, :url])
    |> validate_required([:title, :url])
    |> unique_constraint(:url)
  end
end
