import { useSessionState } from '../components/states'

import { useEffect, useState } from 'react'
import io from 'Socket.IO-client'
import useSWR from 'swr'

import VotingCard from '../components/VotingCard'


let socket;
async function socketInitializer(setCurrent) {
  await fetch('/api/socketio');
  socket = io()

  socket.on('connect', () => {
    console.log('connected')
  })


  // Change 
  socket.on('update-input', (q) => {
    console.log('updating question: ', q)
    setCurrent(q)
  })
}


export default function Home(props) {

  const [current, setCurrent] = useState(null)
  const [votecardtype, setVotecardtype] = useState('empty')
  useEffect(() => {
    socketInitializer(setCurrent)
    fetch('/api/current')
      .then((res) => res.json())
      .then((data) => {
        console.log('fetching first time to get curent: ', data)
        setCurrent(data.current)
      })
  }, [])
  useEffect(() => {
    // Update voting card type
    setVotecardtype(current)
  }, [current])
  const vote = (answer) => {
    socket.emit('audience-submit-answer', current, answer)
  }

  if (current == null) return "Loading..."
  // if (isLoading) return "Loading..."; 
  // if (isError) return "An error has occurred.";

  let question = props.scenarios[current].question
  let description = props.scenarios[current].description

  let options = [];
  props.scenarios[current].options.map((el) => {
    options.push({
      text : el,
      vote_callback : vote
    }) 
  });

  return (
      <VotingCard
        question={question}
        description={description}
        options={options}
        cardtype={votecardtype}
      />
  )
}


import { getJsonObj } from '../lib/file'

export async function getStaticProps(context) {
  const objectData = await getJsonObj('./public/play.json')
  return {
    props: objectData
  }
}
