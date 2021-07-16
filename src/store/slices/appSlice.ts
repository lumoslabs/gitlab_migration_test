import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import appActions from './appSharedActions'

export enum TtsMarkName {
  START = 'START',
  END = 'END',
  ERROR = 'ERROR'
}

const initialState: {
  tts: TtsMarkName,
  started: boolean
} = {
  tts: TtsMarkName.START,
  started: false
} as const

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTts: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ tts: TtsMarkName }>
    ) => {
      state.tts = action.payload.tts
    },
    [appActions.SET_STARTED]: (
      state: Draft<typeof initialState>
    ) => {
      state.started = true
    }
  },
})

// Selectors
export const getTts = (state) => state.app.tts
export const getIsStarted = (state) => state.app.started

// Reducers and actions
export const actions = appSlice.actions

export default appSlice.reducer
