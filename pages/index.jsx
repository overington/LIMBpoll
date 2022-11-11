import { useSessionState } from '../components/states'

import { useEffect, useState } from 'react'
import io from 'Socket.IO-client'
import useSWR from 'swr'

import VotingCard from '../components/VotingCard'


let socket;
async function socketInitializer({current, setCurrent}) {
  // console.log('socketInitializer props: ', props)
  await fetch('/api/socketio');
  socket = io()

  socket.on('connect', () => {
    console.log('connected')
  })

  // First call to initialize current session values
  socket.emit('update-question-audience', 'give me the values', (response) => {
    if (response.status == 'ok') {
      setCurrent(response.current)
    }
  })

  // Change 
  socket.on('update-input', (q) => {
    console.log('updating question: ', q)
    setCurrent(q)
  })
}


export default function Home(props) {

  const [current, setCurrent] = useState(null)
  useEffect(() => {
    socketInitializer({
      setCurrent,
      current
    })
    fetch('/api/current')
      .then((res) => res.json())
      .then((data) => {
        console.log('fetching first time to get curent: ', data)
        setCurrent(data.current)
      })
  })

  if (current == null) return "Loading..."
  // if (isLoading) return "Loading..."; 
  // if (isError) return "An error has occurred.";

  let question = props.scenarios[current].question;
  console.log(question, ' ')
  console.log(props, ' ')
  let options = [];
  props.scenarios[current].options.map((el) => {
    options.push({
      text : el,
      vote_callback : (el) => {vote(el)}
    }) 
  });

  return (
      <VotingCard
        question={question}
        options={options}
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
