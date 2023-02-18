import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
  } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";
import { toast } from "react-toastify";

export default function Post() {
  //Form state
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth)
  const route = useRouter();
  const routeData = route.query;
  
  //Submit Post
  const submitPost = async (e) => {
    e.preventDefault();
    if(!post.description){
      toast.error('Description is empty! 😡😡😡', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      })
      return;
    }
    if(post.description.length > 100){
      toast.error('Description is too long! 😡😡😡', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      })
      return;
    }

    if(post?.hasOwnProperty("id")){
      const docRef = doc(db, 'posts', post.id);
      const updatedPost = {...post, timestamp: serverTimestamp()};
      await updateDoc(docRef, updatedPost);
      return route.push('/')
    }
    else {

    // create an if statement that throws a toast error saying Description is empty if !post.description.
    const collectionRef = collection(db, 'posts');
    await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName
    });
    setPost({description: ""});
    return route.push('/');
    }
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

  function clear(){
    setPost({description: ""})
  }



  return (
    <div className="my-20 p-12 shadow-lg shadow-cyan-600 rounded-lg max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">
          {post.hasOwnProperty("id") ? "Edit your post" : "Create a new post"}
        </h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-cyan-600 h-48 w-full text-white rounded-lg p-2 text-sm"
          >
          </textarea>
          <p
            className={`text-black font-medium text-sm ${
              post.description.length > 100 ? "text-red-600" : ""
            }`}
          >
            {post.description.length}/100
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm"
        >
          Submit Post
        </button>
      </form>
      <button
          onClick={clear}
          className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm"
        >
          Clear
        </button>
    </div>
    
  );
}
