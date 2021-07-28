import dayjs from '@backend/libs/dayjs'
import samplesize from 'lodash.samplesize'
import ConfigService from '@backend/services/ConfigService'

export interface ITraining {
  games: string[],
  size: number,
  deadline: number,
  version: number
}

export default class TrainingManager {
  protected training: ITraining | null
  // Workouts are 3 games
  protected size = 3
  protected version = 1

  constructor(training?: ITraining | null) {
    if ((training?.version === this.version) && (training?.deadline > dayjs.unix())) {
      this.training = training
    }
  }

  private create = async (): Promise<ITraining> => {
    const service = new ConfigService()
    const allGames = (await service.getCatalogGames()).map((game) => game.id)
    return {
      version: this.version,
      games: samplesize(allGames, this.size),
      size: this.size,
      deadline: dayjs.add(1, 'day').hour(0).minute(0).second(0).unix() // TODO: add timezone logic
    }
  }

  public get = async (): Promise<ITraining> => {
    if (this.training) {
      return this.training
    }
    this.training = await this.create()
    return this.training
  }

  public markGameCompleted = async (slug: string) => {
    const training = await this.get()
    training.games = training.games.filter((game) => slug !== game)
    this.training = training
    return training
  }

  public getWorkoutGamesCount = () => {
    return Number(this.training?.size)
  }

  public getUnplayedGamedCount = () => {
    return Number(this.training?.games?.length)
  }

}
