import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import 'scroll-behaviour/polyfill';
import { connectToChannel } from './actions/channel';
import { saveDraft, postComment, focusComment } from './actions/subject';
import CommentBox from './components/CommentBox';
import CommentsCount from './components/CommentsCount';
import CommentsTree from './components/CommentsTree';
import './App.css';

const propTypes = {
  connectToChannel: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  focusComment: PropTypes.func.isRequired,
  channelConnected: PropTypes.bool.isRequired,
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
    connectToChannel, saveDraft, postComment, focusComment,
  },
)(App);
