import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import 'scroll-behaviour/polyfill';
import { connectToChannel } from './actions/channel';
import {
  saveDraft, postComment, focusComment, openNewComments, toggleReply,
  replyChanged, reply,
} from './actions/subject';
import CommentBox from './components/CommentBox';
import CommentsCount from './components/CommentsCount';
import CommentsTree from './components/CommentsTree';
import './App.css';

const propTypes = {
  connectToChannel: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  focusComment: PropTypes.func.isRequired,
  openNewComments: PropTypes.func.isRequired,
  channelConnected: PropTypes.bool.isRequired,
  toggleReply: PropTypes.func.isRequired,
  replyChanged: PropTypes.func.isRequired,
  reply: PropTypes.func.isRequired,
  displayName: PropTypes.string,
  channel: PropTypes.object,
  commentsCount: PropTypes.number,
  draftComment: PropTypes.string,
  comments: PropTypes.object.isRequired,
};
const defaultProps = {
  channel: undefined,
  commentsCount: undefined,
  draftComment: '',
  displayName: 'Anonymous',
};

export class App extends Component {
  componentDidMount() {
    this.props.connectToChannel();
  }

  onPostComment = () => {
    this.props.postComment(
      this.props.channel,
      this.props.displayName,
      this.props.draftComment,
    );
  }

  onSaveDraft = (event) => {
    this.props.saveDraft(event.target.value);
  }

  onFocusedRendered = () => {
    this.props.focusComment(this.props.comments.focusedId);
  }

  onOpenNewComments = (commentId) => {
    this.props.openNewComments(commentId);
  }

  onToggleReply = (commentId) => {
    this.props.toggleReply(commentId);
  }

  onReplyChange = (commentId, event) => {
    this.props.replyChanged(commentId, event.target.value);
  }

  onReply = (commentId) => {
    this.props.reply(commentId);
  }

  render() {
    return (
      <div className="App">
        <Segment basic>
          <CommentsCount count={this.props.commentsCount} />
          <CommentBox
            text={this.props.draftComment}
            enabled={this.props.channelConnected}
            onChange={this.onSaveDraft}
            onSubmit={this.onPostComment}
          />
          <CommentsTree
            comments={this.props.comments}
            onFocusedRendered={this.onFocusedRendered}
            onOpenNewComments={this.onOpenNewComments}
            onToggleReply={this.onToggleReply}
            onReplyChange={this.onReplyChange}
            onReply={this.onReply}
          />
        </Segment>
      </div>
    );
  }
}
App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default connect(
  state => ({
    channelConnected: state.channel.channel !== undefined,
    channel: state.channel.channel,
    commentsCount: state.subject.commentsCount,
    draftComment: state.subject.draftComment,
    displayName: state.user.displayName,
    comments: state.subject.comments,
  }),
  {
    connectToChannel,
    saveDraft,
    postComment,
    focusComment,
    openNewComments,
    toggleReply,
    replyChanged,
    reply,
  },
)(App);
