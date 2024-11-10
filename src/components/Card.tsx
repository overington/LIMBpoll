import clsx from "clsx";
import { API_URL } from "@/data/config";
import { questions, type Question } from "@/data/questions";
import { useEffect } from "react";

export default function Card(props: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { className, children } = props;
  const classes = clsx(
    "items-center p-4 rounded-lg bg-slate-800 text-slate-300 shadow-lg w-full max-w-md",
    className
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

export function QuestionCard({
  currentQuestionID,
  token,
  voteHandler,
}: {
  currentQuestionID: string;
  token: string;
  voteHandler: (question_id: string, vote_id: string) => void;
}) {
  let question: Question = questions[currentQuestionID];
  useEffect(() => {
    question = questions[currentQuestionID];
  }, [currentQuestionID]);

  if (!question) {
    return (
      <Card className="font-mono" >
        &gt;&gt;&gt; <span className="font-bold text-red-500">Question:</span>{" "}
        <span>None</span>
        <p className="mx-2">No question is currently selected</p>
      </Card>
    );
  }

  return (
    <Card className="font-mono">
      &gt;&gt;&gt; <span className="font-bold text-red-500">Question:</span>{" "}
      <span>{question.title}</span>
      <p className="mx-2">{question.question}</p>
      <p className="mx-2 text-slate-200 ">
        (Click to submit your answer below)
      </p>
      <ul className="px-4 my-2">
        {question.options?.map((option_text, index) => (
          <li key={index}>
            -{" "}
            <button
              className="underline"
              onClick={() =>
                voteHandler(
                  currentQuestionID.toString(), // question_id
                  index.toString() // vote_id
                )
              }
            >
              {option_text}
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
