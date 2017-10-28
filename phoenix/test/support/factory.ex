defmodule Combox.Factory do
  use ExMachina.Ecto, repo: Combox.Repo
  alias Combox.{User, Resource, Subject, Comment}

  def user_factory do
    %User{
      name: sequence("name"),
      email: sequence("email", &"email-#{&1}@example.com"),
      password_hash: "somehash",
    }
  end

  def resource_factory do
    %Resource{
      title: sequence("resource_title"),
      url: sequence("resource_url", &"website#{&1}.url"),
      owner: build(:user),
    }
  end

  def subject_factory do
    %Subject{
      title: sequence("title"),
      url: sequence("subject_url", &"website.url/article/#{&1}"),
      resource: build(:resource),
    }
  end

  def comment_factory do
    %Comment{
      message: sequence("message"),
      subject: build(:subject),
    }
  end
end
