import React, { useState } from 'react'
import { WeatherForecast } from '../../types/weather'
import WeatherCard from '../../components/features/WeatherCard/WeatherCard'
import ForecastItem from '../../components/features/ForecastItem/ForecastItem'
import { ReactComponent as LocationIcon } from '../../assets/location-icon.svg'
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg'
import { groupForecastsByDay } from '../../utils/weather'
import { formatTime, formatWeekday } from '../../utils/date'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounce'
import { useWeather } from '../../hooks/useWeather'

import styles from './Home.module.scss'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery)

  const { data: weatherData, error, isLoading } = useWeather(debouncedSearch)

  const handleSearchIconClick = () => {
    navigate('/search')
  }

  const getCurrentWeather = () => {
    return weatherData?.list[0]
  }

  const current = getCurrentWeather()
  const groupedForecasts = weatherData
    ? groupForecastsByDay(weatherData.list)
    : {}

  return (
    <div className={styles['home']}>
      <div className={styles['search-section']}>
        <div className={styles['search-input']}>
          <LocationIcon className={styles['location-icon']} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search city..."
          />
          <SearchIcon
            className={styles['search-icon']}
            onClick={handleSearchIconClick}
          />
        </div>
        {error && <div className={styles['error']}>City not found</div>}
      </div>

      {isLoading && <div>Loading...</div>}
      {weatherData && current && (
        <>
          <WeatherCard
            date={current.dt_txt}
            temperature={current.main.temp}
            condition={current.weather[0].description}
            humidity={current.main.humidity}
            winds={current.wind.speed}
            windDegree={current.wind.deg}
            visibility={current.visibility / 1000}
            icon={current.weather[0].icon}
          />

          <div className={styles['forecast-section']}>
            <h3>5-day Forecast (3 Hours)</h3>
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
