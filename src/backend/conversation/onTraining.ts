import { ConversationV3 } from 'actions-on-google'
import { sendCommand } from '@backend/conversation/utils'
import appSharedActions from '@store/slices/appSharedActions'
import TrainingManager from '@backend/libs/TrainingManager'

export default async (conv: ConversationV3) => {
  const trainingManager = new TrainingManager(conv.user.params.training)
  if (trainingManager.getRemainGamesCount() === 0) {
    conv.add('Your daily workout is completed')
    sendCommand({ conv })
  } else {
    sendCommand({
      conv,
      command: appSharedActions.GO_TO,
      payload: `/training`,
      suppressMic: true,
    })
  }
}
