export function saveDraft(text) {
  return dispatch => dispatch({
    type: 'SAVE_DRAFT',
    text,
  });
}

const pushComment = (dispatch, channel, params) => {
  channel.push('post_comment', params)
    .receive('ok', (response) => {
      dispatch({ type: 'NEW_OWN_COMMENT', comment: response.comment });
    })
    .receive('error', () => {
      console.error('Could not post comment');
    });
};

export function postComment(channel, displayName, text) {
  return (dispatch) => {
    pushComment(dispatch, channel, { name: displayName, message: text });
  };
}

export function focusComment(commentId) {
  return (dispatch) => {
    document.querySelector(`#comment-${commentId}`)
      .scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_COMMENT_FOCUS' });
    }, 1000);
  };
}

export function openNewComments(commentId) {
  return (dispatch) => {
    dispatch({ type: 'OPEN_NEW_COMMENTS', commentId });
  };
}

export function toggleReply(commentId) {
  return (dispatch) => {
    dispatch({ type: 'TOGGLE_REPLY', commentId });
  };
}

export function replyChanged(commentId, text) {
  return (dispatch) => {
    dispatch({ type: 'REPLY_CHANGED', commentId, text });
  };
}

export function reply(commentId) {
  return (dispatch, getState) => {
    const {
      channel: { channel },
      user: {
        displayName,
      },
      subject: {
        comments: {
          byId,
        },
      },
    } = getState();
    pushComment(dispatch, channel, {
      name: displayName,
      message: byId[commentId].replyText,
      parent_id: commentId,
    });
  };
}
