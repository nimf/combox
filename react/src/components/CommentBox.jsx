import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

const propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired,
};
const defaultProps = {
  text: '',
};

function CommentBox({
  text, onChange, onSubmit, enabled,
}) {
  return (
    <Form onSubmit={onSubmit}>
      <Form.TextArea
        autoHeight
        rows={2}
        value={text}
        onChange={onChange}
        placeholder="Leave a comment..."
      />
      <Button
        disabled={!enabled || text.trim().length === 0}
        content="Add Comment"
        labelPosition="left"
        icon="edit"
        primary
      />
    </Form>
  );
}

CommentBox.propTypes = propTypes;
CommentBox.defaultProps = defaultProps;

export default CommentBox;
