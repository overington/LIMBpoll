"use client";

import useSWR from "swr";
import { type voteCountsType } from "@/data/state";
import { API_URL } from "@/data/config";


// fetcher function to get the current question
async function fetcher_GET_current_question(url: string, token: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  );
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


export function useCard(token: string) {
  
  const { data, error, isLoading, isValidating, mutate } = useSWR<{ currentCardID: string, voteCounts: voteCountsType }>(
    API_URL,
    (url) => fetcher_GET_current_question(url, token),
    {
      revalidateOnFocus: true,
      refreshInterval: 5000,
    }
  );
  const setCard = async (card_id: string) => {
    try {
      console.log("Changing card to:", card_id);
      const response = await fetcher_PUT_current_question(`${API_URL}/?card_id=${card_id}`, token);
      console.log("Card changed successfully:", response);
      mutate();
    } catch (error) {
      console.error("Failed to change card:", error);
    }
  };
  const voteHandler = async (card_id: string, vote_idx: string) => {
    try {
      const response = await fetch_POST_current_question(`${API_URL}/?question_id=${card_id}&vote_idx=${vote_idx}`, token);
      console.log("Vote submitted successfully:", response);
      mutate();
    } catch (error) {
      console.error("Failed to submit vote:", error);
    }
  }

  const resetVoteCount = async (card_id: string) => {
    try {
      const response = await fetch_PATCH_current_question(`${API_URL}/?card_id=${card_id}`, token);
      console.log("Vote count reset successfully:", response);
      mutate();
    } catch (error) {
      console.error("Failed to reset vote count:", error);
    }
  }

  return {
    currentCardID: data?.currentCardID || null,
    voteCounts: data?.voteCounts || null,
    // isLoading: !error && !data,
    isLoading: isLoading,
    isValidating: isValidating,
    isError: error,
    setCard: setCard,
    resetVoteCount: resetVoteCount,
    voteHandler: voteHandler,
  };
}
