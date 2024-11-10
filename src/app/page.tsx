// use Card component from src/components/Card.tsx
import { CurrentQuestion } from "@/components/Questions";

export default function HomePage() {
  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <CurrentQuestion />
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <h3 className="text-sm text-slate-800">footer text</h3>
        </footer>
      </div>
  );
}
