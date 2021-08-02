/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getUser, sendTextQuery } from '@store/slices/appSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import ConnectAccount from '@components/ui/ConnectAccount'
import ConnectGuestAccount from '@components/ui/ConnectGuestAccount'

export default function accountLinking(): JSX.Element {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const user = useAppSelector(getUser)

  useEffect(() => {
    //@ts-ignore
    dispatch(sendTextQuery({ query: 'Invoke Account Linking Monologue TTS' }))
  }, [])

  const handleCancel = () => {
    history.push('/home')
  }
  const handleConnect = () => {
    //@ts-ignore
    dispatch(sendTextQuery({ query: 'Invoke link google account' }))
  }

  return user?.isGuest ?
    <ConnectGuestAccount handleCancel={handleCancel} /> :
    <ConnectAccount handleConnect={handleConnect} handleCancel={handleCancel} />
}
