import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getUser } from '@store/slices/appSlice'
import { useAppSelector } from '@store/hooks'
import ConnectAccount from '@components/ui/ConnectAccount'
import ConnectGuestAccount from '@components/ui/ConnectGuestAccount'
import useInteractiveCanvas from '@hooks/useInteractiveCanvas'

export default function accountLinking(): JSX.Element {
  const user = useAppSelector(getUser)
  const { outputTts, sendTextQuery } = useInteractiveCanvas()

  useEffect(() => {
    if (user?.isGuest) {
      outputTts(`You're currently in guest mode. If you would like to save your scores and progress, check your Google Voice match settings and restart Lumosity. You can say "Home" to go to the main menu.`)
    } else {
      outputTts(`You are currently playing as a guest user. To save scores and progress, you need to link your Lumosity account. Press connect to link your account.`)
    }
  }, [])

  const handleCancel = () => {
    sendTextQuery('Home')
  }

  const handleConnect = () => {
    sendTextQuery('Invoke link google account')
  }

  return user?.isGuest ?
    <ConnectGuestAccount handleCancel={handleCancel} /> :
    <ConnectAccount handleConnect={handleConnect} handleCancel={handleCancel} />
}
