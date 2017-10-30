export function saveDraft(text) {
  return dispatch => dispatch({
    type: 'SAVE_DRAFT',
    text,
  });
}

export function postComment(channel, displayName, text) {
  return (dispatch) => {
    console.log(`Posting comment as ${displayName} with text "${text}"...`);
    channel.push('post_comment', { name: displayName, message: text })
      .receive('ok', () => {
        dispatch({ type: 'CLEAR_DRAFT' });
      })
      .receive('error', () => {
        console.error('Could not post comment');
      });
    return dispatch;
  };
}
