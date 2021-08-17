import { dayjs } from '@backend/libs/dayjs'
import { stringMap } from 'aws-sdk/clients/finspacedata'

export interface ScoreRow {
  score: number,
  date: string
}

export default class ScoresManager {
  protected state: ScoreRow[] = []
  protected size = 5

  constructor(initialState?: ScoreRow[]) {
    if (initialState) {
      this.state = initialState
    }
  }

  public push = (scoreRow: ScoreRow): this => {
    this.state.push(scoreRow)
    return this
  }

  public pushList = (scoreRows: ScoreRow[]): this => {
    scoreRows.forEach((row) => {
      this.push(row)
    })
    return this
  }

  public get = (): ScoreRow[] => {
    return Array.from(this.state.sort((a, b) => {
      if (a.score === b.score) {
        return dayjs(b.date).isAfter(a.date) ? 1 : -1
      }
      return b.score - a.score
    }).slice(0, this.size))
  }
}
