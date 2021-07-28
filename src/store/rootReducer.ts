import { combineReducers } from '@reduxjs/toolkit'

import appReducer from './slices/appSlice';

export default combineReducers({
  app: appReducer,
})
