import React from 'react';
import renderer from 'react-test-renderer';
import CommentNode from './CommentNode';
import CommentsTree from './CommentsTree';
import commentsFixture from '../fixtures/comments';

const commentFixture = commentsFixture.byId[3];
const commentWithChild = commentsFixture.byId[1];

const renderComment = comment =>
  renderer.create(<CommentNode
    id={comment.id}
    authorName={comment.authorName}
    isGuest={comment.isGuest}
    createdAt={comment.createdAt}
    message={comment.message}
  >
    <CommentsTree
      comments={commentsFixture}
      currentCommentId={comment.id}
      onFocusedRendered={() => {}}
    />
  </CommentNode>).toJSON();

describe('CommentNode renders', () => {
  test('renders comment without children', () => {
    const tree = renderComment(commentFixture);
    expect(tree).toMatchSnapshot();
  });

  test('renders comment with children', () => {
    const tree = renderComment(commentWithChild);
    expect(tree).toMatchSnapshot();
  });
});
