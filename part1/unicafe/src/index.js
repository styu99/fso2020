import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistic = ({ label, value, end}) => {
  if (end) {
    return (
      <tr>
        <td>{label}</td>
        <td>{value}</td>
        <td>{end}</td>
      </tr>
    )
  } else{
    return (
      <tr>
        <td>{label}</td>
        <td>{value}</td>
      </tr>
    ) 
  }
} 





const Statistics = ({ good, bad, neutral }) => {
  let sum = good + bad + neutral

  const calculateAverage = (good, neutral, bad) => {
    let score = good - bad
    if (score == 0) {
      return 0
    } else {
      return score / sum
    }
  }

  const calculatePositive = (good, neutral, bad) => {
    if (sum == 0) {
      return 0
    } else {
      return (good / sum) * 100
    }
  }

  if (sum == 0) {
    return <div>No feedback given</div>
  }

  return (
    <table>
      <tbody>
        <Statistic label={"good"} value={good} />
        <Statistic label={"neutral"} value={neutral} />
        <Statistic label={"bad"} value={bad} />
        <Statistic label={"all"} value={sum} />
        <Statistic label={"average"} value={calculateAverage(good, neutral, bad)} />
        <Statistic label={"positive"} value={calculatePositive(good, neutral, bad)} end={"%"} /> 
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> Give Feedback </h1>
      <Button onClick={() => setGood(good + 1)} text={"good"} />
      <Button onClick={() => setNeutral(neutral+ 1)} text={"neutral"} />
      <Button onClick={() => setBad(bad + 1)} text={"bad"} />
      <h1> Statistics </h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
   </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)