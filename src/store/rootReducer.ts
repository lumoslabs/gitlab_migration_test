import { combineReducers } from '@reduxjs/toolkit'

import scores from './slices/scores';
import ageGate from './slices/ageGate';
import user from './slices/user';
import training from './slices/training';
import session from './slices/session';

const rootReducer = combineReducers({
  scores,
  ageGate,
  user,
  training,
  session
})

export default rootReducer
