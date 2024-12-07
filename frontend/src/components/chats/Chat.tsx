import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { EllipsisVertical, Phone, SendHorizontal, Video } from "lucide-react";
import { Input } from "../ui/input";
import { useAppSelector } from "@/hooks/hook";
import { isUserLoggedIn, UserState } from "@/redux/authSlice";
import { useEffect, useRef } from "react";

interface chatType {
  sender: string;
  receiver: string;
  message: string;
}

interface propsType {
  currentChat?: string | null;
  setChats: (chat: any) => void;
  chats?: chatType[];
}

const Chat = ({ currentChat, chats, setChats }: propsType) => {
  // const userExist = useAppSelector(isUserLoggedIn);
  const { user }: UserState = useAppSelector((store) => store.auth);

  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  useEffect(() => {
    scrollToBottom(); // Ensure the chat is scrolled to the bottom on initial render
  }, [chats]);

  const handleSendMessage = () => {
    const message = inputRef.current?.value.trim();
    if (!message || !currentChat) return;

    const payload = {
      type: "chat",
      payload: {
        message,
        receiver: currentChat,
      },
    };

    wsRef.current?.send(JSON.stringify(payload));

    setChats((prevChats: chatType[]) => [
      ...prevChats,
      { sender: user?.username || "", receiver: currentChat, message },
    ]);

    if (inputRef.current) inputRef.current.value = ""; // Clear input
    scrollToBottom(); // Scroll to the latest message
  };

  return (
    <div className="flex flex-col flex-1 relative h-screen">
      {currentChat ? (
        <>
          <div className="flex justify-between items-center w-full h-16 text-white px-4 py-4 body-background">
            <div className="flex items-center">
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="h-10 rounded-full"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-bold">{currentChat}</h2>
                <p className="text-sm text-gray-400">last seen 11:30 AM</p>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <Phone />
              <Video />
              <EllipsisVertical />
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto p-4 pb-16"
            style={{
              backgroundImage:
                'url("https://img.freepik.com/free-vector/elegant-technology-background_1035-4674.jpg?t=st=1733552776~exp=1733556376~hmac=498168be3474dbaa586210768967fe2cb6514a0be8b998b9ddedc39f2645d4a8&w=1380")',
              backgroundSize: "contain",
            }}
          >
            {chats?.map((chat: chatType, index) => (
              <div
                key={index}
                className={`flex ${
                  chat.sender === user?.username
                    ? "justify-end"
                    : "justify-start"
                } mb-4`}
              >
                <div
                  className={`${
                    chat.sender === user?.username
                      ? "bg-blue-500"
                      : "bg-gray-800"
                  } text-white p-3 rounded-lg max-w-xs`}
                >
                  {chat.message}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex items-center gap-5 absolute bottom-0 w-full py-4 px-4 body-background">
            <Input
              placeholder="Type a message..."
              className="text-white w-full rounded-2xl"
              ref={inputRef}
            />
            <SendHorizontal
              className="text-white cursor-pointer"
              onClick={handleSendMessage}
            />
          </div>
        </>
      ) : (
        <>
        <div className="flex justify-center items-center h-screen bg-[#111111]">
          <div className="text-black text-3xl font-bold">
            No chats available
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default Chat;
