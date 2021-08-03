import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getUser } from '@store/slices/appSlice'
import { useAppSelector } from '@store/hooks'
import ConnectAccount from '@components/ui/ConnectAccount'
import ConnectGuestAccount from '@components/ui/ConnectGuestAccount'
import useInteractiveCanvas from '@hooks/useInteractiveCanvas'

export default function accountLinking(): JSX.Element {
  const history = useHistory()
  const user = useAppSelector(getUser)
  const { sendTextQuery } = useInteractiveCanvas()

  useEffect(() => {
    sendTextQuery('Invoke Account Linking Monologue TTS')
  }, [])

  const handleCancel = () => {
    history.push('/home')
  }
  const handleConnect = () => {
    sendTextQuery('Invoke link google account')
  }

  return user?.isGuest ?
    <ConnectGuestAccount handleCancel={handleCancel} /> :
    <ConnectAccount handleConnect={handleConnect} handleCancel={handleCancel} />
}
