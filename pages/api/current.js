import path from 'path'
import { getJsonObj, updateSession } from '../../lib/file'


// let state_conf = require('/data/state.json')
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    console.log('req.current: ', req.body.current)
    updateSession('/data/state.json', {current: req.body.current} )
  } else {
    // Handle any other HTTP method
    console.log('api/current recieved a GET request with payload: ', req.body)
    const state_conf = await getJsonObj('/data/state.json')
    console.log('api/current: loading state: ', state_conf)
    const payload = {current: state_conf.current, more: "Hello"}
    res.status(200).json(payload)
  }
}
