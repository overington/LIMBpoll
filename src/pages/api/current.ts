// import { getJsonObj, updateSession } from '@/lib/file'
import { StateType } from '@/types/VotingTypes'
import type { NextApiRequest, NextApiResponse } from 'next'


const STATE: StateType = {
  current_scenario: 'empty',
  vote_count: 0
}

function updateVoteCount(state: StateType) {
  // If the current scenario is the same as the one in the state, increment the
  // vote count.
  if (state.current_scenario === STATE.current_scenario) {
    STATE.vote_count += 1
    console.log('api/current: STATE.current_scenario: ', STATE.current_scenario, ' STATE.vote_count: ', STATE.vote_count) 
  }
}
function updateScenario(state: StateType) {
  // admin function to change the current scenario to the one in the state
  STATE.current_scenario = state.current_scenario

}
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    console.log('req.body: ', req.body)

    // if the request came from the admin page, update the scenario
    if (req.body.admin) {
      console.log('api/current: admin request')
      updateScenario(req.body)
    } else {
      console.log('api/current: user request')
      // otherwise, update the vote count
      updateVoteCount(req.body)
    }
  } else {
    // Handle any other HTTP method
    console.log('api/current recieved a GET request with payload: ', req.body)
    const payload: StateType = {
      current_scenario: STATE.current_scenario,
      vote_count: STATE.vote_count
    }
    res.status(200).json(payload)
  }
}