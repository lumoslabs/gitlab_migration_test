import { AsyncThunk, configureStore } from '@reduxjs/toolkit'
import axios, { AxiosInstance } from 'axios'
import InteractiveUserStorage from './InteractiveUserStorage'
import rootReducer from './rootReducer'

export default function createAppStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            interactiveUserStorage: new InteractiveUserStorage(),
            axios: axios.create()
          }
        }
      }),
  })
}

export type thunkApiExtended = {
  state: RootState,
  extra: {
    interactiveUserStorage: InteractiveUserStorage,
    axios: AxiosInstance
  }
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>


type StoreType = ReturnType<typeof createAppStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {app: appState}
export type AppDispatch = StoreType["dispatch"]
