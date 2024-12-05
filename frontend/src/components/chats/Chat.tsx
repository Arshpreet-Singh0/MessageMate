import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { EllipsisVertical, Phone, SendHorizontal, Video } from "lucide-react";
import { Input } from "../ui/input";
import { useAppSelector } from "@/hooks/hook";
import { isUserLoggedIn, UserState } from "@/redux/authSlice";
interface propsType {
  currentChat? : string | null,
  // setCurrentChat : (chat : string) => void,
  setChats : (chat : any) => void,
  chats? : {}
};

const Chat = ({currentChat, chats, setChats} : propsType) => {
    // const {user} = useAppSelector(state=>state.auth);
    const userExist = useAppSelector(isUserLoggedIn)
    console.log(userExist);
    const {user} : UserState  = useAppSelector((store) => store.auth);
    
  return (
    <div className="flex flex-col flex-1 relative h-screen bg-[#242427]">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full h-16 text-white px-4 py-4 bg-[#1f1f21]">
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

      {/* Chat Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#242427]">
      {chats?.map((chat:object, index) => (
        <div
          key={index}
          className={`flex ${
            chat?.sender === user?.username ? "justify-end" : "justify-start"
          } mb-4`}
        >
          <div
            className={`${
              chat?.sender === user?.username ? "bg-blue-500" : "bg-gray-800"
            } text-white p-3 rounded-lg max-w-xs`}
          >
            {chat?.message}
          </div>
        </div>
      ))}
    </div>

      {/* Input Section */}
      <div className="flex items-center gap-5 absolute bottom-0 w-full bg-[#1f1f21] py-4 px-4">
        <Input placeholder="Type a message..." className="text-white w-full rounded-2xl" />
        <SendHorizontal  className="text-white"/>
      </div>
    </div>
  );
};

export default Chat;
