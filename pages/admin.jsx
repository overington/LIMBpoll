import styles from '../styles/Home.module.css'

// import { Bar } from 'react-chartjs-2'
import { useState, useEffect } from 'react'
import io from 'Socket.IO-client'

import { VoteCount, Scenarios } from '../components/VotingCard'
import { useSessionState } from '../components/states'

function createEmptyVoteObject(options) {
  const new_obj = {}
  if ( options.length > 0 ) {
    options.map((op) => new_obj[op] = 0)
  }
  return new_obj
}

let socket

export function useQuestion(current_question, scenarios) {
  const [current_q_obj, setCurrentQObj] = useState(scenarios[current_question])
  const [vote_count_obj, setVoteCount] = useState(createEmptyVoteObject(current_q_obj.options))
  const incrementVoteCount = (vote) => ({...vote_count, vote: vote_count[vote]+1})
  // useEffect(() => {
  //   console.log(vote_count_obj)
  // }, [vote_count_obj])

  // When Admin changes current_question
  useEffect(()=>{
    // Tell server to tell everyone about it
    socket.emit('update-question-admin', current_question, (response) => {
      if (response.status == 'ok') {
        // Save it to the database
        fetch('/api/current/', {
          method: 'POST',
          headers: {"Content-type": "application/json;charset=UTF-8"},
          body: JSON.stringify({current: current_question})
        })
          .then((res) => res.json())
          .then((data) => {
            // hydrate current_q_obj
            setCurrentQObj(scenarios[current_question])
            // reset voting object to all zeros
            setVoteCount(
              createEmptyVoteObject(current_q_obj.scenarios)
            )
          })
      }
    })

  }, [current_question])

  return ({
    current_q_obj: current_q_obj,
    vote_count_obj: vote_count_obj,
    incrementVoteCount: incrementVoteCount
  })

}

export default function AdminPage(props) {
  // Socket init
  useEffect(() => {
    fetch('/api/socketio');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('dashboard-answer', (question, vote) => {
      console.log('vote: ', vote, ' for question ', question)
      // TODO
      if (question == current_question) incrementVoteCount(vote)
    })
  }, [])

  const [current_question, setCurrentQuestion] = useState('empty')
  const { current_q_obj, vote_count_obj, incrementVoteCount } = useQuestion(current_question, props.scenarios)



  // const handleVote = (vote) => {
    // console.log('vote_count: ', vote_count)
    // const new_vote_obj = vote
    // console.log('new_vote_obj: ', new_vote_obj, ' vote: ', vote)
    // new_vote_obj[vote]++
    // console.log('incremented: ', new_vote_obj[vote])
    // setVoteCount(new_vote_obj)
  // }
  // update options

    // TODO incrementVoteCount()




  return (
    <>
    <div className={styles.section}>
      <h1>Admin area</h1>
      <h2>Questions</h2>
      <Scenarios
        scenarios={props.scenarios}
        current_question={current_question}
        setCurrentQuestion={setCurrentQuestion}
      />
    </div>
    <div className={styles.section}>
      <h2>Dashboard</h2>
      <p>Current question: {current_question}</p>
      <VoteCount
        vote_count={vote_count_obj}
      />
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
