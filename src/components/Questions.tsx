"use client";

import { EmptyCard } from "@/components/Card";
import useSWR from "swr";

export type Question = {
  id: number;
  title: string;
  question: string;
  options: string[];
};

export const questions: Question[] = [
  {
    id: 1,
    title: "Cassie's Spotify",
    question: "Alright, alright, DJ CASSIE CAS with the aux cord, trying to get something popping with 3 banging tracks. What we listening to, fam? Say your piece, now.",
    options: [
        "Tune!!!", "Oh, I'm feeling this.", "Aye!!!!  This and no other."
    ],
  },
  {
    id: 2,
    title: "Doms's Decision",
    question: "What to do, what to do…Your boy, Dom, has got a dilemma on his hands – sit with T-Money Tarquin and Hugo, or continue gaming with his A one from day one, Jayda.",
    options: [
        "Are you kidding me, it's gotta be with his bestie, Jayda.",
        "Nah, for real for real, T-Money's got bars, so of course we're sitting with him and Hugo."
    ],
  },
];

export const QuestionCard = ({current}: {current: Question}) => {
    //  title={current.question} description="Select your answer"
  return (
    <EmptyCard>
      <pre>
      <ul>
        {current.options?.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
      </pre>
    </EmptyCard>
  );
};

// make a GET request to the /api/vote endpoint
// const fetcher = (url) => { const res = fetch(url); return res.json(); };
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useQuestion() {
  const { data, error, mutate } = useSWR("/vote", fetcher);
  const currentQuestion = questions.find(
    (question: Question) => question.id === data?.currentQuestionID
  );
  const voteCount = data?.currentVoteCounts;

  return {
    currentQuestion: currentQuestion,
    voteCount: voteCount,
    isLoading: !error && !data,
    isError: error,
  };
}

export const CurrentQuestion = () => {
  const { currentQuestion, voteCount, isLoading, isError } = useQuestion();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return ( <QuestionCard current={currentQuestion} />);
};
