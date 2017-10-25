defmodule Combox.Repo.Migrations.CreateComments do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :message, :text, null: false
      add :name, :string
      add :email, :string
      add :votes_balance, :integer, null: false, default: 0
      add :subject_id, references(
        :subjects, on_delete: :restrict, on_update: :update_all
      )
      add :user_id, references(
        :users, on_delete: :restrict, on_update: :update_all
      )
      add :parent_id, references(
        :comments, on_delete: :restrict, on_update: :update_all
      )

      timestamps()
    end

    create index(:comments, [:subject_id])
    create index(:comments, [:user_id])
    create index(:comments, [:parent_id])
  end
end
