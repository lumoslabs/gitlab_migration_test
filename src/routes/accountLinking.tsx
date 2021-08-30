import { useEffect } from 'react'
import { getUser } from '@store/slices/appSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { actions } from '@store/slices/appSlice'
import ConnectAccount from '@components/ui/ConnectAccount'
import ConnectGuestAccount from '@components/ui/ConnectGuestAccount'
import useInteractiveCanvas from '@hooks/useInteractiveCanvas'
import useAppBusListener from '@hooks/useAppBusListener'
import { Intents } from '@contexts/InteractiveCanvasContext'
import { useHistory } from 'react-router-dom'

export default function accountLinking(): JSX.Element {
  const history = useHistory()
  const user = useAppSelector(getUser)
  const dispatch = useAppDispatch()
  const { outputTts, sendTextQuery } = useInteractiveCanvas()

  const outputInfo = () => {
    if (user?.isLinked) {
      outputTts(`Your account is already linked.`)
      dispatch(actions.setShowAccountModal())
      sendTextQuery('Home').then((result) => {
        //TODO: fix it with the new interactiveCanvas
        if (result === 'BLOCKED') {
          history.push('/home')
        }
      })
    }

    if (user?.isGuest) {
      outputTts(`You're currently in guest mode. If you would like to save your scores and progress, check your Google Voice match settings and restart Lumosity. You can say "Home" to go to the main menu.`)
    } else {
      outputTts(`You are currently playing as a guest user. To save scores and progress, you need to link your Lumosity account. Press connect to link your account.`)
    }
  }

  useEffect(() => {
    outputInfo()
  }, [])

  useAppBusListener('onIntentHelp', () => {
    outputInfo()
  })

  const handleCancel = () => {
    sendTextQuery('Home')
  }

  const handleConnect = () => {
    sendTextQuery(Intents.LINK_ACCOUNT)
  }

  return user?.isGuest ?
    <ConnectGuestAccount handleCancel={handleCancel} /> :
    <ConnectAccount handleConnect={handleConnect} handleCancel={handleCancel} />
}
