import { Settings, LogOut, MessageCircleMore } from "lucide-react"; // Lucide icons included in Shadcn
// import { Button } from "../ui/button";
import { useAppSelector } from "@/hooks/hook";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { isUserLoggedIn, UserState } from "@/redux/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const {user} : UserState  = useAppSelector((store) => store.auth);
  const userExist = useAppSelector(isUserLoggedIn);
  const navigate = useNavigate();
  console.log(user);
  
  useEffect(()=>{
    if(!userExist){
      navigate('/login');
    }
  },[user])

  const menuItems = [
    { name: "Chats", icon: MessageCircleMore, href: "#" },
    { name: "Settings", icon: Settings, href: "#" },
    { name: "Logout", icon: LogOut, href: "#" },
  ];

  return (
    <aside className="bg-gray-900 text-white h-screen w-64 flex flex-col border-r border-gray-700">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700 ">
        <h1 className="text-xl font-bold">Message Mate</h1>
        {/* <Button variant="ghost" className="text-white">
          <Menu className="w-5 h-5" />
        </Button> */}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={
              "flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-800"
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className="flex gap-5 items-center px-4 py-4 border-t border-gray-700">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="h-10 rounded-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-lg">{user?.username}</p>
      </div>
    </aside>
  );
};

export default Sidebar;
