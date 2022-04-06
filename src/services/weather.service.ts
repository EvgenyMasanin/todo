const DATA_URL = `http://api.openweathermap.org/data/2.5/weather?units=metric&`
const ICON_URL = `http://openweathermap.org/img/wn`

const lon = 30.3449
const lat = 53.9168
const API_KEY = 'b04403020347e5c62dd0e26afd515247'

export interface WeatherResponse {
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]

  main: {
    temp: number
  }
}
interface ResponseError {
  message: string
}

interface Weather {
  temperature: string
  iconCode: string
}

interface GetCurrentWeatherResult {
  weather: Weather | null
  error: ResponseError | null
}

class WeatherService {
  async getCurrentWeather(): Promise<GetCurrentWeatherResult> {
    const url = `${DATA_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`
    const res = await fetch(url, {
      method: 'GET',
    })

    if (res.status !== 200) {
      return {
        weather: null,
        error: { message: 'Something is going wrong!' },
      }
    }

    const weatherData = (await res.json()) as WeatherResponse

    const temperature = Math.round(weatherData.main.temp)
    const iconCode = weatherData.weather[0].icon

    const isAboveZero = temperature > 0

    return {
      weather: { temperature: `${isAboveZero && '+'}${temperature}℃`, iconCode },
      error: null,
    }
  }

  getWeatherIconUrl(iconCode: string) {
    return `${ICON_URL}/${iconCode.match(/\d+/)}d@2x.png`
  }
}

export const { getCurrentWeather, getWeatherIconUrl } = new WeatherService()
