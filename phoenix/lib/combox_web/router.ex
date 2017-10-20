defmodule ComboxWeb.Router do
  use ComboxWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", ComboxWeb do
    pipe_through :api
  end
end
