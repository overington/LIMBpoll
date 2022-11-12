import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Layout({children}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Link in my bio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}

      <footer className={styles.footer}>
        <p>L.I.M.B</p>
      </footer>
    </div>
  )
}
