import * as dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const getCurrentUTCString = () => {
  return dayjs.utc().format()
}

export default dayjs.utc()
