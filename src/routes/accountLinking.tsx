import { useEffect } from 'react'
import { useAppSelector } from '@store/hooks'
import ConnectAccount from '@components/ui/ConnectAccount'
import ConnectGuestAccount from '@components/ui/ConnectGuestAccount'
import useInteractiveCanvas from '@hooks/useInteractiveCanvas'
import { Intents, Scenes } from '@contexts/InteractiveCanvasContext'
import useNavigation from '@hooks/useNavigation'
import useExpect from '@hooks/useExpect'
import { selectIsGuest } from '@store/slices/session'

export default function accountLinking(): JSX.Element {
  const navigation = useNavigation()
  const { outputTts, triggerScene } = useInteractiveCanvas()
  const isGuest = useAppSelector(selectIsGuest)

  const outputInfo = () => {
    if (isGuest) {
      outputTts(`You're currently in guest mode. If you would like to save your scores and progress, check your Google Voice match settings and restart Lumosity. You can say "Home" to go to the main menu.`)
    } else {
      outputTts(`You are currently playing as a guest user. To save scores and progress, you need to link your Lumosity account. Press connect to link your account.`)
    }
  }

  useExpect(Intents.HELP, () => {
    outputInfo()
  })

  useEffect(() => {
    outputInfo()
  }, [])

  const handleCancel = () => {
    navigation.toHome()
  }

  const handleConnect = () => {
    triggerScene(Scenes.AccountLinkingOriginAccountLinking)
  }

  return isGuest ?
    <ConnectGuestAccount handleCancel={handleCancel} /> :
    <ConnectAccount handleConnect={handleConnect} handleCancel={handleCancel} />
}
