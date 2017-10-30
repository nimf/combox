import React from 'react';
import renderer from 'react-test-renderer';
import CommentBox from './CommentBox';

describe('CommentBox renders', () => {
  test('renders with text with enabled button', () => {
    const tree = renderer.create(<CommentBox
      text="Test comment"
      enabled={true}
      onChange={() => {}}
      onSubmit={() => {}}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders without text with disabled button', () => {
    const tree = renderer.create(<CommentBox
      text=""
      enabled={true}
      onChange={() => {}}
      onSubmit={() => {}}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders disabled with disabled button', () => {
    const tree = renderer.create(<CommentBox
      text="Test comment"
      enabled={false}
      onChange={() => {}}
      onSubmit={() => {}}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
