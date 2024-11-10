// display of the Card component
export default function Card(props: { title: string; description: string, children?: React.ReactNode}) {
    return (
        <EmptyCard>
        <h1 className="text-4xl font-bold text-slate-50">{props.title}</h1>
        <p className="text-2xl font-semibold text-slate-200">{props.description}</p>
            {props.children? props.children : null}
        </EmptyCard>
    );
}

export function EmptyCard(props: { children?: React.ReactNode}) {
    return (
        <div className="flex flex-col gap-4 items-center p-4 rounded-lg bg-slate-800 text-slate-300 shadow-lg w-full max-w-md">
            {props.children? props.children : null}
        </div>
    );
}