import useSWR from 'swr'
import { fetcher } from '@/lib/network'

export function useVote(scenarios: ScenariosType) {
  const { current_question_id, error, mutate } = useSWR(
    "/api/current",
    fetcher
  )
  console.log("current_question_id: ", current_question_id)

  return {
    current_scenario: scenarios[current_question_id],
    isLoading: !error && !current_question_id,
    isError: error,
    vote_callback: (vote: number) => {
      mutate({current_question_id: vote})
    }
  }

}
