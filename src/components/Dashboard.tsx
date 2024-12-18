"use client";

import { useState } from "react";
import clsx from "clsx";
import Card, {
  CardTitle,
  CardSubtitle,
  QuestionCard,
  MessageCard,
} from "@/components/Card";
import { cards, type Question, type Message } from "@/data/questions";
import { useCard } from "@/components/Questions";

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

export function LayoutQuestionVotes({
  title,
  subtitle,
  options,
  votes,
}: {
  title: string;
  subtitle: string;
  options?: string[];
  votes?: number[] | null;
}) {
  return (
    <div>
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{subtitle}</CardSubtitle>
      {options && (
        <ul>
          {options.map((option, index) => (
            <li
              key={index}
              className={clsx(
                "grid grid-cols-12 border-orange-500 border-dashed border-t"
              )}
            >
              <div className="col-span-1 border-r border-orange-500">
                {votes && votes[index]}
              </div>
              <div className="col-span-11">{option}</div>
            </li>
          ))}
          <li className="grid grid-cols-12 font-bold border-orange-500 border-t-2">
            <div className="col-span-1 ">
              {votes && votes.reduce((a, b) => a + b, 0)}
            </div>
            <div className="col-span-11">Total</div>
          </li>
        </ul>
      )}
    </div>
  );
}
export function AdminDashboard({ token }: { token: string }) {
  const {
    localCard,
    voteCounts,
    connectionCount,
    setGlobalCardID,
    resetVoteCount,
    isLoading,
  } = useCard(token);

  if (isLoading) return <div>Loading...</div>;
  if (localCard === null) return <Card>No questions available</Card>;
  return (
    <form>
      <fieldset>
        <div className={clsx("grid grid-cols-1 gap-4")}>
          <Card bgColour="bg-teal-600">
            <LayoutQuestionVotes
              title={localCard.title}
              subtitle={
                "subtitle" in localCard
                  ? localCard.subtitle
                  : localCard.question
              }
              votes={
                voteCounts && localCard.type === "multiple_choice_question"
                  ? voteCounts[localCard.id]
                  : null
              }
            />
          </Card>
          <Card bgColour="bg-teal-600">
            <div className="grid grid-cols-12">
              <div className="col-span-1">{connectionCount}</div>
              <div className="col-span-11">Connections</div>
            </div>
          </Card>
          <hr />
          {Object.values(cards).map((card) => {
            {
              /* {Object.keys(cards).map((cardID) => { */
            }
            const el_id = `admin-select-${card.id}`;
            const isCurrent = localCard.id === card.id;
            return (
              <label key={card.id} htmlFor={el_id}>
                <Card bgColour={isCurrent ? "bg-teal-600" : ""}>
                  <input
                    type="radio"
                    name="current-question"
                    id={el_id}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setGlobalCardID(e.target.value)
                    }
                    value={card.id}
                    checked={isCurrent}
                    className="hidden"
                  />
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      resetVoteCount(card.id);
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
                  <LayoutQuestionVotes
                    title={card.title}
                    subtitle={
                      "subtitle" in card ? card.subtitle : card.question
                    }
                    options={(card as Question).options || []}
                    votes={
                      voteCounts && card.type === "multiple_choice_question"
                        ? voteCounts[card.id]
                        : null
                    }
                  />
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

  const { localCard, setLocalCardID, isLoading, isError, voteHandler } =
    useCard(token);
  const [error_count_afsaneh, setCount] = useState<number>(0);
  const incrementCount = () => {
    setCount(error_count_afsaneh + 1);
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (localCard === null) return <Card>No questions available</Card>;
  else {
    if (localCard.type === "message") {
      // if Afsaneh_s_Error then count to 5 then setLocalCardID to Afsaneh_s_Dilemma, the first time around
      // then 
      if (localCard.id.startsWith("Afsaneh_s_Error")) {
        if (error_count_afsaneh < 2) {
          setTimeout(() => {
            setLocalCardID("Afsaneh_s_Dilemma");
            incrementCount();
          }, 2000);
        }

      }


      return <MessageCard message={localCard as Message} />;
    } else {
      return (
        <QuestionCard
          currentQuestion={localCard as Question}
          setLocalCardID={setLocalCardID}
          voteHandler={voteHandler}
          error_count={error_count_afsaneh}
        />
      );
    }
  }
}
