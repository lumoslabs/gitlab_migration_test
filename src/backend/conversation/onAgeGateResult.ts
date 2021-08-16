import { ConversationV3 } from 'actions-on-google'
import { Pages, Scenes, sendCommand, setBirthday, setUnderageTimestamp } from '@backend/conversation/utils'
import appSharedActions from '@store/slices/appSharedActions'
import { dayjs } from '@backend/libs/dayjs'

export default async (conv: ConversationV3) => {
  const birthday = String(conv.context?.canvas?.state?.birthday)
  const isUnderage = (birthday && dayjs(birthday).isValid()) ? dayjs(birthday).add(13, 'year').isAfter(dayjs()) : true
  if (isUnderage) {
    // TODO: Add age gate exit message
    conv.add('Exit message')
    setUnderageTimestamp(conv, dayjs().unix())
    sendCommand({
      suppressMic: true,
      conv,
      scene: Scenes.EndConversation
    })
  } else {
    setBirthday(conv, birthday)
    sendCommand({
      suppressMic: true,
      conv,
      commands: [
        {
          command: appSharedActions.GO_TO,
          payload: Pages.Home
        }
      ],
      scene: Scenes.Main
    })
  }
}

