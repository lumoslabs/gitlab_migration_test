import type { NextApiRequest, NextApiResponse } from 'next'
import ConfigService from '@backend/services/ConfigService'
import logger from '@backend/libs/logger';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const service = new ConfigService()
    const catalog = await service.getCatalogGames()
    res.status(200).json(catalog);
  } catch (err) {
    logger.error(`getCatalog: Error: ${err} \nstack: ${err.stack}`);
    return res.status(500).json({ error: 'Server Error' });
  }

}
