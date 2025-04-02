export const formatTime = (dateStr: string): string => {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

export const formatFullDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-SG', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export const formatWeekday = (dateStr: string): string => {
  const date = new Date(dateStr)
  const today = new Date()

  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'long'
  })
}
