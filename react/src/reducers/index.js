import { combineReducers } from 'redux';
import channel from './channel';
import subject from './subject';
import user from './user';

const appReducer = combineReducers({
  channel,
  subject,
  user,
});

export default (state, action) => appReducer(state, action);
