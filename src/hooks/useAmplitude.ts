// import { useAppSelector } from '@store/hooks'
// import { getBaseUrl } from '@store/slices/appSlice'
import { useLocation } from 'react-router-dom'

export default function useAmplitude(): (eventName: string, eventProps?: any) => void {
  //TODO: get userId from storage
  // const baseUrl = useAppSelector(getBaseUrl)
  const userId = 'guest'

  const location = useLocation()
  const track = (eventName: string, eventProps = {}) => {
    console.log('Tracking data sent to amplitude: ', {
      ...eventProps,
      userId: userId,
      currentPage: location.pathname
    })
    const instance = window.amplitude?.getInstance()
    instance?.logEvent(eventName, {
      ...eventProps,
      userId: userId,
      currentPage: location.pathname
    })
  }

  return track
}
