import clsx from "clsx";
import Image from "next/image";
import {
  type Question,
  type Message,
  postvoted_card_id,
} from "@/data/questions";
import { useState } from "react";
import image_judy from "@/data/hurry-up-judge-judy.gif";

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
export function LoadingButton() {
  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm transition ease-in-out duration-150 cursor-not-allowed">
        <svg
          className="animate-spin -ml-1 mr-3 h-12 w-12 text-white "
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
export function MessageCard({
  message,
}: {
  message: Message;
}) {
  if (!message) {
    return (
      <Card className="font-mono">
        <CardTitleChev> No message is currently selected </CardTitleChev>
      </Card>
    );
  } else if (message.id === "Afsaneh_s_Error") {
    // count to 5 then set back to Afsaneh_s_Dilemma
    return (
      <Card className="font-mono">
          <LoadingButton />
        <CardTitleChev> {message.title}</CardTitleChev>
        <p className="mx-2">{message.subtitle}</p>
      </Card>
    );
  } else if (message.id === "Afsaneh_s_Error2") {
    // count to 5 then set back to Afsaneh_s_Dilemma
    return (
      <Card className="font-mono">
          <Image
            src={image_judy}
            width={500}
            height={500}
            alt="Hurry up Judge Judy"
          />
        <CardTitleChev> {message.title}</CardTitleChev>
        <p className="mx-2">{message.subtitle}</p>
      </Card>
    );
  }
  return (
    <Card className="font-mono">
      <CardTitleChev> {message.title}</CardTitleChev>
      <p className="mx-2">{message.subtitle}</p>
    </Card>
  );
}
function button_style(chosen_vote_id: string | null) {
  return {
    // if chosenVote is null then bg-green else bg-slate
    "bg-slate-500 hover:bg-slate-500 text-gray-300": chosen_vote_id === null,
    "bg-green-600 hover:bg-green-700 text-wite": chosen_vote_id !== null,
    "font-bold py-2 px-4 rounded": true,
  };
}
export function QuestionCard({
  currentQuestion,
  setLocalCardID,
  voteHandler,
  error_count
}: {
  currentQuestion: Question;
  setLocalCardID: (card_id: string) => void;
  voteHandler: (question_id: string, vote_id: string) => void;
  error_count: number;
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
      { 
        (currentQuestion.id.startsWith("Afsaneh_s_Dilemma") && (error_count >= 1)) ? (
        <CardTitle><span className="text-red-500">Error, try again</span></CardTitle>
      ) : null
    }
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
            className={clsx(button_style(chosen_vote_id))}
            onClick={(e) => {
              e.preventDefault();
              if (chosen_vote_id !== null) {
                voteHandler(
                  currentQuestion.id,
                  chosen_vote_id // vote_id
                );
                // After vote submitted, set the card to voted card, or the next card
                if (currentQuestion.id === "Afsaneh_s_Dilemma") {
                  if (error_count > 1) {
                    setLocalCardID("Afsaneh_s_Error2");
                  } else {
                    setLocalCardID("Afsaneh_s_Error");
                  }
                } else {
                  setLocalCardID(postvoted_card_id);
                }
                set_chosen_vote_id(chosen_vote_id);
              }
            }}
          >
            {chosen_vote_id === null
              ? "Please select an option..."
              : "Submit Vote"}
          </button>
        </fieldset>
      </form>
    </Card>
  );
}
