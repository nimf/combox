import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';
import CommentNode from './CommentNode';

const propTypes = {
  comments: PropTypes.object.isRequired,
  currentCommentId: PropTypes.number,
  onFocusedRendered: PropTypes.func.isRequired,
  onOpenNewComments: PropTypes.func.isRequired,
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

  onOpenNewComments = () =>
    this.props.onOpenNewComments(this.props.currentCommentId);

  render() {
    const currentComments = this.props.comments.allIds.map(id => this.props.comments.byId[id])
      .filter(c => c.parentId === this.props.currentCommentId);
    const hiddenCount = currentComments.filter(c => c.hidden).length;
    if (currentComments.length === 0) return null;
    const listOfComments = currentComments.filter(c => !c.hidden).map(comment =>
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
            onOpenNewComments={this.onOpenNewComments}
          />
        </CommentNode>
      ));
    return (
      <Comment.Group threaded={this.props.currentCommentId === null}>
        {listOfComments}
        {hiddenCount > 0 &&
          <Comment>
            <Comment.Content>
              <Comment.Author
                as="a"
                onClick={
                  this.onOpenNewComments
                }
              >
                {hiddenCount > 1
                  ? `${hiddenCount} new comments`
                  : '1 new comment'
                }
              </Comment.Author>
            </Comment.Content>
          </Comment>
        }
      </Comment.Group>
    );
  }
}

CommentsTree.propTypes = propTypes;
CommentsTree.defaultProps = defaultProps;

export default CommentsTree;
