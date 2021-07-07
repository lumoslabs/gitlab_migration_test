import type { NextApiRequest, NextApiResponse } from 'next'
import ValidationError from '@backend/errors/ValidationError';

export default function withExceptionHandler<T>(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<T>) {
  return (req, res) => {
    return handler(req, res).catch((error: unknown) => {
      if (error instanceof ValidationError) {
        res.status(400).send(error.message)
      } else if (error instanceof Error) {
        res.status(500).send(error.message)
      } else {
        res.status(500).send("Something went wrong")
      }
    });
  }
}
