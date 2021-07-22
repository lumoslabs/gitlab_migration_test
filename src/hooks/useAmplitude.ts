import amplitude from 'amplitude-js';
import { useAppSelector } from '@store/hooks'
import { getBaseUrl } from '@store/slices/appSlice'
import { useLocation } from "react-router-dom";
const instance = amplitude.getInstance().init("API_KEY");

export default function useAmplitude() {
  const location = useLocation()
  const track = (eventName: string, eventProps = {}) => {
    //TODO: connect aplitude here and track data
    instance.logEvent(eventName, {
      ...eventProps,
      userId: useAppSelector(getBaseUrl),
      currentPage: location.pathname
    })
  }

  return track
}
