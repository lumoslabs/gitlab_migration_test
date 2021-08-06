import { AnyAction, configureStore, Dispatch } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

export default function createAppStore() {
  return configureStore({
    reducer: rootReducer,
  })
}


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {app: appState}
export type AppDispatch = Dispatch<AnyAction>
