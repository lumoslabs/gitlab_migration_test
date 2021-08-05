import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const getCurrentUTCString = () => {
  return dayjs.utc().format()
}

export const getDayjsWithTimezone = (tz) => {
  return dayjs.tz(new Date(), tz)
}

export const isValidTimezone = (tz) => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  }
  catch (ex) {
    return false;
  }
}
export { dayjs }
export default dayjs.utc()
