import { format, isToday, differenceInSeconds, endOfYesterday } from 'date-fns'

export function formatTime(date: Date): string {
  const now = new Date()

  if (differenceInSeconds(now, date) < 60) {
    return 'just now'
  }

  if (isToday(date)) {
    return format(date, 'HH:mm')
  }

  if (endOfYesterday()) {
    return 'Yesterday'
  }
  
  return format(date, 'dd/MM/yy')
}