import React from "react";
import styles from '../styles/Home.module.css'

export default function VotingCard(props) {
  // props.question: string
  // props.options: Array[Object] [{ text: $text, link: $link}, ...]

  if (props.cardtype == 'empty')  {
    return (
    <EmptyVotingCard
      question={props.question}
      description={props.description}
    />)
  }
  return (
    <main className={styles.main}>
      <p className={styles.description}>
        {props.description}
      </p>

      <h1 className={styles.title}>
        {props.question}
      </h1>

      <div className={styles.grid}>
          {props.options.map(op => {
              return (
                <button className={styles.card} key={op.id} onClick={()=>op.vote_callback(op.text)}>
                    <h2>{op.text}</h2>
                </button>
              );
          }) }
      </div>
    </main>

  );
}

export function EmptyVotingCard(props) {
  return (
    <main className={styles.main}>
      <p className={styles.description}>
        {props.description}
      </p>
      <h1 className={styles.title}>
        {props.question}
      </h1>

    </main>
  );
}

export function Scenarios(props) {
  const scenario_els = Object.keys(props.scenarios).map((key) => {
    const currentItem = (key == props.current_question) ? 'selected' : ''
    return (
    <li key={key} className={`${styles.card} ${currentItem}`} >
      <h5>Question {key}:</h5>
      <h3>{props.scenarios[key].question}</h3>
         <button onClick={()=>props.setCurrentQuestion(key)}>
             Select
         </button>
    </li>)
  })
  return (<ul className={styles.grid}>
        {scenario_els}
        </ul>)

}
export function VoteCount(props) {
  console.log('question: ', props.question)
  if (props.current_question == null) {
    return <p>Loading Vote Count...</p>
  }
  else if (props.current_question == 'empty'){
    return <p>Choose question.</p>
  } else {
  console.log('vote_count Obj: ', Object.entries(props.vote_count))
  return (<>
    <h1>Counting the votes here</h1>
    <ul>
    {Object.entries(props.vote_count).map(([elQ, elV]) => {
      return (
      <li key={elQ}>
        <p>{elQ}: {elV}</p>
      </li>
        )
    })}
    </ul>
  </>)}


}
