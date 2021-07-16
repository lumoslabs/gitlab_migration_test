import ConfigModel, { Config, CatalogConfig, GameConfig, ConfigTypes } from '@backend/models/config'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

export default class CatalogService {

  //TODO: wrap it with cache decorator
  async getRow(id: string, type: string): Promise<Config | null> {
    const row = await ConfigModel.get({ id, type })
    return row?.Item ? row.Item as Config : null
  }

  async getCatalogGames() {
    const catalog: CatalogConfig = await this.getRow(serverRuntimeConfig?.misc?.config_catalog_id || 1, ConfigTypes.CATALOG)
    //n+1, copy paste from prev version, should be handled by cache decorator
    const games = ((await Promise.all(catalog?.values?.games?.map((game) => {
      return this.getRow(game.slug, ConfigTypes.GAME)
    }))) as GameConfig[]).sort((a, b) => (a?.values?.title > b?.values?.title) ? 1 : -1)

    return games
  }

  async getCatalogGameBySlug(slug: string) {
    const game: Omit<GameConfig, "last_version"> | null = await this.getRow(slug, 'game')
    return game ? {
      ...game,
      values: {
        ...game.values,
        last_version: game?.values?.versions?.pop()
      }
    } as GameConfig : null
  }

  async getVoiceGameMap() {
    return {
      'color match': 'color-match-nest',
      'ebb and flow': 'ebb-and-flow-nest',
      'raindrops': 'raindrops-nest',
      'train of thought': 'train-of-thought-nest',
      'word snatchers': 'word-snatchers-nest'
    }
  }
}

