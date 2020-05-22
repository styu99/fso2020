import React from 'react'

const Weather = ({ weather }) => {
    if (Object.keys(weather).length === 0 && weather.constructor === Object) {
        return (
            <div>
                Loading weather info...
            </div>
        )
    } else {
        const { location, current } = weather
        return (
            <div>
                <h2>Weather in {location.name}</h2>
                <div>
                    <b>temperature:</b> {current.temperature} Fahrenheit
                </div>
                <img src={current.weather_icons[0]}
                    alt="Weather icon"
                    width="100"></img>
                <div>
                    <b>wind:</b> {current.wind_speed} mph direction {current.wind_dir}
                </div>
            </div>
        )
    }
}

export default Weather