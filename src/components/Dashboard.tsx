"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

import Card, { CardTitle, CardSubtitle, QuestionCard, MessageCard } from "@/components/Card";
import { questions, type Question } from "@/data/questions";
import { useCurrentQuestion } from "@/components/Questions";

export function Button({
  children,
  onClick,
  bgClass,
  textClass,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  bgClass?: string;
  textClass?: string;
}) {
  const classes = clsx(
    "font-bold py-2 px-4 rounded inline-flex items-center",
    bgClass ? bgClass : "bg-orange-600",
    textClass ? textClass : "text-slate-50"
  );

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function AdminDashboard({ token }: { token: string }) {
  const {
    currentQuestionID,
    currentVoteCounts,
    setCurrentQuestion,
    resetVoteCount,
  } = useCurrentQuestion(token);
  return (
    <form>
      <fieldset>
        <div className={clsx("grid grid-cols-1 gap-4")}>
          <Card>
            <CardTitle>Questions</CardTitle>
            <CardSubtitle>
              Select Which Question to show (
              <span>Chosen ID: {currentQuestionID}</span>)
            </CardSubtitle>
          </Card>
          {Object.keys(questions).map((questionID) => {
            const el_id = `admin-select-${questionID}`;
            const isCurrent = currentQuestionID === questionID;
            return (
              <label key={questionID} htmlFor={el_id}>
                <Card bgColour={isCurrent ? "bg-emerald-700" : ""}>
                  <input
                    type="radio"
                    name="current-question"
                    id={el_id}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCurrentQuestion(e.target.value)
                    }
                    value={questionID}
                    checked={isCurrent}
                    className="hidden"
                  />
                  <Button
                    // TODO: HERE

                    // onClick={() => resetVoteCount(questionID)}
                    onClick={(e) => {
                      e.preventDefault();
                      resetVoteCount(questionID);
                    }}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-2 fill-slate-100"
                    >
                      <path d="M6 7L7 6L4.70711 3.70711L5.19868 3.21553C5.97697 2.43724 7.03256 2 8.13323 2C11.361 2 14 4.68015 14 7.93274C14 11.2589 11.3013 14 8 14C6.46292 14 4.92913 13.4144 3.75736 12.2426L2.34315 13.6569C3.90505 15.2188 5.95417 16 8 16C12.4307 16 16 12.3385 16 7.93274C16 3.60052 12.4903 0 8.13323 0C6.50213 0 4.93783 0.647954 3.78447 1.80132L3.29289 2.29289L1 0L0 1V7H6Z" />
                    </svg>
                    Reset
                  </Button>
                  <CardTitle>{questions[questionID].title}</CardTitle>
                  <CardSubtitle>{questions[questionID].question}</CardSubtitle>
                  <p>Options:</p>
                  <ul className="list-disc p-4">
                    {questions[questionID].options.map((option, index) => (
                      <li key={index} className="p-1">
                        <div className="grid grid-cols-12">
                          {isCurrent && currentVoteCounts ? (
                            <div className="col-span-1">
                              ({currentVoteCounts[index]})
                            </div>
                          ) : (
                            ""
                          )}
                          <div
                            className={clsx(
                              isCurrent ? "col-span-11" : "col-span-12"
                            )}
                          >
                            {option}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </label>
            );
          })}
        </div>
      </fieldset>
    </form>
  );
}

export function UserDashboard({ token }: { token: string }) {
  /**
   * This is the main component for the user dashboard.
   * It will display the current question or message.
   * It will also handle the voting for the current question.
   */

  const { currentQuestionID, voteHandler, isLoading, isError } =
    useCurrentQuestion(token);

  const [localQuestion, setLocalQuestion] = useState<Question | null>(null);

  useEffect(() => {
    if (currentQuestionID === null) return;
    setLocalQuestion(questions[currentQuestionID]);
  }, [currentQuestionID]);




  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (typeof currentQuestionID === "undefined")
    return <div>Question not found</div>;
  if (localQuestion === null) return <Card>No questions available</Card>;
  else {
    console.log(localQuestion.title);
    if (localQuestion.type === "message")
      return <MessageCard currentMessage={localQuestion} />;
    if (localQuestion.type === "multiple_choice_question")
      return (
        <QuestionCard
          // currentQuestionID={currentQuestionID}
          currentQuestion={localQuestion}
          setLocalQuestion={setLocalQuestion}
          voteHandler={voteHandler}
        />
      );
  }
}
