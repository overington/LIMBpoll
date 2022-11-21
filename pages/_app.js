import '../styles/globals.css'
import Layout from '../components/layout'
import qrcode from 'qrcode-terminal'
// var qrcode = require('qrcode-terminal');

function MyApp({ Component, pageProps }) {
  if (typeof window === 'undefined') {
    logQR(process.env.HOST)
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

function logQR(HOST){
  console.log(`Generating QR code for ${HOST}`)
  qrcode.generate(HOST);
}

export default MyApp
