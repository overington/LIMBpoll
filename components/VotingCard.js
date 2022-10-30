import React from "react";
import styles from '../styles/Home.module.css'

export default function VotingCard(props) {
    // props.question: string
    // props.options: Array[Object] [{ text: $text, link: $link}, ...]

    return (
      <main className={styles.main}>
        <p className={styles.description}>
          Question 1, scene 1
        </p>

        <h1 className={styles.title}>
          {props.question}
        </h1>

        <div className={styles.grid}>
            {props.options.map(el => {
                return (
                  <a href={el.link} className={styles.card}>
                      <h2>{el.text}</h2>
                  </a>
                );
            }) }
        </div>
      </main>

    );
}