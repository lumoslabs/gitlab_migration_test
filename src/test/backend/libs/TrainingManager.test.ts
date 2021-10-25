import TrainingManager, { ITraining } from '@backend/libs/TrainingManager'
import dayjs from '@backend/libs/dayjs'

describe('libs', () => {
  describe('TrainingManager', () => {
    const version = 1

    let training: ITraining | null = null

    beforeEach(() => {
      training = {
        games: ['game-1', 'game-2'],
        size: 3,
        deadline: dayjs.unix() + 10000,
        version,
      }
    })

    it('get() for actual training', async () => {
      const service = new TrainingManager(training)
      const result = await service.get()
      expect(result).toStrictEqual(training)
    })

    it('get() for outdated training', async () => {
      training.deadline = dayjs.unix() - 100
      const service = new TrainingManager(training)
      const result = await service.get()
      expect(result).not.toStrictEqual(training)
    })

    it('get() for training with prev version', async () => {
      training.version = training.version - 1
      const service = new TrainingManager(training)
      const result = await service.get()
      expect(result).not.toStrictEqual(training)
    })

    it('markGameCompleted() works', async () => {
      const game = training.games.shift()
      const service = new TrainingManager(training)
      service.markGameCompleted(game)
      const result = await service.get()
      expect(result).toStrictEqual(training)
    })

    it('getUnplayedGamedCount() works', async () => {
      const service = new TrainingManager(training)
      expect(service.getUnplayedGamedCount()).toBe(training.games.length)
    })

    it('getWorkoutGamesCount() works', async () => {
      const service = new TrainingManager(training)
      expect(service.getWorkoutGamesCount()).toBe(training.size)
    })

  })
})
