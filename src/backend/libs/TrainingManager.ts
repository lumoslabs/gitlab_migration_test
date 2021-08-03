import dayjs, { getDayjsWithTimezone, isValidTimezone } from '@backend/libs/dayjs'
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
  protected size = 3 // Workouts are 3 games
  protected version = 1   // 1 session per day, change this to get more
  protected timezone = 'America/Los_Angeles' // default timezone

  constructor(training?: ITraining | null, timezone?: string) {
    if ((training?.version === this.version) && (training?.deadline > dayjs.unix())) {
      this.training = training
    }
    if (timezone && isValidTimezone(timezone)) {
      this.timezone = timezone
    }
  }

  private create = async (): Promise<ITraining> => {
    const service = new ConfigService()
    const allGames = (await service.getCatalogGames()).map((game) => game.id)
    return {
      version: this.version,
      games: samplesize(allGames, this.size),
      size: this.size,
      deadline: getDayjsWithTimezone(this.timezone).endOf('day').unix()
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
