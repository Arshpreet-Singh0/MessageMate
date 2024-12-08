import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/navbar/Sidebar"
import Chat from "./chats/Chat"
import RecentChats from "./chats/RecentChats"
import axios from "axios";
// import Navbar from "./navbar/Navbar";
const API_END_POINT = import.meta.env.VITE_API_END_POINT;
interface chatType {
  sender: string;
  receiver: string;
  message: string;
}


const Home = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:8080?token=${localStorage.getItem("token")}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        //@ts-ignore
        setChats((prevChats: chatType[]) => [...prevChats, data]);
        scrollToBottom(); // Scroll to the latest message
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [setChats]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(); // Ensure the chat is scrolled to the bottom on initial render
  }, [chats]);

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
        <RecentChats setCurrentChat={setCurrentChat} wsRef={wsRef}/>
        <Chat currentChat={currentChat} chats={chats} setChats={setChats} wsRef={wsRef} scrollToBottom={scrollToBottom} messagesEndRef={messagesEndRef}/>
    </div></>
  )
}

export default Home