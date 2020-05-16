import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = 'Richard Stallman'
  const age = '67'
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Jeff" age={60 + 9}/>
      <Hello name={name} age={age}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
