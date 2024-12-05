import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "../ui/input";
import { EllipsisVertical } from "lucide-react";

const chats = [
  {
    id: 1,
    name: "John Doe",
    message: "Hello, how are you?",
  },
  {
    id: 2,
    name: "Shadcn",
    message: "Hey, how are you",
  },
  {
    id: 3,
    name: "Ajay",
    message: "Hello",
  },
  {
    id: 4,
    name: "Rahul",
    message: "Hey",
  },
];
const RecentChats = () => {
  return (
    <div className="h-screen w-96 bg-gray-900 flex flex-col text-white">
      {/* <div className="flex items-center px-4 py-4 border-b border-gray-800">
            <h1 className="text-xl font-bold">Messages</h1>
        </div> */}
      <div className="flex items-center px-4 py-4">
        <Input placeholder="Search" className="rounded-xl py-5" />
        {/* <Search /> */}
      </div>
      <h3 className="text-zinc-400 ml-2 text-sm mb-1">Recent Chats</h3>
      <div className="flex flex-col ">
        {chats?.map((chat) => (
          <div className="flex items-center justify-between px-4 border-b border-gray-700 h-[72px] bg-gray-800">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="h-10 rounded-full"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <h2 className="text-sm font-bold">{chat?.name}</h2>
                <p className="text-sm text-gray-400">{chat?.message}</p>
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