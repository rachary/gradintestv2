import { format, isToday, differenceInSeconds, differenceInMinutes } from 'date-fns'

export function formatTime(date: Date|string) {
  if (!date) {
    return ' '
  }

  const now = new Date()
  
  if (differenceInSeconds(now, date) < 60) {
    return 'just now'
  }
  if (isToday(date)) {
    return format(date, 'HH:mm')
  }
  return format(date, 'dd/MM/yy')
}