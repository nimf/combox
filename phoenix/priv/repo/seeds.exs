# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Combox.Repo.insert!(%Combox.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Combox.{Repo, User, Resource, Subject}

user = Repo.insert! %User{
  email: "test@test.test",
  name: "Test User",
  password_hash: "test"
}

resource = Repo.insert! %Resource{
  title: "Test website",
  url: "some.url",
  owner_id: user.id
}

Repo.insert! %Subject{
  title: "Test page",
  url: "some.url/articles/1",
  resource_id: resource.id
}
