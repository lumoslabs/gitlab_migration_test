import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/index'
import dayjs from 'dayjs'
import clonedeep from 'lodash.clonedeep'

const SCORES_MAX_SIZE = 5
const userStorageKey = 'scores'

interface ScoresStorage {
  storage: Record<string, { score: number, date: string }[]>,
  loaded: boolean,
  loading: boolean,
  error: string | boolean
}

const initialState: ScoresStorage = {
  storage: {},
  loaded: false,
  loading: false,
  error: false
} as const


export const loadScores = createAsyncThunk(
  'scores/load',
  async () => {
    try {
      const response = await window.interactiveCanvas?.getUserParam(userStorageKey) as ScoresStorage["storage"]
      return response
    } catch {
      return [] as unknown as ScoresStorage["storage"]
    }
  }
)

export const saveUserScore = createAsyncThunk(
  'scores/setScores',
  async ({ slug, score }: { slug: string, score: number }, thunkApi) => {
    let scores = clonedeep(selectScoresStorage(thunkApi.getState() as RootState))
    if (!scores[slug]) {
      scores[slug] = []
    }
    scores[slug].push({
      score,
      date: dayjs().format()
    })
    scores[slug] = scores[slug].sort((a, b) => {
      if (a.score === b.score) {
        return dayjs(b.date).isAfter(a.date) ? 1 : -1
      }
      return b.score - a.score
    }).slice(0, SCORES_MAX_SIZE)

    //TODO: sync with backend

    console.log('calculated scores', scores)
    await window.interactiveCanvas?.setUserParam('scores', scores)
    return scores
  }
)

export const userStorageSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadScores.pending, (state) => {
      state.loading = true
      state.error = false
    })
    builder.addCase(loadScores.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(loadScores.fulfilled, (state, action) => {
      state.loaded = true
      state.loading = false
      state.error = false
      state.storage = action.payload
    })


    builder.addCase(saveUserScore.pending, (state) => {
      state.loading = true
      state.error = false
    })
    builder.addCase(saveUserScore.rejected, (state, action) => {
      console.error('saveUserScore.rejected!', action)
      state.error = action.error.message
    })
    builder.addCase(saveUserScore.fulfilled, (state, action) => {
      state.error = false
      state.loading = false
      state.storage = action.payload
    })
  }
})


const selectScores = (state: RootState) => state.scores
const selectScoresStorage = (state: RootState) => state.scores.storage

// Selectors

export const selectScoresIsLoading = createSelector(selectScores, (state: ScoresStorage) => state.loading)

export const selectScoresGetError = createSelector(selectScores, (state: ScoresStorage) => state.error)

export const selectTutorialSeen = createSelector([
  selectScores,
  (_state, slug: string) => slug
], (state: ScoresStorage, slug) => {
  return Boolean(state.storage[slug] && state.storage[slug].length)
})

export const selectGameScores = createSelector([
  selectScores,
  (_state, slug: string) => slug
], (state: ScoresStorage, slug) => {
  return state.storage[slug]
})


// Reducers and actions
export const actions = userStorageSlice.actions

export default userStorageSlice.reducer
