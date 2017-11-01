import React from 'react';
import renderer from 'react-test-renderer';
import CommentsTree from './CommentsTree';
import commentsFixture from '../fixtures/comments';

describe('CommentsTree renders', () => {
  test('renders root comments and below', () => {
    const tree = renderer.create(<CommentsTree
      comments={commentsFixture}
      onFocusedRendered={() => {}}
      onOpenNewComments={() => {}}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
