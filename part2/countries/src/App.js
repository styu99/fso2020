import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([
  ])
  const [ newFilter, setNewFilter ] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const countriesToShow = newFilter === ''
    ? countries 
    : countries.filter(country => country.name.toUpperCase().includes(newFilter.toUpperCase()))
 
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries countriesToShow={countriesToShow} />
    </div>
  )
}

export default App