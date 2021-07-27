import { useAppSelector } from '@store/hooks'
import { getBaseUrl } from '@store/slices/appSlice'
import { useLocation } from 'react-router-dom'

export default function useAmplitude() {
  //TODO: get userId from 
  const baseUrl = useAppSelector(getBaseUrl)
  const location = useLocation()
  const track = (eventName: string, eventProps = {}) => {
    console.log('track to amplitude', {
      ...eventProps,
      userId: baseUrl,
      currentPage: location.pathname
    })
    const instance = window.amplitude?.getInstance()
    instance?.logEvent(eventName, {
      ...eventProps,
      userId: baseUrl,
      currentPage: location.pathname
    })
  }

  return track
}
