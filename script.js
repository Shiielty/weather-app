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
let unit = "celcius"; // default is celcius

const getCurrentWeather = async (city) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0eb089dd7b64c6aad23737c804ed8201`)
    const data = await response.json()

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

const kelvinToCelcius = (temperature) => Math.round(temperature - 273.15);
const kelvinToFahrenheit = (temperature) => Math.round((temperature - 273.15) * (9/5) + 32);
const celciusToFahrenheit = (temperature) => Math.round((temperature * 9/5) + 32);
const fahrenheitToCelcius = (temperature) => Math.round((temperature - 32) * (5/9));

const updateDOM = (obj, unit) => {
  img.src = `http://openweathermap.org/img/wn/${obj.weatherIcon}@2x.png`
  cityElem.textContent = obj.city
  weatherElem.textContent = obj.weather
  weatherDescElem.textContent = obj.weatherDesc
  humidityElem.textContent = `${obj.humidity}%`

  if (unit === "celcius") {
    tempElem.textContent = `${kelvinToCelcius(obj.temp)} °C`
    feelsElem.textContent = `${kelvinToCelcius(obj.feelsLike)} °C`
    minTempElem.textContent = `${kelvinToCelcius(obj.minTemp)} °C`
    maxTempElem.textContent = `${kelvinToCelcius(obj.maxTemp)} °C`
  } else if (unit === "fahrenheit") {
    tempElem.textContent = `${kelvinToFahrenheit(obj.temp)} °F`
    feelsElem.textContent = `${kelvinToFahrenheit(obj.feelsLike)} °F`
    minTempElem.textContent = `${kelvinToFahrenheit(obj.minTemp)} °F`
    maxTempElem.textContent = `${kelvinToFahrenheit(obj.maxTemp)} °F`
  }
}

const newWeather = async(city) => {
  try {
    const currentWeather = await getCurrentWeather(city);
    const obj = Weather(currentWeather);
    updateDOM(obj, unit);
  } catch (err) {
    // ignore
  }
}

const toggleUnit = () => {
  const temp = parseInt(tempElem.textContent);
  const feelsLike = parseInt(feelsElem.textContent);
  const minTemp = parseInt(minTempElem.textContent);
  const maxTemp = parseInt(maxTempElem.textContent);
  
  if (unit === "celcius") {
    tempElem.textContent = `${celciusToFahrenheit(temp)} °F`
    feelsElem.textContent = `${celciusToFahrenheit(feelsLike)} °F`
    minTempElem.textContent = `${celciusToFahrenheit(minTemp)} °F`
    maxTempElem.textContent = `${celciusToFahrenheit(maxTemp)} °F`
  } else {
    tempElem.textContent = `${fahrenheitToCelcius(temp)} °C`
    feelsElem.textContent = `${fahrenheitToCelcius(feelsLike)} °C`
    minTempElem.textContent = `${fahrenheitToCelcius(minTemp)} °C`
    maxTempElem.textContent = `${fahrenheitToCelcius(maxTemp)} °C`
  }

  unit === "celcius" ? unit = "fahrenheit" : unit = "celcius";
}

btn.addEventListener('click', () => {
  newWeather(input.value)
})

input.addEventListener('keydown', (e) => {
  if (e.key === "Enter") newWeather(input.value);
})

newWeather("Tokyo");