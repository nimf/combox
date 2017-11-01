import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { App } from './App';
import CommentBox from './components/CommentBox';
import CommentsCount from './components/CommentsCount';
import CommentsTree from './components/CommentsTree';
import commentsFixture from './fixtures/comments';

test('App renders correctly', () => {
  const tree = renderer.create(<App
    connectToChannel={() => {}}
    saveDraft={() => {}}
    postComment={() => {}}
    openNewComments={() => {}}
    focusComment={() => {}}
    channelConnected={false}
    comments={commentsFixture}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('App Shallow Render', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App
      connectToChannel={() => {}}
      saveDraft={() => {}}
      postComment={() => {}}
      openNewComments={() => {}}
      focusComment={() => {}}
      channelConnected={false}
      comments={{ byId: {}, allIds: [] }}
    />);
  });

  it('renders the component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('renders CommentsCount, CommentBox and CommentsTree', () => {
    expect(wrapper.find(CommentsCount).length).toEqual(1);
    expect(wrapper.find(CommentBox).length).toEqual(1);
    expect(wrapper.find(CommentsTree).length).toEqual(1);
  });
});
