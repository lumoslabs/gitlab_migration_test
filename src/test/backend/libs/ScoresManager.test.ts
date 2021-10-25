import ScoresManager from '@backend/libs/ScoresManager'


describe('libs', () => {
  describe('ScoresManager', () => {

    it('on first play scores', () => {
      const service = new ScoresManager()

      service.push({
        score: 1000,
        date: '2021-08-17T13:15:21Z'
      })

      expect(service.get()).toEqual([{
        score: 1000,
        date: '2021-08-17T13:15:21Z'
      }])
    })


    it('on sixth play scores', () => {
      const service = new ScoresManager([
        {
          score: 1,
          date: '2021-08-17T13:15:21Z'
        },
        {
          score: 2,
          date: '2021-08-17T13:15:21Z'
        },
        {
          score: 3,
          date: '2021-08-17T13:15:21Z'
        },
        {
          score: 4,
          date: '2021-08-17T13:15:21Z'
        },
        {
          score: 5,
          date: '2021-08-17T13:15:21Z'
        }
      ])

      service.push({
        score: 1000,
        date: '2021-08-20T13:15:21Z'
      })

      expect(service.get()).toEqual([
        {
          score: 1000,
          date: '2021-08-20T13:15:21Z'
        },
        {
          score: 5,
          date: '2021-08-17T13:15:21Z'
        },
        {
          score: 4,
          date: '2021-08-17T13:15:21Z'
        },
        {
          score: 3,
          date: '2021-08-17T13:15:21Z'
        },
        {
          score: 2,
          date: '2021-08-17T13:15:21Z'
        },
      ])
    })

    it('on same scores', () => {
      const service = new ScoresManager([
        {
          score: 1,
          date: '2021-08-17T13:15:21Z'
        },
      ])

      service.push(
        {
          score: 1,
          date: '2021-08-20T13:15:21Z'
        }
      )

      expect(service.get()).toEqual([
        {
          score: 1,
          date: '2021-08-20T13:15:21Z'
        },
        {
          score: 1,
          date: '2021-08-17T13:15:21Z'
        }
      ])
    })

    it('on list sync', () => {
      const service = new ScoresManager([
        {
          score: 2,
          date: '2021-08-20T13:15:21Z'
        },
      ])

      service.pushList(
        [
          {
            score: 1,
            date: '2021-08-20T13:15:21Z'
          },
          {
            score: 4,
            date: '2021-08-20T13:15:21Z'
          },

        ]
      )

      expect(service.get()).toEqual([
        {
          score: 4,
          date: '2021-08-20T13:15:21Z'
        },
        {
          score: 2,
          date: '2021-08-20T13:15:21Z'
        },
        {
          score: 1,
          date: '2021-08-20T13:15:21Z'
        }
      ])
    })
  })
})
