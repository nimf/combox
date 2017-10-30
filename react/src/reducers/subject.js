const initialState = {
  id: undefined,
  commentsCount: undefined,
  draftComment: '',
};

const getDraft = id =>
  localStorage.getItem(`subj:${id}:draft`) || '';

const saveDraft = (id, text) =>
  localStorage.setItem(`subj:${id}:draft`, text);

const clearDraft = id =>
  localStorage.removeItem(`subj:${id}:draft`);

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SUBJECT_INFO_LOADED':
      return {
        ...state,
        id: action.subject.id,
        commentsCount: action.subject.comments_count,
        draftComment: getDraft(action.subject.id),
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
