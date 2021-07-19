import { combineReducers } from '@reduxjs/toolkit'

import userReducer from './slices/userSlice';
import appReducer from './slices/appSlice';

export default combineReducers({
  user: userReducer,
  app: appReducer,
})
