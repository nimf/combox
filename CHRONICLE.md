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

I also added dependencies for linting and testing.

I created CommentBox component where users can add their comments and CommentsCount component to display comments count. The main App component renders these two components. When App component is mounted it calls connectToChannel action, which connects to Phoenix socket and joins a channel for a subject. When joining a channel succeeds, we get subject id and comments count from Phoenix app. CommentBox component saves what user typed in the textarea to the localStorage associating the draft with subject id. When textarea is not empty and channel is connected, CommentBox enables "Add Comment" button. When it is clicked CommentBox calls postComment action, which pushed `post_comment` event to the channel. Then on success textarea gets cleared (later we will also add scroll effect to the created comment). On error we do nothing yet, we will add a notification later. We have some `console.log` here and there, I will also clean them up later.
There are also some minimal tests (unfortunately I had problems setting up Phoenix socket mock with Fauxnix). I like snapshot tests as they allow to quickly test the whole component look.

_October 30, 2017_

Now we need react app to display comments. When a user joins a SubjectChannel we reply with subject id and comments count, I have added comments as well.
You may notice that CommentViewTest duplicates the logic of CommentView and regularly it is a bad practice with leads to brittle tests. But in our case, it is critical that we pass comments through a channel using this format. If we change it without changing the receiving front end part - the app will break. So this test will alert us in case someone will be changing comment JSON representation.

On the react side I have added comments to a subject state and I fill it when we get subject info.
Since we will have threaded comments, I created CommentsTree and CommentNode components.
CommentNode will render a comment itself.
CommentsTree will render all comments for some parent comment (or root comments). It will render each comment as CommentNode with CommentsTree for a comment as a child.

_October 31, 2017_

Great, now we see comments when page loads. But we don't see our newly added comment or comments from other users added after page is loaded. Let's fix that - we will broadcast new comments to all connected users.

I reconsidered JSON rendering of comments. If they will be more like we require them to be in redux store, we will have less transformation code.

We will push new comment to the connection posting it and to other connections differently, because we need to show our own comment immediately and other comments only as a hint like '1 new comment'. So we push new comment in the reply to a `post_comment` event and broadcast it to all other connections as `new_comment` event.

I have also added scrolling to and comment highlighting after posting.

Now we see our own comment after posting and comments posted from other sessions. But all are displayed instantly. Let's add a hint for new comments posted by others.

We mark all comments received with `new_comment` event as hidden. Then in CommentsTree we hide them and count them. After the last visible comment we render a hint displaying new comments count. We provide an action `OPEN_NEW_COMMENTS` which is dispatched when user clicks the hint. Then we unhide all comments in that thread. We also must unhide all hidden comments in the thread when posting a new comment to that thread succeeds, thus we changed `NEW_OWN_COMMENT` reducer as well.

_November 1, 2017_

Now we need to make our Reply buttons work. I've added reply form to CommentNode. And set up Reply button to toggle the form. I also added callbacks to update reply text and post a reply.
And when posting a reply comment succeeds we clear reply form and hide it in `NEW_OWN_COMMENT` reducer.

On the back end, we check parent_id parameter and verify that the Comment exists and belongs to the same Subject.
