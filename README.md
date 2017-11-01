### Comment box web application example

This application is created merely for educational purposes.
I wanted to gain knowledge in Elixir and React.js and this application is a result of my studying attempt.

To try the app locally in development mode you need to:
- Install PostgreSQL, Elixir, node, yarn
- Clone the project
- `cd phoenix`
- `mix deps.get`
- Configure your database credentials in `phoenix/config/dev.secret.exs` (copy it from `dev.exs`)
- `mix ecto.create`
- `mix run priv/repo/seeds.exs`
- `mix phx.server`
- Then in another terminal
- `cd react`
- `yarn install`
- `yarn start` - it should open the app in Chrome browser
