# Project: Weather App using OpenWeather API

In this project I make a weather web application using OpenWeather API.  
This is my first project using API so I'm really exited to build this app!

## OpenWeather API

**Current Weather**

API Call

```
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
```
---


**5 day weather forecast**

API Call
```
api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
```

## Data to get:

1. City Name: `name`
2. Weather description: `weather[0].description`
3. Weather icon: `weather[0].icon`
4. temperature: `main.temp`
5. feels like: `main.feels_like`
6. humidity: `main.humidity`