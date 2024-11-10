/**
 * Admin page
 *
 * This page allows the user to set the question ID and view the current voting
 * results. The user can also open and close voting.
 *
 */

import Card from "@/components/Card";
import { questions } from "@/components/Questions";


export default function AdminPage() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card title="Questions" description="Select Which Question to show">
          <span>Chosen ID</span>
        </Card>

        {questions.map((question, index) => (
          <Card
            key={index}
            title={question.question}
            description="Choose one from the following"
          >
            {question.options.map((option, oidx) => (
              <p key={oidx}>{option}</p>
            ))}
          </Card>
        ))}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <h3 className="text-sm text-slate-800">footer text</h3>
      </footer>
    </div>
  );
}
