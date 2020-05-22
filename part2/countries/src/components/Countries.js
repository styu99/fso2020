import React, { useState, useEffect } from 'react'
import Weather from './Weather'
import axios from 'axios'


const CountryInfo = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [ weather, setWeather ] = useState({})
    const hook = () => {
        let mounted = true
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}&units=f`)
            .then(response => {
                if(mounted){
                    setWeather(response.data)
                }
            })
        return () => mounted = false
    }
    useEffect(hook, [])

    return(
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language =>
                    <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt={`flag of ${country.name}`} width="200"></img>
            <Weather weather={weather} />
        </div>
    )
}

const CountryListEntry = ({ country }) => {
    const [displayInfo, updateDisplay] = useState(false)

    const handleClick = () => {
        updateDisplay(!displayInfo)
    }

    if (displayInfo) {
        return (
            <div>
                { country.name }
                <button onClick={() => handleClick()}> show </button>
                <CountryInfo country={country} />
            </div>
        )
    } else {
        return(
            <div>
                { country.name }
                <button onClick={() => handleClick()}> show </button>
            </div>
        )
    }
}


const Countries = ({ countriesToShow }) => {
    if (countriesToShow.length === 1) {
        return (
            <CountryInfo country={countriesToShow[0]} />
        )
    } else {
        return (
            <div>
                {countriesToShow.map(country =>
                    <CountryListEntry key={country.numericCode} country={country} />
                )}
            </div>
        )
    }
}
 
export default Countries