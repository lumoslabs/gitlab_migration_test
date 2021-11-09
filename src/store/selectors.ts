import { RootState } from "."

export const isUserStorageLoaded = (state: RootState) => {
  return state.ageGate.loaded && state.scores.loaded && state.user.loaded && state.training.loaded
}
