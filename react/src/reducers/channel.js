const initialState = {
  channel: undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'CONNECT_SUCCESSFUL':
      return {
        ...state,
        channel: action.channel,
      };
    case 'DISCONNECTED':
      return {
        ...state,
        channel: undefined,
      };
    default:
      return state;
  }
}
