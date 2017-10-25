defmodule Combox.Repo.Migrations.CreateResources do
  use Ecto.Migration

  def change do
    create table(:resources) do
      add :title, :string, null: false
      add :url, :string, null: false
      add :owner_id, references(
        :users, on_delete: :restrict, on_update: :update_all
      ), null: false

      timestamps()
    end

    create unique_index(:resources, [:url])
    create index(:resources, [:owner_id])
  end
end
