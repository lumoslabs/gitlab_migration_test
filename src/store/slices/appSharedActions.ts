enum appSharedActions {
  SET_STARTED = 'setStarted'
}

export default appSharedActions

export interface sharedAction {
  command: appSharedActions,
  payload?: any
}

export const asSharedAction = (data: any): sharedAction | null => {
  if ((typeof data === 'object') && Object.values(appSharedActions).includes(data?.command)) {
    return {
      command: data.command,
      payload: data?.payload
    }
  }
  return null
}
