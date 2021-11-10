import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { RootState, thunkApiExtended } from '@store/index'
import { v4 as uuidv4 } from 'uuid'

interface UserStorage {
  storage: {
    id?: string,
    email?: string;
    name?: string;
    picture?: string;
    lumosToken?: string;
    loginCount?: number;
  },
  loaded: boolean,
  loading: boolean,
  error: boolean
}

const userStorageKey = 'tokenPayload'
const lumosTokenStorageKey = 'lumosToken'
const idStorageKey = 'uniqUuid'
const loginCountStorageKey = 'loginCount'

const initialState: UserStorage = {
  loaded: false,
  loading: false,
  error: false,
  storage: {}
} as const


export const loadUser = createAsyncThunk<UserStorage["storage"], undefined, thunkApiExtended>(
  'user/load',
  async (_args, thunkApi) => {
    let loginCount = 0
    let lumosToken = undefined
    let id = ''

    try {
      id = await thunkApi.extra.interactiveUserStorage.get(idStorageKey) as string
    } catch {
    }

    if (!id) {
      id = uuidv4()
      await thunkApi.extra.interactiveUserStorage.set(idStorageKey, id) as string
    }

    try {
      lumosToken = await thunkApi.extra.interactiveUserStorage.get(lumosTokenStorageKey) as string
    } catch {
    }

    try {
      loginCount = await thunkApi.extra.interactiveUserStorage.get(loginCountStorageKey) as number
    } catch {
    }

    if (!loginCount) {
      loginCount = 0
    }

    await thunkApi.extra.interactiveUserStorage.set(loginCountStorageKey, (loginCount + 1))

    try {
      const response = await thunkApi.extra.interactiveUserStorage.get(userStorageKey) as Partial<UserStorage["storage"]>

      return {
        ...response,
        id,
        lumosToken,
        loginCount: Number(loginCount)
      }
    } catch {
      return {}
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false
      state.error = true
    })
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loaded = true
      state.loading = false
      state.error = false
      state.storage = action.payload
    })
  },

})

export const selectUser = (state: RootState) => state.user.storage

export const selectUserIsLoaded = (state: RootState) => state.user.loaded

export const selectUserIsLinked = (state: RootState) => Boolean(state.user.storage.lumosToken)

export const selectUserLumosToken = (state: RootState) => state.user.storage.lumosToken

export const selectUserIsFirstLogin = (state: RootState) => (state.user.storage.loginCount === 0)

// Reducers and actions
export const actions = userSlice.actions

export default userSlice.reducer
