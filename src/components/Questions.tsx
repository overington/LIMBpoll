"use client";

import useSWR from "swr";
import { useEffect, useState } from "react";
import { cards, initial_card_id, type Question, type Message } from "@/data/questions";
import { type voteCountsType } from "@/data/state";
import { API_URL } from "@/data/config";

// fetcher function to get the current question
async function fetcher_GET_current_question(url: string, token: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
async function fetch_POST_current_question(url: string, token: string) {
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
export async function fetch_PATCH_current_question(url: string, token: string) {
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

type ServerVoteDataType = { globalCardID: string; voteCounts: voteCountsType; connectionCount?: number };

export function useCard(token: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<ServerVoteDataType>(API_URL, (url: string) => fetcher_GET_current_question(url, token), {
    revalidateOnFocus: true,
    refreshInterval: 5000,
  });
  const { globalCardID } = data || { globalCardID: initial_card_id, voteCounts: null, connectionCount: 0 };
  const setGlobalCardID = async (card_id: string) => {
    try {
      console.log("Changing card to:", card_id);
      const response = await fetcher_PUT_current_question(
        `${API_URL}/?card_id=${card_id}`,
        token
      );
      console.log("Card changed successfully:", response);
      mutate();
    } catch (error) {
      console.error("Failed to change card:", error);
    }
  };
  const voteHandler = async (card_id: string, vote_idx: string) => {
    try {
      const response = await fetch_POST_current_question(
        `${API_URL}/?question_id=${card_id}&vote_idx=${vote_idx}`,
        token
      );
      console.log("Vote submitted successfully:", response);
      mutate();
    } catch (error) {
      console.error("Failed to submit vote:", error);
    }
  };

  const resetVoteCount = async (card_id: string) => {
    try {
      const response = await fetch_PATCH_current_question(
        `${API_URL}/?card_id=${card_id}`,
        token
      );
      console.log("Vote count reset successfully:", response);
      mutate();
    } catch (error) {
      console.error("Failed to reset vote count:", error);
    }
  };
  // const {setLocalCardID, localCard, setLocalCard} = useLocalCard(globalCardID);

  const [localCardID, setLocalCardID] = useState<string | null>(initial_card_id || null);
  const [localCard, setLocalCard] = useState<Question | Message >(cards[initial_card_id]);
  useEffect(() => { // Set local card from global card ID change
    console.log("updating local card from global card ID change:", globalCardID);
    setLocalCardID(globalCardID);
  }, [globalCardID]);
  useEffect(() => { // Set local card from local card ID change
    console.log("updating local card from local card ID change:", localCardID);
    if (localCardID === null) {
      setLocalCard(cards[initial_card_id]);
    } else {
      setLocalCard(cards[localCardID]);
    }
  }, [localCardID]);

  return {
    voteCounts: data?.voteCounts || null,
    connectionCount: data?.connectionCount || null,
    isLoading: isLoading,
    isValidating: isValidating,
    isError: error,
    setGlobalCardID: setGlobalCardID,
    localCard: localCard,
    setLocalCard: setLocalCard, // Don't use this directly, use setLocalCardID instead
    setLocalCardID: setLocalCardID,
    resetVoteCount: resetVoteCount,
    voteHandler: voteHandler,
  };
}
