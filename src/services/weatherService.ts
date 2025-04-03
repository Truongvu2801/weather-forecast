const API_KEY = '8dc8e219c6c34ff9b55384cf69ba1c37'
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
