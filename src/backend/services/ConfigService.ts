import ConfigModel, { Config, CatalogConfig, GameConfig } from '@backend/models/config'

export default class CatalogService {

  //TODO: wrap it with cache decorator
  async getRow(id: string, type: string) {
    const row = await ConfigModel.get({ id, type })
    return row.Item as Config
  }

  async getCatalogGames() {
    const catalog: CatalogConfig = await this.getRow('1', 'catalog')

    //n+1, copy paste from prev version, should be handled by cache decorator
    const games = ((await Promise.all(catalog.values.games.map((game) => {
      return this.getRow(game.slug, 'game')
    }))) as GameConfig[]).sort((a, b) => (a.values.title > b.values.title) ? 1 : -1);

    return games
  }

  async getCatalogGameBySlug(slug: string) {
    const game: GameConfig = await this.getRow(slug, 'game')
    return game
  }
}

