defmodule Combox.Resource do
  use Ecto.Schema
  import Ecto.Changeset
  alias Combox.{Resource, User, Subject}


  schema "resources" do
    field :title, :string
    field :url, :string

    belongs_to :owner, User
    has_many :subjects, Subject

    timestamps()
  end

  @doc false
  def changeset(%Resource{} = resource, attrs) do
    resource
    |> cast(attrs, [:title, :url])
    |> validate_required([:title, :url])
    |> unique_constraint(:url)
  end
end
