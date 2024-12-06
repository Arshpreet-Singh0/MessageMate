import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "../ui/input";
import { EllipsisVertical } from "lucide-react";
import { useAppSelector } from "@/hooks/hook";
import { UserState } from "@/redux/authSlice";

interface propsType {
  setCurrentChat? : (chat:any)=>void
}

const RecentChats = ({setCurrentChat}:propsType) => {
  const {user} : UserState = useAppSelector((store) => store.auth);
  return (
    <div className="h-screen w-[500px] bg-black flex flex-col text-white">
      <div className="flex items-center px-4 py-4 border-b border-gray-800">
            <h1 className="text-xl font-bold text-[#1570EF]">Messages Mate</h1>
        </div>
      <div className="flex items-center px-4 py-4">
        <Input placeholder="Search" className="rounded-md py-5" />
        {/* <Search /> */}
      </div>
      <h3 className="text-white px-2 ml-2 text-2xl mb-4">Messages</h3>
      <div className="flex flex-col border-t border-gray-700">
        {user?.friends?.map((friend) => (
          <div className="flex items-center justify-between px-4 border-b border-gray-700 h-[72px] bg-[#0b0916]" onClick={()=>setCurrentChat(friend)}>
            <div className="flex items-center">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="h-10 rounded-full"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <h2 className="text-sm font-bold">{friend}</h2>
                {/* <p className="text-sm text-gray-400">{chat?.message}</p> */}
              </div>
            </div>
            <div>
              <EllipsisVertical />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentChats;
