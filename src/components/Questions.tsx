"use client";

import useSWR from "swr";
import { API_URL } from "@/data/config";
// import { resetVoteCount } from "./Dashboard";


// fetcher function to get the current question
async function fetcher_GET_current_question(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// fetcher function to set the current question
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
async function fetch_POST_current_question(url:string, token: string) {
  const response = await fetch(url, {
    method: "POST",
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
export async function fetch_PATCH_current_question(url:string, token: string) {
  const response = await fetch(url, {
    method: "PATCH",
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
      refreshInterval: 5000,
    }
  );
  const setCurrentQuestion = async (question_id: string) => {
    try {
      console.log("Changing question to:", question_id);
      const response = await fetcher_PUT_current_question(`${API_URL}/?set_current=${question_id}`, token);
      console.log("Question changed successfully:", response);
      mutate();
    } catch (error) {
      console.error("Failed to change question:", error);
    }
  };
  const voteHandler = async (question_id: string, vote_idx: string) => {
    try {
      const response = await fetch_POST_current_question(`${API_URL}/?question_id=${question_id}&vote_idx=${vote_idx}`, token);
      console.log("Vote submitted successfully:", response);
      mutate();
    } catch (error) {
      console.error("Failed to submit vote:", error);
    }
  }

  const resetVoteCount = async (question_id: string) => {
    try {
      const response = await fetch_PATCH_current_question(`${API_URL}/?reset_vote=${question_id}`, token);
      console.log("Vote count reset successfully:", response);
      mutate();
    } catch (error) {
      console.error("Failed to reset vote count:", error);
    }
  }

  return {
    currentQuestionID: data?.currentQuestionID || null,
    currentVoteCounts: data?.currentVoteCounts,
    // isLoading: !error && !data,
    isLoading: isLoading,
    isValidating: isValidating,
    isError: error,
    setCurrentQuestion,
    resetVoteCount: resetVoteCount,
    voteHandler: voteHandler,
  };
}
