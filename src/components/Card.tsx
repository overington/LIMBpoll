// display of the Card component
export function SectionCard(props: { title: string; description: string, children?: React.ReactNode}) {
    return (
        <Card>
            <CardTitle>{props.title}</CardTitle>
            <CardSubtitle>{props.description}</CardSubtitle>
            {props.children? props.children : null}
        </Card>
    );
}

export function CardTitle({ children } : { children: React.ReactNode }) {
    return <h1 className="text-4xl font-bold text-slate-50">{children}</h1>;
}
export function CardSubtitle({ children } : { children: React.ReactNode }) {
    return <p className="text-2xl font-semibold text-slate-200">{children}</p>;
}

export default function Card(props: { children?: React.ReactNode, className?: string }) {
    const { className, children } = props;
    return (
        <div className="items-center p-4 rounded-lg bg-slate-800 text-slate-300 shadow-lg w-full max-w-md">
            {props.children? props.children : null}
        </div>
    );
}