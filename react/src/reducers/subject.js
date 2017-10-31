const initialState = {
  id: undefined,
  commentsCount: undefined,
  draftComment: '',
  comments: {
    byId: {},
    allIds: [],
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
    byId: Object.assign(...comments.map(c => ({
      [c.id]: {
        id: c.id,
        authorName: c.name,
        isGuest: true,
        createdAt: c.inserted_at,
        message: c.message,
        parentId: c.parent_id,
      },
    }))),
    allIds: comments.map(c => c.id),
  });

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SUBJECT_INFO_LOADED':
      return {
        ...state,
        id: action.response.subject.id,
        commentsCount: action.response.subject.comments_count,
        draftComment: getDraft(action.response.subject.id),
        comments: fillComments(action.response.comments),
      };
    case 'SAVE_DRAFT':
      saveDraft(state.id, action.text);
      return {
        ...state,
        draftComment: action.text,
      };
    case 'CLEAR_DRAFT':
      clearDraft(state.id);
      return {
        ...state,
        draftComment: '',
      };
    default:
      return state;
  }
}
