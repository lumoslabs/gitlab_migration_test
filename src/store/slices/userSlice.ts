import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  id: 1,
  token: '',
} as const;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState>
    ) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    resetUser: (state: Draft<typeof initialState>) => {
      state.id = null;
      state.token = null;
    },
  },
});

// Selectors
export const getUser = (state) => state.user;

// Reducers and actions
export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
