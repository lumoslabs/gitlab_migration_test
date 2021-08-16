import { ConversationV3 } from 'actions-on-google'
import {
  sendCommand,
  setIsFirstLogin,
  setTraining,
  getTraining,
  convToUser,
  getBirthday,
  Scenes,
  Pages,
  getUnderageTimestamp
} from '@backend/conversation/utils'
import appSharedActions from '@store/slices/appSharedActions'
import TrainingManager from '@backend/libs/TrainingManager'
import { v4 as uuidv4 } from 'uuid'
import { dayjs } from '@backend/libs/dayjs'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

export default async (conv: ConversationV3) => {

  //Generate user id for new users
  if (!conv.user.params?.id) {
    setIsFirstLogin(conv)
    conv.user.params.id = uuidv4()
  }

  //Generate training
  const trainingManager = new TrainingManager(getTraining(conv), conv?.device?.timeZone?.id)
  const training = await trainingManager.get()

  setTraining(conv, training)

  //Generate tutorial object
  const tutorialSeen = Object.keys(conv.user.params?.scores ?? {}).reduce((accum, gameName) => {
    accum[gameName] = true
    return accum
  }, {})


  let nextScene = Scenes.Main
  let nextPage = Pages.Home



  console.log('(dayjs().unix() - getUnderageTimestamp(conv)) < serverRuntimeConfig.underageBanSeconds)', (dayjs().unix() - getUnderageTimestamp(conv)), serverRuntimeConfig.underageBanSeconds)
  // check is use banned by undergame
  if (getUnderageTimestamp(conv) && ((dayjs().unix() - getUnderageTimestamp(conv)) < serverRuntimeConfig.underageBanSeconds)) {
    nextScene = Scenes.EndConversation
    nextPage = null
  } else if (!getBirthday(conv)) { // Check if age already confirmed
    nextScene = Scenes.AgeGate
    nextPage = Pages.AgeGate
  }


  sendCommand({
    conv,
    suppressMic: false,
    commands: [
      {
        command: appSharedActions.SET_STORE,
        payload: {
          training,
          user: convToUser(conv),
          tutorialSeen,
        }
      },
      nextPage ? {
        command: appSharedActions.GO_TO,
        payload: nextPage
      } : undefined
    ],
    scene: nextScene
  })
}
