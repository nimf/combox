import React from 'react';
import renderer from 'react-test-renderer';
import CommentNode from './CommentNode';
import CommentsTree from './CommentsTree';
import commentsFixture from '../fixtures/comments';

const commentFixture = commentsFixture.byId[3];
const commentWithChild = commentsFixture.byId[1];

const renderComment = comment =>
  renderer.create(<CommentNode
    comment={comment}
    onToggleReply={() => {}}
    onReplyChange={() => {}}
    onReply={() => {}}
  >
    <CommentsTree
      comments={commentsFixture}
      currentCommentId={comment.id}
      onFocusedRendered={() => {}}
      onOpenNewComments={() => {}}
      onToggleReply={() => {}}
      onReplyChange={() => {}}
      onReply={() => {}}
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
