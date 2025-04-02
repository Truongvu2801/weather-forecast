export interface WeatherData {
  list: ForecastItem[]
  city: {
    name: string
    country: string
  }
}

export interface WeatherCardProps {
  date: string
  temperature: number
  condition: string
  humidity: number
  winds: number
  windDegree: number
  visibility: number
  icon: string
}

export interface ForecastItemProps {
  time: string
  temperature: {
    max: number
    min: number
  }
  condition: string
  icon: string
}

export interface ForecastItem {
  dt: number
  dt_txt: string
  main: {
    temp: number
    temp_min: number
    temp_max: number
    humidity: number
    pressure: number
  }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
  wind: {
    speed: number
    deg: number
  }
  visibility: number
}

export interface SearchHistoryItem {
  query: string
  timestamp: number
}

export interface WeatherForecast {
  dt: number
  dt_txt: string
  main: {
    temp_max: number
    temp_min: number
  }
  weather: [
    {
      description: string
      icon: string
    }
  ]
}
