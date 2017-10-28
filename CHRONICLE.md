_October 20, 2017_

## Objective

Build a comment box web application.

First, we need to think about the functionality of the application. It is obvious that it must allow a site visitors to make a comment to some content on a page. We also would like users to be able to vote comments up or down. It is also nice to have comment threads - when users can reply to a comment. And it will be really nice if we can have real-time updates: i. e. when somebody upvotes a comment its votes update instantly in every other user browser; or if somebody adds new comment, a button appears on the page for other users saying "1 new comment", when that button is clicked new comment appears.
This is how features look like from a user perspective. But there are many other requirements. Like, the app must be easily embedded on any website, there should be an administration page for site owners, where they can configure the behavior of the app, moderate comments, ban users, manage moderators/admins, etc.

Looks like we have tasks for weeks ahead. So let's start with basic user-facing functionality, keeping in mind what we will have to do later.

I choose Phoenix for this app, as it has channels for our real-time functionality and it suites regular web app requirements as well.
For the front end, I choose React.js.
We will provide site owners with a small javascript script, which will create an iframe on their pages and load our user-facing react app in this iframe. The react app will communicate with our Phoenix back end via a channel. We will not build standard REST API for our front end, as we can pass all the required data in a channel both ways. We can build REST API later if we will need to expose it to other parties.

As I don't have extensive experience setting up React apps (I used Rails-generated webpack config for react) I've created our react app with [create-react-app](https://github.com/facebookincubator/create-react-app)

I've set up basic Phoenix app with `mix phx.new combox --no-html --no-brunch` because we will use it only as a back end.

_October 22, 2017_

We will start with an anonymous visitor accessing our app. React app will connect to Phoenix via WebSocket and get a state of the current page.

To distinguish pages to comment on we need a model for pages. But I prefer to call it a Subject because we might want comments not only on pages in the future. Subjects belong to some Resource (in case of pages it is a website), which in turn belongs to a User (website owner), who embedded our app.

So I will create:

- User model
- Resource model, which has many Subjects and belongs to a User
- Subject model, which is identified by URL and belongs to a Resource

This data model does not include any groups/organizations to group resources. This model also does not allow to set up additional administrators/moderators for a resource. I did it intentionally - to be able to try how to remodel and migrate data with Ecto migrations.

Now when we have Subjects we can create our Comment model. It belongs to a Subject, may belong to a User, may have a parent Comment, must have a message, may have anonymous user name and email, must have a votes balance.

_October 26, 2017_

I created a channel for communication with front end react app. I was in need of a quick test of my design, that's why it only allows posting new comments as an anonymous user for now. I also added ex_machina for fixtures and created minimal tests for the Comment schema and SubjectChannel.

_October 27, 2017_

Now we need react app to connect to a Phoenix channel and post a comment via this channel.
I added phoenix library for working with phoenix sockets and channels, redux and redux-thunk for managing app state and async actions, and semantic-ui for ui elements. I also configured a proxy for a websocket to Phoenix app (in production environment we will do it on our load-balancing servers).
