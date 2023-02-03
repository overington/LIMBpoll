import { useSessionState } from '@/components/states'

import useSWR from 'swr'

import VotingCard from '@/components/VotingCard'
import { fetcher } from '@/lib/network'
import { CurrentResponse } from '@/types/Voting'

import { ScenarioEnum } from '@/types/VotingTypes'
export default function Home({scenarios}) {
  const {question, q_error, q_isloading} = useSWR<CurrentResponse>('/api/current', fetcher)


  if (q_error) return "Failed to load question..."
  if (q_isloading) return "Loading..."

  // let question = props.scenarios[current].question
  // let description = props.scenarios[current].description

  // let options = [];
  // props.scenarios[current].options.map((el) => {
  //   options.push({
  //     text : el,
  //     vote_callback : vote
  //   }) 
  // });
  console.log("question: " , question.text)

  return (
      <VotingCard
        question={question.text}
        description={question.description}
        options={question.options}
      />
  )
}


import { getScenarios } from '@/lib/file'

export async function getStaticProps(context) {
  const scenarios = await getScenarios()
  return { props: { scenarios } }
}
