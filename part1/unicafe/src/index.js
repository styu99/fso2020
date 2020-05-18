import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> Give Feedback </h1>
      // buttons go here
      <h1> Statistics </h1>
      // display info here
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)