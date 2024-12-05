import Link from 'next/link'
import { USER_TOKEN, ADMIN_TOKEN } from "@/data/config"

export default function Footer({token}: {token: string}) {
    const footer_items = (token === ADMIN_TOKEN ) ? [
        {name: 'Vote', link: '/'},
        {name: 'qrcode', link: '/connect'},
        {name: 'Admin', link: '/admin'}
    ] : (token === USER_TOKEN) ? [
    ] : [
        {name: 'Vote', link: '/'},
        {name: 'qrcode', link: '/connect'}
    ]

    return (
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            {footer_items.map((item, index) => (
                    <Link
                        href={item.link}
                        key={index}
                        className="hover:underline"
                    >
                        {item.name}
                    </Link>
            )) }
            </footer>
    )
}