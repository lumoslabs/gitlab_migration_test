import * as Amplitude from '@amplitude/node'
import getConfig from 'next/config'
import rollbar from './rollbar'

const { publicRuntimeConfig } = getConfig()

const client = Amplitude.init(publicRuntimeConfig.amplitude.apiKey)

export interface IAmplitudeEventProps {
  eventName: string;
  userId?: string;
  data?: Record<string, any>;
  deviceId?: string;
}

const amplitudeBackendEvent = async ({ eventName, data, userId, deviceId }: IAmplitudeEventProps): Promise<void> => {
  client.logEvent({
    event_type: eventName,
    user_id: userId,
    device_id: deviceId,
    event_properties: data
  })
  // Send any events that are currently queued for sending.
  // Will automatically happen on the next event loop.
  const response = await client.flush()

  if (response?.statusCode !== 200) {
    rollbar?.error('Amplitude event did not succeed', { response: response, data: {
      event_type: eventName,
      user_id: userId,
      device_id: deviceId
    }})
  }
}

export default amplitudeBackendEvent
