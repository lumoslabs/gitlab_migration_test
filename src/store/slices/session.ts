import { createSlice, createAsyncThunk, createSelector, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/index'

interface SessionStorage {
  isWelcomeState: boolean
}

const initialState: SessionStorage = {
  isWelcomeState: true,
} as const



export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setWelcomeState: (state) => {
      state.isWelcomeState = false
    }
  }
})

export const selectWelcomeState = (state: RootState) => state.session.isWelcomeState

// Reducers and actions
export const { setWelcomeState } = sessionSlice.actions

export default sessionSlice.reducer
