import { useQuery } from '@tanstack/react-query'
import { SearchHistoryItem, WeatherData } from '../types/weather'
import {
  fetchWeatherByCoords,
  fetchWeatherData
} from '../services/weatherService'
import { useEffect, useState } from 'react'

interface WeatherQueryOptions {
  staleTime?: number
  cacheTime?: number
  enabled?: boolean
}
export const useWeather = (city: string) => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(
    () => {
      const saved = localStorage.getItem('searchHistory')
      return saved ? JSON.parse(saved) : []
    }
  )

  const {
    data: weatherData,
    isLoading,
    error
  } = useQuery<WeatherData, Error>({
    queryKey: ['weather', city],
    queryFn: () => fetchWeatherData(city),
    enabled: !!city,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (weatherData && city) {
      if (!searchHistory.some(item => item.city === city)) {
        const newHistory = [
          {
            city,
            country: weatherData.city.country,
            timestamp: Date.now()
          },
          ...searchHistory
        ].slice(0, 10)
        setSearchHistory(newHistory)
        localStorage.setItem('searchHistory', JSON.stringify(newHistory))
      }
    }
  }, [weatherData, city, searchHistory])

  const removeFromHistory = (timestamp: number) => {
    const newHistory = searchHistory.filter(
      item => item.timestamp !== timestamp
    )
    setSearchHistory(newHistory)
    localStorage.setItem('searchHistory', JSON.stringify(newHistory))
  }

  return {
    weatherData,
    isLoading,
    error,
    searchHistory,
    removeFromHistory
  }
}

export const useWeatherByCoords = (
  lat: number | null,
  lon: number | null,
  options?: WeatherQueryOptions
) => {
  return useQuery<WeatherData, Error>({
    queryKey: ['weather', 'coords', lat, lon],
    queryFn: () => fetchWeatherByCoords(lat!, lon!),
    enabled:
      (options?.enabled !== undefined ? options.enabled : true) &&
      lat !== null &&
      lon !== null,
    staleTime: options?.staleTime || 5 * 60 * 1000,
    gcTime: options?.cacheTime || 30 * 60 * 1000,
    retry: (failureCount, error) => {
      if (failureCount >= 2) return false
      return true
    }
  })
}
