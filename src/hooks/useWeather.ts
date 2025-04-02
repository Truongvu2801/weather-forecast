import { useQuery } from '@tanstack/react-query'
import { WeatherData } from '../types/weather'
import { fetchWeatherData } from '../services/weatherService'

export const useWeather = (city: string) => {
  return useQuery<WeatherData, Error>({
    queryKey: ['weather', city],
    queryFn: () => fetchWeatherData(city),
    enabled: !!city,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  })
}
