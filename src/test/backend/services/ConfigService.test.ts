import ConfigService from '@backend/services/ConfigService'
import { table, ConfigTypes } from '@backend/models/config'
import { DocumentClient } from '@backend/libs/db'

describe('ConfigService', () => {
  it('getRow returns existing row', async () => {
    const id = '100'
    await DocumentClient.put({ TableName: table.name, Item: { id, type: ConfigTypes.CATALOG } }).promise()
    const Item = await (new ConfigService()).getRow('100', ConfigTypes.CATALOG)
    expect(Item).toEqual({
      id,
      type: ConfigTypes.CATALOG
    })
  })

  it('getRow returns null', async () => {
    const Item = await (new ConfigService()).getRow('200', ConfigTypes.CATALOG)
    expect(Item).toBeNull()
  })

  it('getCatalogGames returns games', async () => {
    const catalogId = '1'
    const games = [
      { id: 'game-1', type: ConfigTypes.GAME, values: { title: 'game-1' } },
      { id: 'game-2', type: ConfigTypes.GAME, values: { title: 'game-2' } },
      { id: 'game-3', type: ConfigTypes.GAME, values: { title: 'game-3' } }
    ]
    await DocumentClient.put({
      TableName: table.name, Item: {
        id: catalogId, type: ConfigTypes.CATALOG, values: {
          games: [
            { slug: 'game-1', version: "nest_1.0" },
            { slug: 'game-2', version: "nest_1.0" },
            { slug: 'game-3', version: "nest_1.0" },
          ]
        }
      }
    }).promise()
    await Promise.all(games.map((game) =>
      DocumentClient.put({ TableName: table.name, Item: game }).promise()
    ))

    const result = await (new ConfigService()).getCatalogGames()
    expect(result).toEqual(games)
  })

  it('getCatalogGameBySlug returns game', async () => {
    const game = { id: 'game-1', type: ConfigTypes.GAME, values: { title: 'game-1' } }
    await DocumentClient.put({ TableName: table.name, Item: game }).promise()
    const result = await (new ConfigService()).getCatalogGameBySlug(game.id)
    expect(result).toEqual(game)
  })

})
