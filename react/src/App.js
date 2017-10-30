import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { connectToChannel } from './actions/channel';
import { saveDraft, postComment } from './actions/subject';
import CommentBox from './components/CommentBox';
import CommentsCount from './components/CommentsCount';
import './App.css';

const propTypes = {
  connectToChannel: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  channelConnected: PropTypes.bool.isRequired,
  displayName: PropTypes.string,
  channel: PropTypes.object,
  commentsCount: PropTypes.number,
  draftComment: PropTypes.string,
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
  }),
  { connectToChannel, saveDraft, postComment },
)(App);
