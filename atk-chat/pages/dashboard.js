import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { collection, where, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Message from "@/components/Message";
import { BsTrash2Fill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import Link from "next/link";

export default function Dashboard(){
    const route = useRouter()
    const [user, loading] = useAuthState(auth)
    const [yourPosts, setYourPosts] = useState([])

    const getData = async () => {
        if (loading) return;
        if (!user) return route.push("/auth/login");
        const collectionRef = collection(db, "posts");
        const q = query(collectionRef, where("user", "==", user.uid ))
        const unsubscribe = onSnapshot(q, (snapshot => {
            setYourPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }))
        return unsubscribe;
    }

    const deletePost = async(id) => {
        const docRef = doc(db, 'posts', id,)
        await deleteDoc(docRef)
    }

    console.log(yourPosts)

    useEffect(() => {
        getData();
    }, [user, loading])
    return(
        <>
        <div className='my-12 text-xl font-medium'>
            <h1 className="pb-4">Your Posts</h1>
            <div>
                {yourPosts.map((post) => {
                    return(
                        <Message {...post} key={post.id}>
                            <div className="flex gap-4">
                                <button onClick={() => deletePost(post.id)} className="text-red-600 flex items-center gap-2 py-2 text-sm"> 
                                <BsTrash2Fill className="text-2xl"/>Delete
                                </button>
                                <Link href={{pathname: "/post", query: post}}>
                                <button className="text-green-600 flex items-center gap-2 py-2 text-sm"> 
                                <AiFillEdit className="text-2xl"/>Edit
                                </button>
                                </Link>
                            </div>
                        </Message>
                    );
                })}
            </div>
        </div>
        <button className="rounded-lg font-medium bg-cyan-600 text-white py-2 px-4 rounded-mg" onClick={() => auth.signOut()}>Sign Out</button>
        </>
    )
}