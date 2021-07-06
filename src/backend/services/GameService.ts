import GameRunModel, { GameRun, GameRunState } from '@backend/models/gameRun'
import { v4 as uuidv4 } from 'uuid';
import { getCurrentUTCString } from '@backend/libs/dayjs'

export default class GameService {

  async createGame(omitGame: Omit<GameRun, "id" | "game_state" | "score" | "run_data" | "updated_at" | "created_at">): Promise<string> {
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

}
