import React from 'react'
import { WeatherCardProps } from '../../../types/weather'
import './WeatherCard.scss'
import { formatFullDate } from '../../../utils/date'
import { getIconUrl } from '../../../utils/weather'

const WindArrow: React.FC<{ degree: number }> = ({ degree }) => (
  <svg
    className="wind-arrow"
    style={{ transform: `rotate(${degree}deg)` }}
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path d="M12 2L9 9h6L12 2zm0 20l3-7H9l3 7z" />
  </svg>
)

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
    <div className="weather-card">
      <div className="date">{formatFullDate(date)}</div>
      <div className="main-info">
        <img src={getIconUrl(icon)} alt="weather icon" />
        <div className="temperature">{Math.round(temperature)}°C</div>
        <div className="condition">{condition}</div>
      </div>
      <div className="details">
        <div className="detail-item">
          <span>Humidity</span>
          <span>{humidity}%</span>
        </div>
        <div className="detail-item">
          <span>Winds</span>
          <div className="wind-info">
            <WindArrow degree={windDegree} />
            <span>{winds} m/s</span>
          </div>
        </div>
        <div className="detail-item">
          <span>Visibility</span>
          <span>{visibility} km</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
