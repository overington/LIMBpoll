import data from "@/data/questions.json";

export type Question = {
  id: string;
  type: string;
  title: string;
  question: string;
  options: string[];
  post_submit_message?: string | null;
};
export type Message = {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  text_content?: string;
};

export type Questions = { [key: string]: Question };
export type Messages = { [key: string]: Message };
// all items in the data['cards'] object are have the type attribute set to 'multiple_choice_question'

const raw_questions = data["cards"].filter(
  (q) => q.type === "multiple_choice_question"
);
const raw_messages = data["cards"].filter((q) => q.type === "message");

export const questions: Questions = Object.fromEntries(
  raw_questions.map((q) => [q.id, q as Question])
);
export const messages: Messages = Object.fromEntries(
  raw_messages.map((m) => [m.id, m as Message])
);

// An array of question IDs and message IDs in the order they should be played
export const play_order: string[] = [
  ...Object.keys(messages),
  ...Object.keys(questions)
];