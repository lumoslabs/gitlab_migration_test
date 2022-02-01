import * as Amplitude from '@amplitude/node'
import getConfig from 'next/config'
import rollbar from './rollbar'

const { publicRuntimeConfig } = getConfig()

const client = Amplitude.init(publicRuntimeConfig.amplitude.apiKey)

export interface IAmplitudeEventProps {
  eventName: string;
  userId?: string;
  data?: Record<string, any>;
}

const amplitudeBackendEvent = async ({ eventName, data, userId }: IAmplitudeEventProps): Promise<void> => {
  client.logEvent({
    event_type: eventName,
    user_id: userId,
    event_properties: data
  })
  // Send any events that are currently queued for sending.
  // Will automatically happen on the next event loop.
  const response = await client.flush()

  if (response?.statusCode !== 200) {
    rollbar?.error('Amplitude event did not succeed', { response: response, data: {
      event_type: eventName,
      user_id: userId,
      event_properties: data
    }})
  }
}

export default amplitudeBackendEvent
