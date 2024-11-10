import data from "@/data/questions.json";

export type Question = {
  title: string;
  question: string;
  options: string[];
};
// import questions and create a typed object from the JSON data
export const questions: {[key: string]: Question} = data;