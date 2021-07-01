import getConfig from 'next/config'
import { NextPageContext } from 'next'
import Rollbar from 'Rollbar'

interface IError {
  statusCode: number
}

function Error({ statusCode }: IError): JSX.Element {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ req, res, err }: NextPageContext): IError => {
  const { publicRuntimeConfig } = getConfig()
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  if (!process.browser) {
    const rollbar = new Rollbar({
      environment: publicRuntimeConfig.rollbar.enviroment,
      accessToken: publicRuntimeConfig.rollbar.serverToken
    })
    rollbar.error(err, req, rollbarError => {
      if (rollbarError) {
        //TODO: any another logger?
        return
      }
    })
  }

  return { statusCode }
}

export default Error
