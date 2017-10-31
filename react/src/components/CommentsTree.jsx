import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';
import CommentNode from './CommentNode';

const propTypes = {
  comments: PropTypes.object.isRequired,
  currentCommentId: PropTypes.number,
};
const defaultProps = {
  currentCommentId: null,
};

function CommentsTree({
  comments, currentCommentId,
}) {
  const currentComments = comments.allIds.map(id => comments.byId[id])
    .filter(c => c.parentId === currentCommentId);
  if (currentComments.length === 0) return null;
  return (
    <Comment.Group threaded={currentCommentId === null}>
      {currentComments.map(comment =>
        (
          <CommentNode
            key={comment.id}
            id={comment.id}
            authorName={comment.authorName}
            isGuest={comment.isGuest}
            createdAt={comment.createdAt}
            message={comment.message}
          >
            <CommentsTree comments={comments} currentCommentId={comment.id} />
          </CommentNode>
        ))
      }
    </Comment.Group>
  );
}

CommentsTree.propTypes = propTypes;
CommentsTree.defaultProps = defaultProps;

export default CommentsTree;
