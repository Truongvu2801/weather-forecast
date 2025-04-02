import React from 'react'
import { ForecastItemProps } from '../../../types/weather'
import './ForecastItem.scss'
import { getIconUrl } from '../../../utils/weather'

const ForecastItem: React.FC<ForecastItemProps> = ({
  time,
  temperature,
  condition,
  icon
}) => {
  return (
    <div className="forecast-item">
      <span className="time">{time}</span>
      <img src={getIconUrl(icon)} alt="weather icon" />
      <span className="temperature">
        {Math.round(temperature.max)}°C / {Math.round(temperature.min)}°C
      </span>
      <span className="condition">{condition}</span>
    </div>
  )
}

export default ForecastItem
