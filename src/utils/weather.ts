import { WeatherForecast } from '../types/weather'

export const getIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`
}

export const groupForecastsByDay = (
  list: WeatherForecast[]
): Record<string, WeatherForecast[]> => {
  return list.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0]
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(item)
    return acc
  }, {} as Record<string, WeatherForecast[]>)
}

export const convertVisibility = (visibility: number): number => {
  return visibility / 1000 // Convert meters to kilometers
}
