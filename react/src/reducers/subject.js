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

const openComments = (commentsById, commentId) =>
  Object.assign(...Object.keys(commentsById).map(id => (
    {
      [id]: commentsById[id].parentId === commentId
        ? { ...commentsById[id], hidden: false }
        : commentsById[id],
    })));

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
        draftComment: '',
        comments: {
          ...state.comments,
          byId: {
            ...openComments(state.comments.byId, action.comment.parentId),
            [action.comment.id]: action.comment,
          },
          allIds: [...state.comments.allIds, action.comment.id],
          focusedId: action.comment.id,
        },
      };
    case 'NEW_COMMENT':
      return {
        ...state,
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
        }
      };
    default:
      return state;
  }
}
