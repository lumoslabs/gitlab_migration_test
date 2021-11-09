import { useAppSelector } from '@store/hooks'
import { selectUser } from '@store/slices/user'
import { useLocation } from 'react-router-dom'

export default function useAmplitude(): (eventName: string, eventProps?: any) => void {
  const user = useAppSelector(selectUser)

  const userId = user?.id

  const location = useLocation()
  const track = (eventName: string, eventProps = {}) => {
    const instance = window.amplitude?.getInstance()
    instance?.logEvent(eventName, {
      ...eventProps,
      userId,
      currentPage: location.pathname
    })
  }

  return track
}
