import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/index'

interface SessionStorage {
  isWelcomeState: boolean,
  isLoaded: boolean,
  baseUrl: string,
  isGuest: boolean,
}

const initialState: SessionStorage = {
  isWelcomeState: true,
  isLoaded: false,
  baseUrl: '/',
  isGuest: false
} as const



export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setWelcomeState: (state) => {
      state.isWelcomeState = false
    },
    onInteractiveUpdate: (state, action: PayloadAction<any>) => {
      state.isLoaded = true
      if (typeof action.payload === 'object') {
        if (action.payload.baseUrl) {
          state.baseUrl = action.payload.baseUrl
        }
        if (action.payload.isGuest) {
          state.isGuest = Boolean(action.payload.isGuest)
        }
      }
    }
  }
})

export const selectWelcomeState = (state: RootState) => state.session.isWelcomeState
export const selectIsGuest = (state: RootState) => state.session.isGuest
export const selectBaseUrl = (state: RootState) => state.session.baseUrl

// Reducers and actions
export const { setWelcomeState, onInteractiveUpdate } = sessionSlice.actions

export default sessionSlice.reducer
