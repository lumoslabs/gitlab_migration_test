import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

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

export const sendTextQuery = createAsyncThunk(
  'interactiveCanvas/sendTextQuery',
  async ({ query, state }: { query: string, state: Record<any, any> }) => {
    if (state) {
      window.interactiveCanvas?.setCanvasState(state)
    }
    const result = await window.interactiveCanvas?.sendTextQuery(query)
    if (result !== 'SUCCESS') {
      console.error('interactiveCanvas - sendTextQuery - incorrect result', { query, state }, result)
    }
    return result as string
  }
)

export const exitContinuousMatchMode = createAsyncThunk(
  'interactiveCanvas/exitContinuousMatchMode',
  async () => {
    try {
      window.interactiveCanvas?.exitContinuousMatchMode()
    } catch (e) {
      console.error('interactiveCanvas - exitContinuousMatchMode - exception', e)
    }
  }
)

export const outputTts = createAsyncThunk(
  'interactiveCanvas/outputTts',
  async ({ text, prompt }: {
    text: string,
    prompt: boolean
  }) => {
    try {
      window.interactiveCanvas?.outputTts(text, prompt)
    } catch (e) {
      console.error('interactiveCanvas - outputTts - exception', e)
    }
  }
)


const initialState: {
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
  scores: Record<string, { score: number, data: string }>
} = {
  tts: TtsMarkName.START,
  started: false,
  baseUrl: '',
  authToken: null,
  lastTextQueryState: sendTextQueryState.UNKNOWN,
  continuousMatchMode: false,
  lastGameCommand: null,
  scores: {}
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
    setStarted: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ baseUrl: string, authToken: string }>
    ) => {
      state.started = true
      if (action?.payload?.baseUrl) {
        state.baseUrl = action?.payload?.baseUrl
      }
      if (action?.payload?.authToken) {
        state.authToken = action?.payload?.authToken
      }
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
      action: PayloadAction<{ slug: string, scores: { score: number, data: string } }>
    ) => {
      state.scores[action.payload.slug] = action.payload.scores
    }
  },
  extraReducers: (builder) => {
    builder.addCase(sendTextQuery.fulfilled, (state, action) => {
      state.lastTextQueryState = action.payload as sendTextQueryState
    }).addCase(sendTextQuery.rejected, (state) => {
      state.lastTextQueryState = sendTextQueryState.ERROR
    }).addCase(sendTextQuery.pending, (state) => {
      state.lastTextQueryState = sendTextQueryState.PENDING
    })
  },
})


// Selectors
export const getAppState = (state) => state.app
export const getTts = (state) => state.app.tts
export const getIsStarted = (state) => state.app.started
export const getBaseUrl = (state) => state.app.baseUrl
export const getAuthToken = (state) => state.app.authToken
export const getSendTextQueryState = (state) => state.app.lastTextQueryState
export const getContinuousMatchMode = (state) => state.app.continuousMatchMode
export const getLastGameCommand = (state) => state.app.lastGameCommand
export const getTopScores = (state) => state.app.scores

// Reducers and actions
export const actions = appSlice.actions

export default appSlice.reducer
