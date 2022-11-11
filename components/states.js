import useSWR from 'swr'

export function useSessionState() {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { current, error } = useSWR(
    "/api/current",
    fetcher
  )
  return {
    current: current,
    isLoading: !error && !current,
    isError: error
  }
}
