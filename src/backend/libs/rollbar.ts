import Rollbar from 'rollbar'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

//publicRuntimeConfig.rollbar.serverToken ? : null
const rollbar = new Rollbar({
  environment: publicRuntimeConfig.rollbar.enviroment,
  accessToken: publicRuntimeConfig.rollbar.serverToken
})

export default rollbar
