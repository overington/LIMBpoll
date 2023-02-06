import { HomeProps } from '@/types/VotingTypes'

import Scenario from '@/components/Voting'
import { useVote } from '@/components/states'

export default function HomeTest(playProps: HomeProps) {
  console.log("playProps: ", playProps)
  const {current_scenario, isLoading, isError, vote_callback} = useVote( playProps.scenarios)
  console.log("currtent_scenario: ", current_scenario)
  
  return (
    <p>TEST</p>
  )
}
export function HomeReal(playProps: HomeProps) {
  console.log("playProps: ", playProps)
  const {current_scenario, isLoading, isError, vote_callback} = useVote( playProps.scenarios)


  if (isError) return playProps.network_msgs['error']
  if (isLoading) return playProps.network_msgs['loading']

  console.log("currtent_scenario: ", current_scenario)
  

  return (
      <Scenario
        scenario={current_scenario}
        vote_callback={vote_callback}
      />
  )
}


import { getPlay } from '@/lib/file'

export const getStaticProps = async () => {
  const playProps = await getPlay()
  return {
    props: playProps  
  }
}
