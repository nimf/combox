import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { App } from './App';
import CommentBox from './components/CommentBox';
import CommentsCount from './components/CommentsCount';

test('App renders correctly', () => {
  const tree = renderer.create(<App
    connectToChannel={() => {}}
    saveDraft={() => {}}
    postComment={() => {}}
    channelConnected={false}
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
      channelConnected={false}
    />);
  });

  it('renders the component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('renders CommentsCount and CommentBox', () => {
    expect(wrapper.find(CommentsCount).length).toEqual(1);
    expect(wrapper.find(CommentBox).length).toEqual(1);
  });
});
