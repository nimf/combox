import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

const propTypes = {
  count: PropTypes.number,
};

const defaultProps = {
  count: undefined,
};

function CommentsCount({ count }) {
  let displayCount = 'Loading comments...';
  if (count !== undefined) {
    displayCount = count > 0
      ? `${count} comment${count > 1 ? 's' : ''}`
      : 'No comments yet';
  }
  return <Header as="h4">{displayCount}</Header>;
}

CommentsCount.propTypes = propTypes;
CommentsCount.defaultProps = defaultProps;

export default CommentsCount;
