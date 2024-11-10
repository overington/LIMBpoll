"use client";

import { EmptyCard } from "@/components/Card";
import useSWR from "swr";
import { questions, Question } from "@/data/questions";
import { useState, useEffect } from "react";

const API_URL = "/vote";



export const QuestionCard = ({ question, question_id, vote_count }: { question: Question, question_id: string, vote_count: number[]|null }) => {
  const handleVote = async (question_id: string, vote_id: string) => {
    try {
      const submit_url = `${API_URL}/${question_id}/${vote_id}`;
      console.log("Submitting vote to:", submit_url);
      const response = await fetch(submit_url, {
        method: "POST",
      });

      if (!response.ok) {
        console.log("Response:", response);
        throw new Error("Network response was not ok");
      }

      const response_json = await response.json();
      console.log("Vote submitted successfully:", response_json);
    } catch (error) {
      console.error("Failed to submit vote:", error);
    }
  };

  return (
    <EmptyCard>
      <div className="font-mono">
        &gt;&gt;&gt; <span className="font-bold text-red-500">Question:</span>{" "}<span>{question.title}</span>
        <p className="mx-2">{question.question}</p>
        <p className="mx-2 text-slate-200 ">(Click to submit your answer below)</p>
        <ul className="px-4 my-2">
          {question.options?.map((option_text, index) => (
            <li key={index}>
              - <button
                className="underline"
                onClick={() => handleVote(question_id, index.toString())}
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

export function useQuestion() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(API_URL, fetcher);
  

  return {
    currentQuestionID: data?.currentQuestionID,
    voteCount: data?.currentVoteCounts,
    isLoading: !error && !data,
    isError: error,
  };
}

export const CurrentQuestion = () => {
  const { currentQuestionID, isLoading, isError } = useQuestion();
  const [ currentQuestion, setCurrentQuestion ] = useState<Question|undefined>(undefined);

  useEffect(() => {
    if (currentQuestionID !== undefined) {
      setCurrentQuestion(questions[currentQuestionID]);
    } else {
      setCurrentQuestion(questions['q1']);
    }
  }, [currentQuestionID]);


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (currentQuestion === undefined) return <div>Question not found</div>;


  return <QuestionCard question={currentQuestion} question_id={currentQuestionID} vote_count={null} />;
};

export const Votes = () => {
  return (
    <div>
      {Object.keys(questions).map((question_id) => (
        <QuestionCard key={question_id} question={questions[question_id]} question_id={question_id} />
      ))}
    </div>
  );
}