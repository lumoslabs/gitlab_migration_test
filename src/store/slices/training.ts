import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction, RootState, thunkApiExtended } from '@store/index'
import dayjs from 'dayjs'
import sampleSize from 'lodash.samplesize'
import clonedeep from 'lodash.clonedeep'

const SIZE = 3 // Workouts are 3 games
const VERSION = 2  // Version of current training manager, if you want to invalidate all trainings increase this int

interface TrainingStorage {
  storage: {
    games: string[],
    size: number,
    deadline: string,
    version: number
  },
  loaded: boolean,
  loading: boolean,
  error: boolean
}

const trainingStorageKey = 'training'

const initialState: TrainingStorage = {
  loaded: false,
  loading: false,
  error: false,
  storage: {
    games: [],
    size: SIZE,
    deadline: dayjs().format(),
    version: VERSION
  }
}

const generateRandomTraining = () => {
  return {
    games: sampleSize([
      'color-match-nest',
      'ebb-and-flow-nest',
      'raindrops-nest',
      'train-of-thought-nest',
      'word-snatchers-nest'
    ], SIZE),
    size: SIZE,
    deadline: dayjs().format(),
    version: VERSION
  }
}

export const loadTraining = createAsyncThunk<TrainingStorage["storage"], undefined, thunkApiExtended>(
  'training/load',
  async (_args, thunkApi) => {
    const training = await thunkApi.extra.interactiveUserStorage.get<TrainingStorage["storage"]>(trainingStorageKey, generateRandomTraining())
    if (training && (training.version === VERSION) && dayjs(training?.deadline).isValid() && (dayjs(training?.deadline).diff(dayjs(), 'day') < 1)) {
      return training
    }
    await thunkApi.extra.interactiveUserStorage.set<TrainingStorage["storage"]>(trainingStorageKey, training)
    return training
  }
)

export const setTrainingGameCompleted = createAsyncThunk<TrainingStorage["storage"], string, thunkApiExtended>(
  'training/setTraining',
  async (slug, thunkApi) => {
    const training = clonedeep(selectTraining(thunkApi.getState()))
    training.games = training.games.filter((game) => game !== slug)
    await thunkApi.extra.interactiveUserStorage.set<TrainingStorage["storage"]>(trainingStorageKey, training)
    return training
  }
)

export const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher<PendingAction>(
      (action) => action.type.startsWith('training') && action.type.endsWith('/pending'),
      (state) => {
        state.loading = true
      }
    )

    builder.addMatcher<RejectedAction & { payload: TrainingStorage["storage"] }>(
      (action) => action.type.startsWith('training') && action.type.endsWith('/rejected'),
      (state, action) => {
        state.loading = false
        state.error = true
      }
    )

    builder.addMatcher<FulfilledAction & { payload: TrainingStorage["storage"] }>(
      (action) => action.type.startsWith('training') && action.type.endsWith('/fulfilled'),
      (state, action) => {
        state.loaded = true
        state.loading = false
        state.error = false
        state.storage = action.payload
      }
    )
  },

})

export const selectTraining = (state: RootState) => state.training.storage

// Reducers and actions
export const actions = trainingSlice.actions

export default trainingSlice.reducer
