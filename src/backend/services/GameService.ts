import GameRunModel, { GameEventData, GameEvents, GameRun, GameRunState, table } from '@backend/models/gameRun'
import { v4 as uuidv4 } from 'uuid'

export default class GameService {

  //TODO: wrap it with cache decorator
  async getGameRun(id: string): Promise<GameRun | null> {
    const row = await GameRunModel.get({ id })
    return row?.Item ? row.Item as GameRun : null
  }

  async createGameRun(omitGame: Omit<GameRun, "id" | "game_state" | "score" | "run_data" | "updated_at" | "created_at">): Promise<string> {
    const id = uuidv4()
    const game: GameRun = {
      ...omitGame,
      run_data: {},
      id: id,
      game_state: GameRunState.CREATED,
      score: 0,
    }
    await GameRunModel.put(game)
    return id
  }

  async updateGameRun(id: string, eventName: GameEvents, eventData?: GameEventData): Promise<string> {
    if (eventName === GameEvents.LOADED) {
      await GameRunModel.update({
        id: id,
        game_state: GameRunState.LOADED,
      })
    } else if (eventName === GameEvents.START) {
      await GameRunModel.update({
        id: id,
        game_state: GameRunState.STARTED,
      })
    } else if (eventName === GameEvents.COMPLETED) {
      await GameRunModel.update({
        id: id,
        game_state: GameRunState.ENDED,
        score: eventData?.score ?? 0,
        run_data: eventData
      })
    }
    return id
  }

  async getUserTopScoresForGameSlug(gameSlug: string, userId: string, limit = 5): Promise<Array<{ score: number, updated_at: string }>> {
    const result = await table.query(userId, {
      index: 'GameRunUserScoreIndex',
      attributes: ['score', 'updated_at'],
      limit: limit * 10,
      gte: 0,
      filters: [
        {
          attr: 'game_slug', eq: gameSlug
        },
        {
          attr: 'game_state', eq: 'ENDED'
        },
      ],
    }, {
      ScanIndexForward: false,
    })
    return result?.Items?.slice(0, 5) || []
  }
}
