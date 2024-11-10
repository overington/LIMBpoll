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
    question:
      "Alright, alright, DJ CASSIE CAS with the aux cord, trying to get something popping with 3 banging tracks. What we listening to, fam? Say your piece, now.",
    options: [
      "Tune!!!",
      "Oh, I'm feeling this.",
      "Aye!!!!  This and no other.",
    ],
  },
  {
    id: 2,
    title: "Doms's Decision",
    question:
      "What to do, what to do…Your boy, Dom, has got a dilemma on his hands – sit with T-Money Tarquin and Hugo, or continue gaming with his A one from day one, Jayda.",
    options: [
      "Are you kidding me, it's gotta be with his bestie, Jayda.",
      "Nah, for real for real, T-Money's got bars, so of course we're sitting with him and Hugo.",
    ],
  },
];

export const QuestionCard = ({ current }: { current: Question }) => {
  const handleVote = async (question_id: string, vote_id: string) => {
    try {
      console.log(JSON.stringify({ questionId: question_id, vote: vote_id }))
      const response = await fetch("/vote", {
        method: "POST",
        body: JSON.stringify({ questionId: question_id, vote: vote_id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log(response)
        throw new Error("Network response was not ok");
      }
      let response_json = await response.json();
      // Optionally handle the response
      console.log("Vote submitted successfully");
    } catch (error) {
      console.error("Failed to submit vote:", error);
    }
  };

  return (
    <EmptyCard>
      <div className="font-mono">
        &gt;&gt;&gt; <span className="font-bold">Question:</span>{" "}
        {current.question}
        <ul className="px-4 my-2">
          {current.options?.map((option_text, index) => (
            <li key={index}>
              - <button
                className="underline"
                onClick={() => handleVote(current.id.toString(), index.toString())}
              >
                {option_text}
              </button>
            </li>
          ))}
        </ul>
      </div>
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

  return <QuestionCard current={currentQuestion} />;
};
