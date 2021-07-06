import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import appReducer from './slices/appSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {user: userState, app: appState}
export type AppDispatch = typeof store.dispatch
