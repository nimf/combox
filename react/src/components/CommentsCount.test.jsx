import React from 'react';
import renderer from 'react-test-renderer';
import CommentsCount from './CommentsCount';

describe('CommentsCount renders', () => {
  test('CommentsCount renders undefined count', () => {
    const tree = renderer.create(<CommentsCount
      count={undefined}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('CommentsCount renders zero count', () => {
    const tree = renderer.create(<CommentsCount
      count={0}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('CommentsCount renders 1 count', () => {
    const tree = renderer.create(<CommentsCount
      count={1}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('CommentsCount renders 2 count', () => {
    const tree = renderer.create(<CommentsCount
      count={2}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
