import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Comment, Popup, Label } from 'semantic-ui-react';

const propTypes = {
  id: PropTypes.number.isRequired,
  authorName: PropTypes.string.isRequired,
  avatarHash: PropTypes.string,
  isGuest: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  children: PropTypes.node,
};
const defaultProps = {
  avatarHash: '00000000000000000000000000000000',
  children: null,
};

function CommentNode({
  id, authorName, avatarHash, isGuest, createdAt, message, children,
}) {
  return (
    <Comment>
      <Comment.Avatar
        as="a"
        src={`https://www.gravatar.com/avatar/${avatarHash}?s=100`}
      />
      <Comment.Content>
        <Comment.Author as="span">
          <span>{authorName}</span>
          { isGuest && <Label size="mini">Guest</Label>}
        </Comment.Author>
        <Comment.Metadata>
          <Popup
            trigger={<div>{moment(createdAt).fromNow()}</div>}
            content={moment(createdAt).format('lll')}
            size="mini"
            inverted
          />
        </Comment.Metadata>
        <Comment.Text>
          <p>{message}</p>
        </Comment.Text>
        <Comment.Actions>
          Reply
        </Comment.Actions>
      </Comment.Content>
      {children}
    </Comment>
  );
}

CommentNode.propTypes = propTypes;
CommentNode.defaultProps = defaultProps;

export default CommentNode;
