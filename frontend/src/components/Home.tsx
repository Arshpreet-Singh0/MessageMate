import { useEffect, useState } from "react";
import Sidebar from "../components/navbar/Sidebar"
import Chat from "./chats/Chat"
import RecentChats from "./chats/RecentChats"
import axios from "axios";
// import Navbar from "./navbar/Navbar";
const API_END_POINT = import.meta.env.VITE_API_END_POINT;

const Home = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(()=>{
    const getChats = async()=>{
      try {
        console.log(`${API_END_POINT}/chat/${currentChat}`);
        
        const res = await axios.get(`${API_END_POINT}/chat/${currentChat}`,{
          headers : {
            "Content-Type" : "application/json",
            "authorization" : `${localStorage.getItem("token")}`
          }
        });
        console.log(res);
        
        setChats(res?.data?.chats)

      } catch (error) {
        console.log(error);
        
      }
    };
    getChats();
  },[currentChat]);
  console.log(chats);
  console.log(currentChat);
  
  
  
  return (
    <>
        {/* <Navbar /> */}
    <div className="flex">
        <Sidebar />
        <RecentChats setCurrentChat={setCurrentChat}/>
        <Chat currentChat={currentChat} chats={chats} setChats={setChats}/>
    </div></>
  )
}

export default Home