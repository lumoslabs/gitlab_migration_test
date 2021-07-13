import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

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
    return result as string
  }
)

const initialState: {
  tts: TtsMarkName,
  started: boolean,
  lastTextQueryState: sendTextQueryState,
  continuosMatchMode: boolean,
  lastParsedPhrase: Record<string, any> | null
} = {
  tts: TtsMarkName.START,
  started: false,
  lastTextQueryState: sendTextQueryState.UNKNOWN,
  continuosMatchMode: false,
  lastParsedPhrase: null
} as const


export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTts: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ tts: TtsMarkName }>
    ) => {
      state.tts = action.payload.tts;
    },
    setStarted: (
      state: Draft<typeof initialState>
    ) => {
      state.started = true
    },
    setContinuosMatchMode: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ cmm: boolean }>
    ) => {
      state.continuosMatchMode = Boolean(action?.payload?.cmm)
    },
    setParsedPhrase: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ phrase: Record<string, any> }>
    ) => {
      state.lastParsedPhrase = action.payload.phrase
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
export const getTts = (state) => state.app.tts
export const getIsStarted = (state) => state.app.started
export const getSendTextQueryState = (state) => state.app.lastTextQueryState
export const getContinuosMatchMode = (state) => state.app.continuosMatchMode
export const getLastParsedPhrase = (state) => state.app.lastParsedPhrase

// Reducers and actions
export const actions = appSlice.actions

export default appSlice.reducer
