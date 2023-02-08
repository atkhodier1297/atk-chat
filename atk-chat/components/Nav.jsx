import Link from "next/link";


export default function Nav() {
    return(
        <div>
            <nav className="flex justify-between items-center py-10">
                <Link href="/">
                    <button className="text-lg font-medium">atk-chat</button>
                </Link>
                <ul className="flex items-center gap-10">
                    <Link href={'/auth/login'}>
                       <p className="py-2 px-4 ext-sm bg-cyan-500 rounded-lg font-medium ml-8">Join Now</p>
                    </Link>
                </ul>
            </nav>
        </div>
    )
}