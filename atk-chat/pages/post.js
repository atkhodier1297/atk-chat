import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import {
    addDoc,
    collection,
    serverTimestamp,
  } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";



export default function Post() {
  //Form state
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth)
  const route = useRouter();
  const routeData = route.query;


  //Submit Post
  const submitPost = async (e) => {
    e.preventDefault();
    const collectionRef = collection(db, 'posts');
    await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName
    })
  };

   //Check our user
   const checkUser = async () => {
    if (loading) return;
    if (!user) route.push("/auth/login");
    if (routeData.id) {
      setPost({ description: routeData.description, id: routeData.id });
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">
          {post.hasOwnProperty("id") ? "Edit your post" : "Create a new post"}
        </h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm"
          >
          </textarea>
          <p
            className={`text-cyan-500 font-medium text-sm ${
              post.description.length > 100 ? "text-red-600" : ""
            }`}
          >
            {post.description.length}/100
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-500 text-white font-medium p-2 my-2 rounded-lg text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
