defmodule Combox.Repo.Migrations.CreateSubjects do
  use Ecto.Migration

  def change do
    create table(:subjects) do
      add :title, :string
      add :url, :string, null: false
      add :comments_count, :integer, null: false, default: 0
      add :resource_id, references(
        :resources, on_delete: :restrict, on_update: :update_all
      ), null: false

      timestamps()
    end

    create unique_index(:subjects, [:url])
    create index(:subjects, [:resource_id])
  end
end
