import React, { useState, useEffect, useMemo } from 'react'
import { WeatherForecast } from '../../types/weather'
import WeatherCard from '../../components/features/WeatherCard/WeatherCard'
import ForecastItem from '../../components/features/ForecastItem/ForecastItem'
import { groupForecastsByDay } from '../../utils/weather'
import { formatTime, formatWeekday } from '../../utils/date'
import { useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounce'
import { useWeather } from '../../hooks/useWeather'
import Skeleton from '../../components/common/Skeleton/Skeleton'
import SearchBar from '../../components/features/SearchBar/SearchBar'

import styles from './Home.module.scss'

const Home = () => {
  const navigate = useNavigate()
  const { cityName } = useParams<{ cityName?: string }>()

  const [searchQuery, setSearchQuery] = useState(cityName || '')
  const debouncedSearch = useDebounce(searchQuery)

  // Update searchQuery when URL parameter changes
  useEffect(() => {
    if (cityName) {
      setSearchQuery(cityName)
    }
  }, [cityName])

  const { weatherData, isLoading, error } = useWeather(debouncedSearch)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    if (value) {
      navigate(`/city/${encodeURIComponent(value)}`, { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }

  const currentWeather = weatherData?.list[0]
  const groupedForecasts = useMemo(
    () => (weatherData ? groupForecastsByDay(weatherData.list) : {}),
    [weatherData]
  )

  return (
    <div className={styles['home']}>
      <SearchBar
        value={searchQuery}
        onChange={handleInputChange}
        error={error}
      />
      {isLoading && <Skeleton />}
      {weatherData && currentWeather && (
        <>
          <WeatherCard
            date={currentWeather.dt_txt}
            temperature={currentWeather.main.temp}
            condition={currentWeather.weather[0].description}
            humidity={currentWeather.main.humidity}
            winds={currentWeather.wind.speed}
            windDegree={currentWeather.wind.deg}
            visibility={currentWeather.visibility / 1000}
            icon={currentWeather.weather[0].icon}
          />
          <h3>5-day Forecast (3 Hours)</h3>
          <div className={styles['forecast-section']}>
            {Object.entries(groupedForecasts).map(([date, items]) => (
              <div key={date} className={styles['forecast-day']}>
                <h4>{formatWeekday(date)}</h4>
                <div className={styles['forecast-list']}>
                  {items.map((item: WeatherForecast) => (
                    <ForecastItem
                      key={item.dt}
                      time={formatTime(item.dt_txt)}
                      temperature={{
                        max: item.main.temp_max,
                        min: item.main.temp_min
                      }}
                      condition={item.weather[0].description}
                      icon={item.weather[0].icon}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Home
