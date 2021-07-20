import 'setimmediate'
import 'jest-dynalite/withDb'
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
    const { created, modified, ...result } = saved.Item
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
    const { created, modified, ...result } = saved.Item
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
    const { created, modified, ...result } = saved.Item
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
    const { created, modified, ...result } = saved

    expect(result).toEqual({
      id,
      game_state: GameRunState.CREATED,
      score: 0,
      run_data: {},
      ...game
    })
  })

  it('getUserTopScoresForGameSlug returns top scores for a user', async () => {

    const service = (new GameService())
    const game_slug = 'test-game'
    const user = 'user_id'
    const game_version = 'nest-1'
    const excepted = []
    const fakeDate = 'date'
    // generate data 
    for (let score = 10; score < 20; score++) {
      const id = await service.createGameRun({
        game_version,
        game_slug,
        user_id: user
      })
      await service.updateGameRun(id, GameEvents.COMPLETED, { score })
      excepted.unshift({
        score,
        updated_at: fakeDate
      })
    }
    //fake user result
    const fakeUserGameRunId = await service.createGameRun({
      game_version,
      game_slug,
      user_id: 'fake_user'
    })
    await service.updateGameRun(fakeUserGameRunId, GameEvents.COMPLETED, { score: 1000 })
    /*
    //fake game
    const fakeSlugGameRunId = await service.createGameRun({
      game_version,
      game_slug: 'fake-game',
      user_id: user
    })
    await service.updateGameRun(fakeSlugGameRunId, GameEvents.COMPLETED, { score: 1000 })
*/

    const scores = await service.getUserTopScoresForGameSlug(game_slug, user, 5)

    expect(scores.length).toEqual(5)

    const scoresWithoutDate = scores.map((score) => {
      score.updated_at = fakeDate
      return score
    })

    expect(scoresWithoutDate).toEqual(excepted.slice(0, 5))
  })

})
