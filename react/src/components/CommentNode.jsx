import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Comment, Popup, Label, Form, Button } from 'semantic-ui-react';

const propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    authorName: PropTypes.string.isRequired,
    avatarHash: PropTypes.string,
    isGuest: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  fresh: PropTypes.bool,
  onToggleReply: PropTypes.func.isRequired,
  onReplyChange: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
  children: PropTypes.node,
};
const defaultProps = {
  fresh: false,
  children: null,
};

function CommentNode({
  comment, onToggleReply, onReplyChange, onReply, fresh, children,
}) {
  return (
    <Comment id={`comment-${comment.id}`} className={fresh ? 'fresh' : ''}>
      <Comment.Avatar
        as="a"
        src={`https://www.gravatar.com/avatar/${
            comment.avatarHash || '00000000000000000000000000000000'
          }?s=100`}
      />
      <Comment.Content>
        <Comment.Author as="span">
          <span>{comment.authorName}</span>
          { comment.isGuest && <Label size="mini">Guest</Label>}
        </Comment.Author>
        <Comment.Metadata>
          <Popup
            trigger={<div>{moment(comment.createdAt).fromNow()}</div>}
            content={moment(comment.createdAt).format('lll')}
            size="mini"
            inverted
          />
        </Comment.Metadata>
        <Comment.Text>
          <p>{comment.message}</p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action active={comment.replyOpen} onClick={onToggleReply}>Reply</Comment.Action>
        </Comment.Actions>
        { comment.replyOpened &&
          <Form reply onSubmit={onReply}>
            <Form.TextArea
              autoHeight
              rows={2}
              value={comment.replyText}
              placeholder="Leave a reply..."
              onChange={onReplyChange}
            />
            <Button
              content="Reply"
              labelPosition="left"
              icon="edit"
              disabled={
                !(comment.replyText && comment.replyText.trim().length > 0)
              }
              primary
            />
          </Form>
        }
      </Comment.Content>
      {children}
    </Comment>
  );
}

CommentNode.propTypes = propTypes;
CommentNode.defaultProps = defaultProps;

export default CommentNode;
