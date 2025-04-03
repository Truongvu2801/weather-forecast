import { useQuery } from '@tanstack/react-query'
import { SearchHistoryItem, WeatherData } from '../types/weather'
import { fetchWeatherData } from '../services/weatherService'
import { useEffect, useState } from 'react'

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
