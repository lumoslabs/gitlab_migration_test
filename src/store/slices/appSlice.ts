import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/index'
//TODO: split slice to redux folder format

export enum TtsMarkName {
  START = 'START',
  END = 'END',
  ERROR = 'ERROR'
}

export enum sendTextQueryState {
  READY = 'READY',
  BLOCKED = 'BLOCKED',
  UNKNOWN = 'UNKNOWN',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
}

interface appState {
  tts: TtsMarkName,
  started: boolean,
  baseUrl: string,
  authToken?: string,
  lastTextQueryState: sendTextQueryState,
  continuousMatchMode: boolean,
  lastGameCommand: {
    payload: Record<string, any> | null,
    timestamp: number
  } | null
  scores: Record<string, { score: number, date: string }[]>,
  training: {
    games: string[],
    size: number,
    deadline: number
  } | null,
  user?: {
    id?: string,
    name?: string,
    email?: string,
    avatar?: string,
    timezone?: string,
    isLinked?: boolean,
    isGuest?: boolean
  }
}

const initialState: appState = {
  tts: TtsMarkName.START,
  started: false,
  baseUrl: '',
  authToken: null,
  lastTextQueryState: sendTextQueryState.UNKNOWN,
  continuousMatchMode: false,
  lastGameCommand: null,
  scores: {},
  training: null,
  user: null
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
    setStore: (
      state: Draft<typeof initialState>,
      action: PayloadAction<Partial<typeof initialState>>
    ) => {
      state.started = true
      state.baseUrl = action?.payload?.baseUrl ?? state.baseUrl
      state.authToken = action?.payload?.authToken ?? state.authToken
      state.training = action.payload?.training ?? state.training
      state.user = action.payload?.user ?? state.user
    },
    setContinuousMatchMode: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ cmm: boolean }>
    ) => {
      state.continuousMatchMode = Boolean(action?.payload?.cmm)
    },
    setGameCommand: (
      state: Draft<typeof initialState>,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.lastGameCommand = {
        timestamp: (new Date().getTime()),
        payload: action.payload
      }
    },
    setTopScores: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ slug: string, scores: { score: number, date: string }[] }>
    ) => {
      state.scores[action.payload.slug] = action.payload.scores
    },
    resetTopScores: (
      state: Draft<typeof initialState>
    ) => {
      state.scores = {}
    },
    setTrainingGameCompleted: (
      state: Draft<typeof initialState>,
      action: PayloadAction<string>
    ) => {
      state.training.games = state.training.games.filter((game) => game !== action.payload)
    }
  }
})


// Selectors
export const getAppState = (state: RootState) => state.app
export const getTts = (state: RootState) => state.app.tts
export const getIsStarted = (state: RootState) => state.app.started
export const getBaseUrl = (state: RootState) => state.app.baseUrl
export const getAuthToken = (state: RootState) => state.app.authToken
export const getSendTextQueryState = (state: RootState) => state.app.lastTextQueryState
export const getContinuousMatchMode = (state: RootState) => state.app.continuousMatchMode
export const getLastGameCommand = (state: RootState) => state.app.lastGameCommand
export const getTopScores = (state: RootState) => state.app.scores
export const getTraining = (state: RootState) => state.app.training
export const getUser = (state: RootState) => state.app.user

// Reducers and actions
export const actions = appSlice.actions

export default appSlice.reducer
