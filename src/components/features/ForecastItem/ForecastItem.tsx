import React from 'react'
import { ForecastItemProps } from '../../../types/weather'
import { getIconUrl } from '../../../utils/weather'

import styles from './ForecastItem.module.scss'

const ForecastItem = ({
  time,
  temperature,
  condition,
  icon
}: ForecastItemProps) => {
  return (
    <div className={styles['forecast-item']}>
      <span className={styles['time']}>{time}</span>
      <img src={getIconUrl(icon)} alt="weather icon" />
      <span className={styles['temperature']}>
        {Math.round(temperature.max)}°C / {Math.round(temperature.min)}°C
      </span>
      <span className={styles['condition']}>{condition}</span>
    </div>
  )
}

export default ForecastItem
