import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      <p>
        {anecdote}
        <br></br>
        has {votes} votes
      </p>
    </>
  )
}

const MostVotes = ({anecdotes, votes, max}) => {
  // Find the idx of the anecdotes with the max votes
  return (
    <div>
      <h1> Anecdote with the most votes </h1>
      <Anecdote anecdote={anecdotes[max]} votes={votes[max]} />
    </div>
  )
}

const randomIdx = () => Math.floor(Math.random() * anecdotes.length) 

const findMaxIdx = (array) => {
    let max = array[0]
    let maxIdx = 0

    for(let i = 1; i < array.length; i++) {
      if(array[i] > max) {
        max = array[i]
        maxIdx = i
      }
    }

    return maxIdx
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, updateVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, updateMost] = useState(0)


  const handleVote = (idx) => {
    const copy = [ ...votes ]
    copy[idx] += 1
    updateVotes(copy)
    updateMost(findMaxIdx(votes))
  }

  return (
    <div>
      <h1> Anecdote of the day </h1>
      <Anecdote anecdote={props.anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={() => handleVote(selected)} text="vote" />
      <Button onClick={() => setSelected(randomIdx())} text="next anecdote" />
      <MostVotes anecdotes={props.anecdotes} votes={votes} max={mostVotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)