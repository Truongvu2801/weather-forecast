const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const fetchWeatherData = async (query: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${query}&units=metric&appid=${API_KEY}`
    )

    if (!response.ok) {
      throw new Error('Invalid country or city')
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    )

    if (!response.ok) {
      throw new Error('Invalid country or city')
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}
