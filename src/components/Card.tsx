import clsx from "clsx";
import { cards, type Question,  type Message} from "@/data/questions";
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
export function CardTitleChev({ children }: { children?: React.ReactNode | null }) {
  return (
  <div className="my-2 text-xl py-4">
    <span className="font-bold text-xl my-4 text-orange-500">&gt;&gt;&gt;</span>{" "}
    {children? children : null}
  </div>
  )
}

export function MessageCard({ message }: { message: Message }) {

  if (!message) {
    return (
      <Card className="font-mono">
        &gt;&gt;&gt; <span className="font-bold text-red-500">Message:</span>{" "}
        <span>None</span>
        <p className="mx-2">No message is currently selected</p>
      </Card>
    );
  } else if (message.id === "Afsaneh_s_Error") {
    return (
      <Card className="font-mono">
          HELLO
            <svg
            className="animate-spin h-5 w-5 mr-3 stroke-red-500"
            viewBox="0 0 24 24"
            ></svg>
        &gt;&gt;&gt; <span className="font-bold text-red-500">Message:</span>{" "}
        <span>{message.title}</span>
        <p className="mx-2">{message.subtitle}</p>
      </Card>
    );
  }

  return (
    <Card className="font-mono">
      &gt;&gt;&gt; <span className="font-bold text-red-500">Message:</span>{" "}
      <span>{message.title}</span>
      <p className="mx-2">{message.question}</p>
    </Card>
  );
}
export function QuestionCard({
  currentQuestion,
  setLocalQuestion,
  // currentQuestionID,
  voteHandler,
}: {
  currentQuestion: Question;
  setLocalQuestion: (question: Question) => void;
  voteHandler: (question_id: string, vote_id: string) => void;
}) {
  /**
   * Warning: Assignments to the 'question' variable from inside React Hook
   * useEffect will be lost after each render. To preserve the value over time,
   * store it in a useRef Hook and keep the mutable value in the '.current'
   * property. Otherwise, you can move this variable directly inside useEffect.
   * react-hooks/exhaustive-deps
   **/
  const [chosenVote, setChosenVote] = useState<null | string>(null);

  if (!currentQuestion) {
    return (
      <Card className="font-mono">
        &gt;&gt;&gt; <span className="font-bold text-red-500">Question:</span>{" "}
        <span>None</span>
        <p className="mx-2">No question is currently selected</p>
      </Card>
    );
  }

  return (
    <Card className="font-mono">
      <div className="my-2">
        &gt;&gt;&gt; <span className="font-bold text-red-500">Question - </span>{" "}
        <span>{currentQuestion.title}</span>
      </div>
      <p className="mx-2">{currentQuestion.question}</p>
      <p className="mx-2 text-slate-200 "></p>
      <form>
        <fieldset>
          <ul className="px-4 my-4">
            {currentQuestion.options?.map((option_text, index) => {
              const option_id = `option-${index}`;
              return (
                <li key={index}>
                  <label className="w-full" htmlFor={option_id}>
                    <input
                      type="radio"
                      name="current-answer"
                      id={option_id}
                      value={index}
                      className="mr-2"
                      onChange={() => setChosenVote(index.toString())}
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
                chosenVote === null,
              "bg-green-600 hover:bg-green-700 text-wite": chosenVote !== null,
              "font-bold py-2 px-4 rounded": true,
            })}
            onClick={(e) => {
              e.preventDefault();
              if (chosenVote !== null) {
                voteHandler(
                  currentQuestion.id,
                  // currentQuestionID.toString(), // question_id
                  chosenVote // vote_id
                );
                // loading screen
                if (currentQuestion.id === "Afsaneh_s_Dilemma") {
                  setLocalQuestion(cards["Afsaneh_s_Error"]);
                } else {
                  setLocalQuestion(cards["Waiting_Message"]);
                }
                setChosenVote(null);
              }
            }}
          >
            {chosenVote === null ? "Make a selction..." : "Submit Vote"}
          </button>
        </fieldset>
      </form>
    </Card>
  );
}
