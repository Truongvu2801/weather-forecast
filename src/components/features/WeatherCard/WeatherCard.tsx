import React from 'react'
import { WeatherCardProps } from '../../../types/weather'
import { formatFullDate } from '../../../utils/date'
import { getIconUrl } from '../../../utils/weather'
import WindArrow from '../../common/WindArrow/WindArrow'

import styles from './WeatherCard.module.scss'

const WeatherCard: React.FC<WeatherCardProps> = ({
  date,
  temperature,
  condition,
  humidity,
  winds,
  windDegree,
  visibility,
  icon
}) => {
  return (
    <div className={styles['weather-card']}>
      <div className={styles['date']}>{formatFullDate(date)}</div>
      <div className={styles['main-info']}>
        <img src={getIconUrl(icon)} alt="weather icon" />
        <div className={styles['temperature']}>{Math.round(temperature)}°C</div>
        <div className={styles['condition']}>{condition}</div>
      </div>
      <div className={styles['details']}>
        <div className={styles['detail-item']}>
          <span>Humidity</span>
          <span>{humidity}%</span>
        </div>
        <div className={styles['detail-item']}>
          <span>Winds</span>
          <div className={styles['wind-info']}>
            <WindArrow degree={windDegree} />
            <span>{winds} m/s</span>
          </div>
        </div>
        <div className={styles['detail-item']}>
          <span>Visibility</span>
          <span>{visibility} km</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
