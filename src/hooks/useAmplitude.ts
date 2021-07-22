import amplitude from 'amplitude-js'
import { useAppSelector } from '@store/hooks'
import { getBaseUrl } from '@store/slices/appSlice'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const instance = amplitude.getInstance().init(publicRuntimeConfig.amplitude.apiKey)

export default function useAmplitude() {
  const track = (eventName: string, eventProps = {}) => {
    instance.logEvent(eventName, {
      ...eventProps,
      userId: useAppSelector(getBaseUrl)
    })
  }

  return track
}
