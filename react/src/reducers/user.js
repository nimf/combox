const initialState = {
  displayName: localStorage.getItem('displayName') || 'Anonymous',
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
