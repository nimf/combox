const initialState = {
  id: undefined,
  commentsCount: undefined,
  draftComment: '',
  comments: {
    byId: {},
    allIds: [],
    focusedId: null,
  },
};

const getDraft = id =>
  localStorage.getItem(`subj:${id}:draft`) || '';

const saveDraft = (id, text) =>
  localStorage.setItem(`subj:${id}:draft`, text);

const clearDraft = id =>
  localStorage.removeItem(`subj:${id}:draft`);

const fillComments = comments =>
  ({
    byId: comments.length > 0 ? Object.assign(...comments.map(c => ({
      [c.id]: c,
    }))) : {},
    allIds: comments.map(c => c.id),
  });

const openComments = (commentsById, commentId) => {
  const commentIds = Object.keys(commentsById);
  if (commentIds.length === 0) return {};
  return Object.assign(...commentIds.map(id => (
    {
      [id]: commentsById[id].parentId === commentId
        ? { ...commentsById[id], hidden: false }
        : commentsById[id],
    })));
};

const toggleReply = (commentsById, commentId) => {
  const stringId = commentId.toString();
  return Object.assign(...Object.keys(commentsById).map(id => (
    {
      [id]: id === stringId
        ? { ...commentsById[id], replyOpened: !commentsById[id].replyOpened }
        : commentsById[id],
    })));
};

const setReply = (commentsById, commentId, text) => {
  const stringId = commentId.toString();
  return Object.assign(...Object.keys(commentsById).map(id => (
    {
      [id]: id === stringId
        ? { ...commentsById[id], replyText: text }
        : commentsById[id],
    })));
};

const clearReply = (commentsById, commentId) => {
  return commentId === null
    ? commentsById
    : toggleReply(setReply(commentsById, commentId, ''), commentId);
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SUBJECT_INFO_LOADED':
      return {
        ...state,
        id: action.response.subject.id,
        commentsCount: action.response.subject.comments_count,
        draftComment: getDraft(action.response.subject.id),
        comments: {
          ...state.comments,
          ...fillComments(action.response.comments),
        },
      };
    case 'SAVE_DRAFT':
      saveDraft(state.id, action.text);
      return {
        ...state,
        draftComment: action.text,
      };
    case 'NEW_OWN_COMMENT':
      clearDraft(state.id);
      return {
        ...state,
        commentsCount: state.commentsCount + 1,
        draftComment: '',
        comments: {
          ...state.comments,
          byId: {
            ...clearReply(
              openComments(state.comments.byId, action.comment.parentId),
              action.comment.parentId,
            ),
            [action.comment.id]: action.comment,
          },
          allIds: [...state.comments.allIds, action.comment.id],
          focusedId: action.comment.id,
        },
      };
    case 'NEW_COMMENT':
      return {
        ...state,
        commentsCount: state.commentsCount + 1,
        comments: {
          ...state.comments,
          byId: {
            ...state.comments.byId,
            [action.comment.id]: {
              ...action.comment,
              hidden: true,
            },
          },
          allIds: [...state.comments.allIds, action.comment.id],
        },
      };
    case 'CLEAR_COMMENT_FOCUS':
      return {
        ...state,
        comments: {
          ...state.comments,
          focusedId: null,
        },
      };
    case 'OPEN_NEW_COMMENTS':
      return {
        ...state,
        comments: {
          ...state.comments,
          byId: openComments(state.comments.byId, action.commentId),
        },
      };
    case 'TOGGLE_REPLY':
      return {
        ...state,
        comments: {
          ...state.comments,
          byId: toggleReply(state.comments.byId, action.commentId),
        },
      };
    case 'REPLY_CHANGED':
      return {
        ...state,
        comments: {
          ...state.comments,
          byId: setReply(state.comments.byId, action.commentId, action.text),
        },
      };
    default:
      return state;
  }
}
