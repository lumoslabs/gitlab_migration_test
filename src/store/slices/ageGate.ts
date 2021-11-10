import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/index'
import getConfig from 'next/config'
import dayjs from 'dayjs'

const { publicRuntimeConfig } = getConfig()

interface AgeGateStorage {
  storage: {
    birthday: string | null,
    bannedAt: string | null,
  },
  loaded: boolean,
  loading: boolean,
  error: boolean
}

const userStorageKey = 'ageGate'

const initialState: AgeGateStorage = {
  loaded: false,
  loading: false,
  error: false,
  storage: {
    birthday: null,
    bannedAt: null
  }
} as const


export const loadAgeGate = createAsyncThunk(
  'ageGate/load',
  async () => {
    try {
      const response = await window.interactiveCanvas?.getUserParam(userStorageKey) as AgeGateStorage["storage"]
      return response
    } catch {
      return {
        birthday: null,
        bannedAt: null
      }
    }
  }
)

export const setBirthday = createAsyncThunk(
  'userStorage/setAgeGate',
  async (date: AgeGateStorage["storage"]["birthday"] | Date) => {
    const birthday = dayjs(date)
    const isUnderage = (birthday && birthday.isValid()) ? birthday.add(13, 'year').isAfter(dayjs()) : true
    const ageGate = {
      birthday: isUnderage ? '' : birthday.format(),
      bannedAt: isUnderage ? dayjs().format() : ''
    }
    await window.interactiveCanvas?.setUserParam(userStorageKey, ageGate)
    return ageGate
  }
)


export const ageGateSlice = createSlice({
  name: 'ageGate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAgeGate.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loadAgeGate.rejected, (state, action) => {
      state.loading = false
      state.error = true
    })
    builder.addCase(loadAgeGate.fulfilled, (state, action) => {
      state.loaded = true
      state.loading = false
      state.error = false
      state.storage = action.payload
    })

    builder.addCase(setBirthday.pending, (state) => {
      state.loading = true
    })
    builder.addCase(setBirthday.rejected, (state, action) => {
      state.error = true
    })
    builder.addCase(setBirthday.fulfilled, (state, action) => {
      state.loading = false
      state.storage = action.payload
    })

  },

})

export const selectAgeGate = (state: RootState) => state.ageGate.storage

export const selectAgeGateIsLoaded = (state: RootState) => state.ageGate.loaded

export const selectIsBanned = createSelector(selectAgeGate, (state: RootState['ageGate']['storage']) => {
  return (state.bannedAt && dayjs(state.bannedAt).isValid()) ?
    Math.abs(dayjs(state.bannedAt).diff(dayjs(), 'second')) < publicRuntimeConfig.underageBanSeconds : false
})

export const selectBirthday = createSelector(selectAgeGate, (state: RootState['ageGate']['storage']) => {
  return state.birthday
})

// Reducers and actions
export const actions = ageGateSlice.actions

export default ageGateSlice.reducer
