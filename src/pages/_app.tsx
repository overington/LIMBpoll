import '../styles/globals.css'
import Layout from '../components/layout'

function LIMBPollApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default LIMBPollApp;