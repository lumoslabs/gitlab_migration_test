import { useAppSelector } from '@store/hooks'
import { getUser } from '@store/slices/appSlice'
import { useLocation } from 'react-router-dom'

export default function useAmplitude(): (eventName: string, eventProps?: any) => void {
  const user = useAppSelector(getUser)
  const userId = user?.lumosUserId

  const location = useLocation()
  const track = (eventName: string, eventProps = {}) => {
    const instance = window.amplitude?.getInstance()
    instance?.setUserId(userId)
    instance?.logEvent(eventName, {
      ...eventProps,
      user_id: userId,
      currentPage: location.pathname
    })
  }

  return track
}
