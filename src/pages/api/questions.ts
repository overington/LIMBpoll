// Simple hello world API route
import { NextApiRequest, NextApiResponse } from 'next'
import { getJsonObj } from '@/lib/file'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method === 'POST') {
        // Process a POST request
        console.log('req.current: ', req.body.current)
        updateSession('/data/state.json', {current: req.body.current} )
    } else {
        // Handle any other HTTP method
        console.log('api/current recieved a GET request with payload: ', req.body)
        const state_conf = await getJsonObj('/src/data/state.json')
        console.log('api/current: loading state: ', state_conf)
        const payload = {current: state_conf.current, more: "Hello"}
        res.status(200).json(payload)
    }
}