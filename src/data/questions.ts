import data from "@/data/questions.json";

export type Question = {
  id: string;
  type: string;
  title: string;
  question: string;
  options: string[];
};
export type Questions = {[key: string]: Question};
export const questions: Questions = data["questions"];
// vote count state



export type Message = {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  text_content?: string;
};
export type Messages = {[key: string]: Message};
export const messages: Messages = data["messages"];

export const play_order: string[] = data["play_order"];

// make sure the play_order is valid. Each item in play order should be a key in
// questions or messages object
play_order.forEach((key) => {
  if (!questions[key] && !messages[key]) {
    throw new Error(`Invalid key in play_order: ${key}`);
  }
});
