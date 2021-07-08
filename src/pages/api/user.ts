import type { NextApiResponse } from 'next'
import withUser, { NextApiRequestWithUser } from '@backend/libs/withUser'

export default withUser(async (req: NextApiRequestWithUser, res: NextApiResponse): Promise<void> => {
  res.send(req.user)
})
