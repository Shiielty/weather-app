console.log('Hello, world!')

// my API Keys: 0eb089dd7b64c6aad23737c804ed8201

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// icon url: http://openweathermap.org/img/wn/10d@2x.png

const input = document.querySelector('input')
const btn = document.querySelector('button')
const img = document.querySelector('img')
const cityElem = document.querySelector('.city')
const weatherElem = document.querySelector('.weather')
const weatherDescElem = document.querySelector('.weather-desc')
const tempElem = document.querySelector('.temp')
const feelsElem = document.querySelector('.feels')
const humidityElem = document.querySelector('.humidity')
const minTempElem = document.querySelector(".min-temp")
const maxTempElem = document.querySelector(".max-temp")


const getCurrentWeather = async (city) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0eb089dd7b64c6aad23737c804ed8201`)
    const data = await response.json()
    console.log(data);

    if (data.cod === 200) {
      return data
    } else {
      throw data.message
    }
  } catch (error) {
    alert(error)
  }
}

const Weather = (promiseData) => {
  const city = promiseData.name
  const weather = promiseData.weather[0].main
  const weatherIcon = promiseData.weather[0].icon
  const weatherDesc = promiseData.weather[0].description
  const temp = promiseData.main.temp
  const feelsLike = promiseData.main.feels_like
  const humidity = promiseData.main.humidity
  const minTemp = promiseData.main.temp_min
  const maxTemp = promiseData.main.temp_min

  return { city, weather, weatherIcon, weatherDesc, temp, feelsLike, humidity, minTemp, maxTemp }
}

const updateDOM = (obj) => {
  img.src = `http://openweathermap.org/img/wn/${obj.weatherIcon}@2x.png`
  cityElem.textContent = obj.city
  weatherElem.textContent = obj.weather
  weatherDescElem.textContent = obj.weatherDesc
  tempElem.textContent = `${Math.round(obj.temp - 273)} °C`
  feelsElem.textContent = `${Math.round(obj.feelsLike - 273)} °C`
  humidityElem.textContent = `${obj.humidity}%`
  minTempElem.textContent = `${Math.round(obj.minTemp - 273)} °C`
  maxTempElem.textContent = `${Math.round(obj.maxTemp - 273)} °C`
}


const newWeather = async(city) => {
  try {
    const currentWeather = await getCurrentWeather(city);
    const obj = Weather(currentWeather);
    updateDOM(obj);
  } catch (err) {
    // ignore
  }
}

newWeather("Tokyo");

btn.addEventListener('click', () => {
  newWeather(input.value)
})

input.addEventListener('keydown', (e) => {
  if (e.key === "Enter") newWeather(input.value);
})