import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";


const useFlirtMessage = () => {
    const { selectedConversation } = useConversation();
    const { authUser } = useAuthContext();
    
  const [flirtMessage, setFlirtMessage] = useState("");
  
  const fetchFlirtMessage = async () => {
  
    setFlirtMessage(null);

    try {

        const token = JSON.parse(localStorage.getItem("chat-user"))?.token;
       // console.log(authUser);
       // console.log(token);

        if (!token) {
            throw new Error("User not authenticated");
        }

        	const res = await fetch(`/api/aiassit/flirt/${selectedConversation._id}`, {
			headers: {
				Authorization: `Bearer ${token}`, 
				"Content-Type": "application/json",
			},
            method: "GET",
            

		});	
        
        const data = await res.json();


                if(data.error) {
                    throw new Error(data.error);    
                }
         
                console.log(data);
                setFlirtMessage(data.message);
   
        
    } catch (err) {
      console.error("Flirt message fetch error:", err);
        setFlirtMessage("Error fetching flirt message");
    } 
  };

  return { flirtMessage, fetchFlirtMessage };
};

export default useFlirtMessage;
