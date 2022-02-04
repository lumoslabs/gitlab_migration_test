import { useAppSelector } from '@store/hooks'
import { getUser } from '@store/slices/appSlice'
import { useLocation } from 'react-router-dom'

export default function useAmplitude(): (eventName: string, eventProps?: any) => void {
  const user = useAppSelector(getUser)
  const userId = user?.lumosUserId || null

  // Only send a deviceId if there is no lumosUserId, otherwise send the automatically generated uuid stored in user.id as deviceId. 
  const deviceId = userId ? null : user?.id
  const location = useLocation()
  const track = (eventName: string, eventProps = {}) => {
    const instance = window.amplitude?.getInstance()
    userId && instance?.setUserId(userId)
    instance?.logEvent(eventName, {
      ...eventProps,
      user_id: userId,
      current_page: location.pathname,
      device_id: deviceId
    })
  }

  return track
}
