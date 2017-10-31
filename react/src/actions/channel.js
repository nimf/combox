import { Socket } from 'phoenix';

const WEBSOCKET_URL = 'ws://localhost:3000/socket';
// TODO: Subject url must be received from query string
const CHANNEL_TOPIC = 'subject:some.url/articles/1';

function connectToSocket(dispatch) {
  const socket = new Socket(WEBSOCKET_URL, {
    params: {},
    logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); },
  });
  socket.connect();
  const channel = socket.channel(CHANNEL_TOPIC);

  channel.join().receive('ok', (response) => {
    dispatch({ type: 'CONNECT_SUCCESSFUL', channel });
    dispatch({ type: 'SUBJECT_INFO_LOADED', response });
  }).receive('error', () => {
    dispatch({ type: 'DISCONNECTED' });
  });
}

export function connectToChannel() {
  return dispatch => connectToSocket(dispatch);
}
