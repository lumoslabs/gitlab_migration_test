import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/index'
import { TtsMarkName } from '@sharedTypes/interactiveCanvas'

interface appState {
  tts?: TtsMarkName,
  started: boolean,
  baseUrl: string,
  authToken?: string,
  continuousMatchMode: boolean,
  scores: Record<string, { score: number, date: string }[]>,
  training: {
    games: string[],
    size: number,
    deadline: number
  } | null,
  tutorialSeen: Record<string, boolean>,
  user?: {
    id?: string,
    name?: string,
    email?: string,
    avatar?: string,
    timezone?: string,
    isLinked?: boolean,
    isGuest?: boolean,
    isAgeVerified?: boolean,
  }
}

const initialState: appState = {
  tts: null,
  started: false,
  baseUrl: '',
  authToken: null,
  continuousMatchMode: false,
  scores: {},
  training: null,
  user: null,
  tutorialSeen: {}
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
      state.tutorialSeen = action.payload?.tutorialSeen ?? state.tutorialSeen
    },
    setContinuousMatchMode: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ cmm: boolean }>
    ) => {
      state.continuousMatchMode = Boolean(action?.payload?.cmm)
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
    },
    setTutorial: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ slug: string }>
    ) => {
      state.tutorialSeen[action.payload.slug] = true
    },
  }
})


// Selectors
export const getAppState = (state: RootState) => state.app
export const getTts = (state: RootState) => state.app.tts
export const getIsStarted = (state: RootState) => state.app.started
export const getBaseUrl = (state: RootState) => state.app.baseUrl
export const getAuthToken = (state: RootState) => state.app.authToken
export const getContinuousMatchMode = (state: RootState) => state.app.continuousMatchMode
export const getTopScores = (state: RootState) => state.app.scores
export const getTraining = (state: RootState) => state.app.training
export const getTutorialSeen = (state: RootState) => state.app.tutorialSeen
export const getUser = (state: RootState) => state.app.user

// Reducers and actions
export const actions = appSlice.actions

export default appSlice.reducer
