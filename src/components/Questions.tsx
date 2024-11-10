"use client";

import useSWR from "swr";
import { API_URL } from "@/data/config";




// fetcher function to get the current question
async function fetcher_GET_current_question(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
async function fetcher_PUT_current_question(url: string, token: string) {
  const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export function useCurrentQuestion(token: string) {
  
  const { data, error, isLoading, isValidating, mutate } = useSWR<{ currentQuestionID: string; currentVoteCounts: number[] }>(
    API_URL,
    (url) => fetcher_GET_current_question(url),
    {
      revalidateOnFocus: true,
    }
  );
  const setCurrentQuestion = async (question_id: string) => {
    try {
      console.log("Changing question to:", question_id);
      // const response = await fetch(`${API_URL}/?set_current=${question_id}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      const response = await fetcher_PUT_current_question(`${API_URL}/?set_current=${question_id}`, token);

      if (!response.ok) {
        console.log("Response:", response);
        throw new Error("Network response was not ok");
      }

      const response_json = await response.json();
      console.log("Question changed successfully:", response_json);
      mutate();
    } catch (error) {
      console.error("Failed to change question:", error);
    }
  };
  const voteHandler = async (question_id: string, vote_idx: string) => {
    try {
      const submit_url = `${API_URL}/?question_id=${question_id}&vote_idx=${vote_idx}`;
      console.log("Submitting vote to:", submit_url);
      const response = await fetch(submit_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log("Response:", response);
        throw new Error("Network response was not ok");
      }

      const response_json = await response.json();
      console.log("Vote submitted successfully:", response_json);
      mutate();
    } catch (error) {
      console.error("Failed to submit vote:", error);
    }
  }

  return {
    currentQuestionID: data?.currentQuestionID,
    currentVoteCounts: data?.currentVoteCounts,
    // isLoading: !error && !data,
    isLoading: isLoading,
    isValidating: isValidating,
    isError: error,
    setCurrentQuestion,
    voteHandler: voteHandler,
  };
}
