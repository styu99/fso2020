import React, { useState, useEffect } from 'react'
import Person from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))
 
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    // Check to see if somebody with that name exists
    const duplicate = persons.find(p => p.name === newName)
    if (duplicate) {
      const replace = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      if (replace) {
        personService
          .update(duplicate.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
          })
          

      }
    } else {
      personService 
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${person.name}?`)) {
      personService 
        .remove(id)
      setPersons(persons.filter(p => p.id !== id))
    }
  }


  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
          {personsToShow.map(person =>
          <Person
            key={person.name}
            person={person}
            deletePerson={() => deletePerson(person.id)} />
          )}
      </div>
    </div>
  )
}

export default App