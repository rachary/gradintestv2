import { format, isToday, differenceInSeconds } from 'date-fns'

export function formatTime(date: Date): string {
  const now = new Date()

  if (differenceInSeconds(now, date) < 60) {
    return 'just now'
  }

  if (isToday(date)) {
    return format(date, 'HH:mm')
  }
  
  if (date == null) {
    return ' '
  }

  return format(date, 'dd/MM/yy')
}