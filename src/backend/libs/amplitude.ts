import * as Amplitude from '@amplitude/node'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const client = Amplitude.init(publicRuntimeConfig.amplitude.apiKey)

export interface IAmplitudeEventProps {
  eventName: string;
  userId?: string;
  data?: Record<string, any>;
}

const amplitudeBackendEvent = async (props: IAmplitudeEventProps): Promise<void> => {
  const { eventName, data, userId } = props
  const time = new Date().getTime()

  client.logEvent({
    event_type: eventName,
    user_id: userId,
    time: time,
    event_properties: data
  })
  // Send any events that are currently queued for sending.
  // Will automatically happen on the next event loop.
  client.flush()
}

export default amplitudeBackendEvent
