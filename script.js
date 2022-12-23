console.log("Hello, world!")

// my API Keys: 0eb089dd7b64c6aad23737c804ed8201

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// icon url: http://openweathermap.org/img/wn/10d@2x.png

// ## Data to get:

// 1. City Name: `name`
// 2. Weather description: `weather[0].description`
// 3. Weather icon: `weather[0].icon`
// 4. temperature: `main.temp`
// 5. feels like: `main.feels_like`
// 6. humidity: `main.humidity`

const img = document.querySelector("img");
const nameElem = document.querySelector(".name");
const weatherElem = document.querySelector(".weather");
const tempElem = document.querySelector(".temp");
const feelsElem = document.querySelector(".feels");
const humidityElem = document.querySelector(".humidity")

const Weather = (promiseData) => {
    const name = promiseData.name;
    const weather = promiseData.weather[0].description;
    const weatherIcon = promiseData.weather[0].icon;
    const temp = promiseData.main.temp;
    const feelsLike = promiseData.main.feels_like;
    const humidity = promiseData.main.humidity;

    return { name, weather, weatherIcon, temp, feelsLike, humidity}
}

const getCurrentWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0eb089dd7b64c6aad23737c804ed8201`);
        const data = await response.json();

        const weatherObj = Weather(data);
        console.log(weatherObj);

        img.src = `http://openweathermap.org/img/wn/${weatherObj.weatherIcon}@2x.png`;
        nameElem.textContent += weatherObj.name;
        weatherElem.textContent += weatherObj.weather;
        tempElem.textContent += Math.round(weatherObj.temp - 273) + ' °C';
        feelsElem.textContent += Math.round(weatherObj.feelsLike -273) + ' °C';
        humidityElem.textContent += Math.round(weatherObj.humidity) + '%';
    } catch (error) {
        console.log(error);        
    }
}


getCurrentWeather("Dieng");