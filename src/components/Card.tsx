import clsx from "clsx";
import {
  type Question,
  type Message,
  postvoted_card_id,
} from "@/data/questions";
import { useState } from "react";

export default function Card(props: {
  children?: React.ReactNode;
  className?: string;
  bgColour?: string;
  textColour?: string;
}) {
  const { children } = props;
  const classes = clsx(
    props.bgColour ? props.bgColour : "bg-slate-800",
    // "text-slate-300",
    props.textColour ? props.textColour : "text-slate-300",
    "items-center p-4 rounded-lg shadow-lg w-full max-w-md",
    props.className ? props.className : ""
  );
  return <div className={classes}>{children ? children : null}</div>;
}

// display of the Card component
export function SectionCard(props: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <Card>
      <CardTitle>{props.title}</CardTitle>
      <CardSubtitle>{props.description}</CardSubtitle>
      {props.children ? props.children : null}
    </Card>
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-4xl font-bold text-slate-50">{children}</h1>;
}
export function CardSubtitle({ children }: { children: React.ReactNode }) {
  return <p className="text-2xl font-semibold text-slate-200">{children}</p>;
}
export function CardTitleChev({
  children,
}: {
  children?: React.ReactNode | null;
}) {
  return (
    <div className="my-2 text-xl py-4">
      <span className="font-bold text-xl my-4 text-orange-500">
        &gt;&gt;&gt;
      </span>{" "}
      {children ? children : null}
    </div>
  );
}

export function MessageCard({ message }: { message: Message }) {
  if (!message) {
    return (
      <Card className="font-mono">
        <CardTitleChev> No message is currently selected </CardTitleChev>
      </Card>
    );
  }
  return (
    <Card className="font-mono">
      {(message.id === "Afsaneh_s_Error") ?  <svg className="animate-spin h-5 w-5 mr-3 stroke-red-500" viewBox="0 0 24 24" ></svg> : null }
      <CardTitleChev> {message.title}</CardTitleChev>
      <p className="mx-2">{message.subtitle}</p>
    </Card>
  );
}

export function QuestionCard({
  currentQuestion,
  setLocalCardID,
  voteHandler,
}: {
  currentQuestion: Question;
  setLocalCardID: (card_id: string) => void;
  voteHandler: (question_id: string, vote_id: string) => void;
}) {
  /**
   * Warning: Assignments to the 'question' variable from inside React Hook
   * useEffect will be lost after each render. To preserve the value over time,
   * store it in a useRef Hook and keep the mutable value in the '.current'
   * property. Otherwise, you can move this variable directly inside useEffect.
   * react-hooks/exhaustive-deps
   **/
  const [chosen_vote_id, set_chosen_vote_id] = useState<null | string>(null);

  if (!currentQuestion) {
    return (
      <Card className="font-mono">
        <CardTitleChev>No question is currently selected</CardTitleChev>
      </Card>
    );
  }

  return (
    <Card className="font-mono">
      <CardTitleChev>{currentQuestion.title}</CardTitleChev>
      <p className="mx-2 my-4">{currentQuestion.question}</p>
      <p className="mx-2 my-4 text-slate-200 "></p>
      <form>
        <fieldset>
          <ul className="px-4 my-4">
            {currentQuestion.options?.map((option_text, index) => {
              const option_id = `option-${index}`;
              return (
                <li className="my-2" key={index}>
                  <label className="w-full" htmlFor={option_id}>
                    <input
                      type="radio"
                      name="current-answer"
                      id={option_id}
                      value={index}
                      className="mr-2"
                      onChange={() => set_chosen_vote_id(index.toString())}
                    />{" "}
                    {option_text}
                  </label>
                </li>
              );
            })}
          </ul>
          <button
            className={clsx({
              // if chosenVote is null then bg-green else bg-slate
              "bg-slate-500 hover:bg-slate-500 text-gray-300":
                chosen_vote_id === null,
              "bg-green-600 hover:bg-green-700 text-wite":
                chosen_vote_id !== null,
              "font-bold py-2 px-4 rounded": true,
            })}
            onClick={(e) => {
              e.preventDefault();
              if (chosen_vote_id !== null) {
                voteHandler(
                  currentQuestion.id,
                  chosen_vote_id // vote_id
                );
                // After vote submitted, set the card to voted card, or the next card
                if (currentQuestion.id === "Afsaneh_s_Dilemma") {
                  setLocalCardID("Afsaneh_s_Error");
                } else {
                  console.log("Setting local card to:", postvoted_card_id);
                  setLocalCardID(postvoted_card_id);
                }
                set_chosen_vote_id(chosen_vote_id);
              }
            }}
          >
            {chosen_vote_id === null ? "Vote Now" : "Submit Vote"}
          </button>
        </fieldset>
      </form>
    </Card>
  );
}
