defmodule Combox.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Combox.{User, Resource}


  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string

    has_many :resources, Resource, foreign_key: :owner_id

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :name, :password_hash])
    |> validate_required([:email, :name, :password_hash])
    |> unique_constraint(:email)
  end
end
