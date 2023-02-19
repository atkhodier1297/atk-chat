import Message from '@/components/Message';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";


export default function Details() {
    const router = useRouter();
    const routeData = router.query;
    const [message, setMessage] = useState("");
    const [allMessage, setAllMessages] = useState([]);

    const submitMessage = async () => {
        //Check if the user is logged
        if (!auth.currentUser) return router.push("/auth/login");
    
        if (!message) {
          console.log(message);
          toast.error("Don't leave an empty message 😅", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          return;
        }
        
    }

    return(
    <div>
      <Message {...routeData}></Message>
      <div className="my-4">
        <div className="flex">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            placeholder="Send a message 😀"
            className="bg-gray-600 w-full p-2 text-white text-sm"
          />
          <button onClick={submitMessage} className="bg-cyan-600 text-white py-2 px-4 text-sm">
            Submit
          </button>
            </div>
            <div className='py-6'>
                <h2 className='font-bold '>Comments</h2>
                {/* {setAllMessages.map((message) => (
                    <div>
                        <div>
                            <img src='' alt=''/>
                        </div>
                    </div>
                ))} */}
            </div>
        </div>
    </div>
    );
}