export function saveDraft(text) {
  return dispatch => dispatch({
    type: 'SAVE_DRAFT',
    text,
  });
}

export function postComment(channel, displayName, text) {
  return (dispatch) => {
    channel.push('post_comment', { name: displayName, message: text })
      .receive('ok', (response) => {
        dispatch({ type: 'NEW_OWN_COMMENT', comment: response.comment });
      })
      .receive('error', () => {
        console.error('Could not post comment');
      });
    return dispatch;
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
