import AuthService from '@backend/services/AuthService'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const authService = new AuthService()
  const user = await authService.getUser('1')
  const token = await authService.generateToken(user)
  res.send({
    user,
    token,
  })
}
