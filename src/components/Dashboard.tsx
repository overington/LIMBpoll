"use client";
import clsx from "clsx";

import Card, { CardTitle, CardSubtitle, QuestionCard } from "@/components/Card";
import { questions } from "@/data/questions";
import { useCurrentQuestion} from "@/components/Questions";

export function Admin({token}: {token: string}) {
  // show each question in a card, set the current question to be highlighted
  //
  const { currentQuestionID, currentVoteCounts, setCurrentQuestion } = useCurrentQuestion(token);
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
              <Card
                key={questionID}
                className={clsx({ "bg-emerald-700": isCurrent })}
              >
                <input type="radio" name="current-question" id={el_id} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setCurrentQuestion(e.target.value)} value={questionID} checked={isCurrent} />
                <label htmlFor={el_id}>
                  <CardTitle>{questions[questionID].title}</CardTitle>
                  <CardSubtitle>{questions[questionID].question}</CardSubtitle>
                  <p>Options:</p>
                  <ul className="list-disc p-4">
                    {questions[questionID].options.map((option, index) => (
                      <li key={index} className="p-1">
                        <div className="grid grid-cols-12">
                            {isCurrent && currentVoteCounts ? <div className='col-span-1'>({currentVoteCounts[index]})</div> : ""}
                          <div className={clsx(isCurrent ? 'col-span-11' : 'col-span-12')}>{option}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </label>
              </Card>
            );
          })}
        </div>
      </fieldset>
    </form>
  );
}

export function User({token}: {token: string}) {
  const { currentQuestionID, voteHandler, isLoading, isError } = useCurrentQuestion(token);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (typeof currentQuestionID === "undefined") return <div>Question not found</div>;

  return (
    <QuestionCard
      currentQuestionID={currentQuestionID}
      voteHandler={voteHandler}
    />
  );
}