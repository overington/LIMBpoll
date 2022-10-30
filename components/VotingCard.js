import React from "react";
import styles from '../styles/Home.module.css'

export default function VotingCard(props) {
    // props: question, answers
    // props.answers: answer.text, answer.link

    return (
      <main className={styles.main}>
        <p className={styles.description}>
          Question 1, scene 1
        </p>

        <h1 className={styles.title}>
          {props.question}
        </h1>

        <div className={styles.grid}>
            {props.answers.map(answer => {
                return (
                  <a href={answer.link} className={styles.card}>
                      <h2>{answer.text}</h2>
                  </a>
                );
            }) }
        </div>
      </main>

    );
}