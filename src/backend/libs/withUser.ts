import ForbiddenError from '@backend/errors/ForbiddenError'
import AuthService, { TokenPayload } from '@backend/services/AuthService'
import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

const guestUser: TokenPayload = {
  id: 'guest'
}

export type NextApiRequestWithUser = NextApiRequest & {
  user: TokenPayload | null
}

export default function withUser<T>(handler: (req: NextApiRequest, res: NextApiResponse) => T) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authService = new AuthService()
    const token = req.headers?.authorization?.replace('Bearer ', '')
    console.log('token', token)
    const requestUser = token ? await authService.parseToken(token) : null

    if (!requestUser && serverRuntimeConfig?.guestUser) {
      (req as NextApiRequestWithUser).user = guestUser
    } else if (!requestUser) {
      throw new ForbiddenError()
    } else {
      (req as NextApiRequestWithUser).user = requestUser
    }

    return handler(req, res)
  }
}
