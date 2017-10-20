_October 20, 2017_

## Objective

Build a comment box web application.

First, we need to think about the functionality of the application. It is obvious that it must allow a site visitors to make a comment to some content on a page. We also would like users to be able to vote comments up or down. It is also nice to have comment threads - when users can reply to a comment. And it will be really nice if we can have real-time updates: i. e. when somebody upvotes a comment its votes update instantly in every other user browser; or if somebody adds new comment, a button appears on the page for other users saying "1 new comment", when that button is clicked new comment appears.
This is how features look like from a user perspective. But there are many other requirements. Like, the app must be easily embedded on any website, there should be an administration page for site owners, where they can configure the behavior of the app, moderate comments, ban users, manage moderators/admins, etc.

Looks like we have tasks for weeks ahead. So let's start with basic user-facing functionality, keeping in mind what we will have to do later.

I choose Phoenix for this app, as it has channels for our real-time functionality and it suites regular web app requirements as well.
For the front end, I choose React.js.
We will provide site owners with a small javascript script, which will create an iframe on their pages and load our user-facing react app in this iframe. The react app will communicate with our Phoenix back end via a channel. We will not build standard REST API for our front end, as we can pass all the required data in a channel both ways. We can build REST API later if we will need to expose it to other parties.
