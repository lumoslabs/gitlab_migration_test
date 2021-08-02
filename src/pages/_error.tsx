import { NextPageContext } from 'next'
import logger from '@backend/libs/logger'
import rollbar from '@backend/libs/rollbar'

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
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  if (!process.browser) {
    logger.error(req, res, err)
    rollbar?.error(err, req, rollbarError => {
      if (rollbarError) {
        logger.error('Rollbar error', rollbarError)
        return
      }
    })
  }

  return { statusCode }
}

export default Error
