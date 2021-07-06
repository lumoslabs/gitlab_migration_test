import AuthService, { TokenPayload } from '@backend/services/AuthService'
import type { NextApiRequest, NextApiResponse } from 'next'

export type NextApiRequestWithUser = NextApiRequest & {
  user: TokenPayload | null
}

export default function withUser<T>(handler: (req: NextApiRequest, res: NextApiResponse) => T) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authService = new AuthService()
    const token = req.headers?.authorization?.replace('Bearer ', '');
    (req as NextApiRequestWithUser).user = token ? await authService.parseToken(token) : null
    return handler(req, res)
  };
};
