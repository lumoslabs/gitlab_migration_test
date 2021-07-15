import GameRunModel, { GameEventData, GameEvents, GameRun, GameRunState } from '@backend/models/gameRun'
import { v4 as uuidv4 } from 'uuid'
import { ConditionExpression,  AndExpression, equals, greaterThanOrEqualTo } from '@aws/dynamodb-expressions'
import { QueryOptions } from '@aws/dynamodb-data-mapper'

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

  async updateGameRun(id: string, eventName: GameEvents, eventData?: GameEventData) {
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

  async getUserHighScoresForGameSlug(
    gameSlug: string,
    userId: string,
    limit: number = 5
  ) {

    const createConditionExpression = (conditionFunction, column: string, value) : ConditionExpression => {
      return {
        ...conditionFunction(value),
        subject: column,
      }
    }

    const createAndExpression = (conditions) : AndExpression => {
      return {
        type: 'And',
        conditions,
      }
    }

    const createGreaterThanOrEqualToConditionExpression = (column: string, value) : ConditionExpression => {
      return createConditionExpression(greaterThanOrEqualTo, column, value)
    }

    const createEqualsConditionExpression = (column: string, value) : ConditionExpression => {
      return createConditionExpression(equals, column, value)
    }
    const equalsUserIdCondition: ConditionExpression = createEqualsConditionExpression('user_id', userId)
    const equalsGameSlugCondition: ConditionExpression = createEqualsConditionExpression('game_url_slug', gameSlug)
    // const equalsGameStateCondition: ConditionExpression = createEqualsConditionExpression('game_state', GameState.ENDED_GAME)
    const scoreCondition = createGreaterThanOrEqualToConditionExpression('score', 0)

    const queryAndCondition: AndExpression = createAndExpression([
      equalsUserIdCondition,
      scoreCondition,
    ])
    const filterAndCondition: AndExpression = createAndExpression([equalsGameSlugCondition])

    const queryOptions: QueryOptions = {
      limit,
      indexName: 'GameRunUserScoreIndex',
      scanIndexForward: false,
      filter: filterAndCondition,
      projection: ['score', 'game_url_slug', 'game_version', 'created_at', 'updated_at', 'user_id']
    }

    return query(GameRunModel, queryAndCondition, queryOptions)
  }

}
