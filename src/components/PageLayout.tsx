import Footer from '@/components/Footer';

export default function PageLayout({ children, token }: { children: React.ReactNode, token?: string }) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen px-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[url('bg.png')] bg-cover lg:bg-contain bg-top">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            {children}
        </main>
        <Footer token={token || '' } />
    </div>
  );
}