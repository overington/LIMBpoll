import styles from '../styles/Home.module.css'

// import { Bar } from 'react-chartjs-2'
import { useState, useEffect } from 'react'
import io from 'Socket.IO-client'


import { useSessionState } from '../components/states'

let socket;
async function socketInitializer(current_question) {
  await fetch('/api/socketio');
  socket = io()

  socket.on('connect', () => {
    console.log('connected')
  })
  // Audience call initialze current session values
  socket.on('update-question-audience', (msg, callback) => {
    // send to audience
    console.log('audience member has requested callback')
    callback({
      status: 'ok',
      current: current_question
    })
  })
}

export default function AdminPage(props) {
  // questions
  const [current_question, setCurrentQuestion] = useState(null)
  const S = props.scenarios

  // Socket init
  useEffect(() => {
    socketInitializer(current_question)
    fetch('/api/current')
      .then((res) => res.json())
      .then((data) => {
        console.log('fetching first time to get curent: ', data)
        setCurrentQuestion(data.current)
      })
  })


  const handleUpdateQuestion = (key) => {
    console.log('updating to question ', key)
    const res = fetch('/api/current/', {
      method: 'POST',
      headers: {"Content-type": "application/json;charset=UTF-8"},
      body: JSON.stringify({current: key})
    })
    console.log('posted update question to api/current with payload: nothing')
    socket.emit('update-question-admin', key, (response) => {
      if (response.status == 'ok') {
        setCurrentQuestion(key)
      }
    })
  }

  const Scenarios = Object.keys(S).map((key) => {
    const currentItem = (key == current_question) ? 'selected' : ''
    return (
    <li key={key} className={`${styles.card} ${currentItem}`} >
      <h5>Question {key}:</h5>
      <h3>{S[key].question}</h3>
         <button onClick={()=>handleUpdateQuestion(key)}>
             Select
         </button>
    </li>
      )
  })


  return (
    <>
    <h1>Admin area</h1>
    <h2>Questions</h2>
    <ul>
      {Scenarios}
    </ul>
    <h2>Dashboard</h2>
      <div>
        <p>bar chart here</p>
      </div>
    </>

  )
}

import { getJsonObj } from '../lib/file'

export async function getStaticProps(context) {
  const objectData = await getJsonObj('./public/play.json')
  return {
    props: objectData
  }
}
