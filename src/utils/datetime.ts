import moment from 'moment'

export const isToday = (datetime: string): boolean => moment(datetime).isSame(moment(), 'day')

export const isNow = (scheduleTime: string, duration: string): boolean => {
  const format = 'HH:mm:ss'
  const [hour, minute] = duration.split(':')
  const starTime = moment(scheduleTime).format(format)
  const totalDurationInHour = parseInt(hour) + (parseInt(minute) / 60)
  const endTime = moment(scheduleTime).add(totalDurationInHour, 'hours').format(format)
  const currentTime = moment(moment().format(format), format)

  return currentTime.isBetween(moment(starTime, format), moment(endTime, format))
}