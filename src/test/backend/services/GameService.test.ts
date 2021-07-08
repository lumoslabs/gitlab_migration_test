import 'setimmediate';
import "jest-dynalite/withDb";
import GameService from '@backend/services/GameService'
import GameRunModel, { GameEvents, GameRunState, table } from '@backend/models/gameRun'

describe('GameService', () => {

  it('createGame creates new row', async () => {
    const game = {
      game_version: 'nest-1',
      game_slug: 'test-game',
      user_id: 'user_id'
    }
    const id = await (new GameService()).createGameRun(game)

    const saved = await GameRunModel.get({ id })
    const { created_at, updated_at, ...result } = saved.Item
    expect(result).toEqual({
      id,
      game_state: GameRunState.CREATED,
      score: 0,
      run_data: {},
      ...game
    })
  })

  it('updateGame with loaded event', async () => {
    const game = {
      game_version: 'nest-1',
      game_slug: 'test-game',
      user_id: 'user_id'
    }
    const id = await (new GameService()).createGameRun(game)
    await (new GameService()).updateGameRun(id, GameEvents.LOADED)

    const saved = await GameRunModel.get({ id })
    const { created_at, updated_at, ...result } = saved.Item
    expect(result).toEqual({
      id,
      game_state: GameRunState.LOADED,
      score: 0,
      run_data: {},
      ...game
    })
  })

  it('updateGame with completed event', async () => {
    const game = {
      game_version: 'nest-1',
      game_slug: 'test-game',
      user_id: 'user_id'
    }
    const id = await (new GameService()).createGameRun(game)
    const score = 100
    await (new GameService()).updateGameRun(id, GameEvents.COMPLETED, { score })

    const saved = await GameRunModel.get({ id })
    const { created_at, updated_at, ...result } = saved.Item
    expect(result).toEqual({
      id,
      game_state: GameRunState.ENDED,
      score,
      run_data: {
        score
      },
      ...game
    })
  })

  it('getRow returns existing row', async () => {
    const game = {
      game_version: 'nest-1',
      game_slug: 'test-game',
      user_id: 'user_id'
    }
    const id = await (new GameService()).createGameRun(game)


    const saved = await (new GameService()).getGameRun(id)
    const { created_at, updated_at, ...result } = saved

    expect(result).toEqual({
      id,
      game_state: GameRunState.CREATED,
      score: 0,
      run_data: {},
      ...game
    })
  })
})
