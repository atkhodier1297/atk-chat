import Link from "next/link";
import { auth } from '../utils/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";


export default function Nav() {
    const [user, loading] = useAuthState(auth)

    useEffect(() => {
    }, [user, loading])

    return(
        <div>
            <nav className="flex justify-between items-center py-10">
                <Link href="/">
                    <button className="text-lg font-medium">atk-chat</button>
                </Link>
                <ul className="flex items-center gap-10">
                    {!user && (
                    <Link href={'/auth/login'}>
                       <p className="py-2 px-4 ext-sm bg-cyan-600 rounded-lg font-medium ml-8 text-white">Join Now</p>
                    </Link>
                    )}
                    {user && (
                        <div className="flex items-center gap-6">
                            <Link href="/post">
                                <button className="rounded-lg font-medium bg-cyan-600 text-white py-2 px-4 rounded-mg">Post</button>
                            </Link>
                            <Link href="/dashboard">
                                <img className="w-12 rounded-full cursor-pointer" src={user.photoURL} alt="user-avatar"/>
                            </Link>
                        </div>
                    )}
                </ul>
            </nav>
        </div>
    )
}