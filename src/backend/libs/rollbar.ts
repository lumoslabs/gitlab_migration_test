import Rollbar from 'rollbar'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

const rollbar = new Rollbar({
  environment: serverRuntimeConfig?.rollbar?.environment,
  accessToken: serverRuntimeConfig?.rollbar?.serverToken
})

export default rollbar
