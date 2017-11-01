import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';
import CommentNode from './CommentNode';

const propTypes = {
  comments: PropTypes.object.isRequired,
  currentCommentId: PropTypes.number,
  onFocusedRendered: PropTypes.func.isRequired,
};
const defaultProps = {
  currentCommentId: null,
};

class CommentsTree extends Component {
  componentDidUpdate() {
    if (this.props.comments.focusedId !== null &&
        this.props.comments.byId[this.props.comments.focusedId].parentId ===
        this.props.currentCommentId) {
      // If we rendered a comment that must receive focus, report it
      this.props.onFocusedRendered();
    }
  }
  render() {
    const currentComments = this.props.comments.allIds.map(id => this.props.comments.byId[id])
      .filter(c => c.parentId === this.props.currentCommentId);
    if (currentComments.length === 0) return null;
    const listOfComments = currentComments.map(comment =>
      (
        <CommentNode
          key={comment.id}
          id={comment.id}
          authorName={comment.authorName}
          isGuest={comment.isGuest}
          createdAt={comment.createdAt}
          message={comment.message}
          fresh={this.props.comments.focusedId === comment.id}
        >
          <CommentsTree
            comments={this.props.comments}
            currentCommentId={comment.id}
            onFocusedRendered={this.props.onFocusedRendered}
          />
        </CommentNode>
      ));
    return (
      <Comment.Group threaded={this.props.currentCommentId === null}>
        {listOfComments}
      </Comment.Group>
    );
  }
}

CommentsTree.propTypes = propTypes;
CommentsTree.defaultProps = defaultProps;

export default CommentsTree;
