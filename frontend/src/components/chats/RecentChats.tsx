import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "../ui/input";
import { EllipsisVertical, Search, UserPlus, UserRoundPlus } from "lucide-react"; // Added UserPlus for the "Add Friend" icon
import { useAppSelector } from "@/hooks/hook";
import { UserState } from "@/redux/authSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const API_END_POINT = import.meta.env.VITE_API_END_POINT;

interface PropsType {
  setCurrentChat?: (chat: any) => void;
  wsRef : React.RefObject<WebSocket>,
}

const RecentChats = ({ setCurrentChat, wsRef }: PropsType) => {
  const { user }: UserState = useAppSelector((store) => store.auth);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [showFriendList, setShowFriendList] = useState<boolean>(false); // Toggle friend list visibility

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    setShowSuggestions(!!value);
  };

  const handleSearchButtonClick = async () => {
    if (!searchText.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_END_POINT}/user/${searchText}`);
      setSearchResult(res?.data?.user || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    const fetchFriendRequests = async () => {
      try {
        const res = await axios.get(`${API_END_POINT}/friend-request`,{
          headers : {
            Authorization : `${localStorage.getItem("token")}`
          }
        });
        
        setFriendRequests(res?.data?.requests || []);
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchFriendRequests();
  },[]);
  

  const handleAddFriendClick = (receiver: string) => {
    const payload = {
      type: "friend-request",
      payload: {
        receiver: receiver,
      },
    };
    wsRef.current?.send(JSON.stringify(payload));

    toast.success("Friend Request Sent Successfully.");
  };

  const handleAcceptFriendRequest = async(sender:string)=>{
    try {
      const res = await axios.post(`${API_END_POINT}/accept-request/${sender}`,{},{
        headers : {
          Authorization : `${localStorage.getItem("token")}`
        }
      });
      if(res.data.success){
        toast.success(res?.data?.message);
        setFriendRequests((prev) => prev.filter((request) => request.sender !== sender));
      }
    } catch (error) {
      console.log(error);
      
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong.");
        console.error(error);
      }
    }
  }

  return (
    <div className="h-screen w-[500px] bg-black flex flex-col text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-[#1570EF]">Messages Mate</h1>
        <div className="relative">
          <h1
            className="relative inline-block cursor-pointer"
            onClick={() => setShowFriendList(!showFriendList)}
          >
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {friendRequests.length}
            </span>
            <UserPlus className="text-4xl" />
          </h1>
          {showFriendList && (
            <div className="absolute bg-gray-800 text-white p-4 rounded shadow-lg mt-2 w-64 right-0 z-10">
              <h2 className="text-sm font-bold mb-2">Friend Requests</h2>
              {friendRequests.length > 0 ? (
                <ul>
                  {friendRequests.map((request, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-2 border-b border-gray-700"
                    >
                      <span>{request.sender}</span>
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleAcceptFriendRequest(request.sender)}
                      >
                        Accept
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No friend requests</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center px-4 pt-4 gap-5">
        <Input
          placeholder="Search"
          className="rounded-md py-5"
          value={searchText}
          onChange={handleInputChange}
        />
        <Search onClick={handleSearchButtonClick} className="cursor-pointer" />

        {loading ? (
          <div className="absolute left-0 right-0 top-full z-20 text-gray-400">
            Loading...
          </div>
        ) : (
          showSuggestions && (
            <div
              id="search"
              className="absolute z-20 bg-gray-800 text-white left-0 right-0 top-full shadow-lg max-h-60 overflow-y-auto ml-4 mr-14 rounded"
            >
              {searchResult.length > 0 ? (
                <ul className="p-2">
                  {searchResult.map((suggestion, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center cursor-pointer p-2"
                    >
                      <span>{suggestion?.username}</span>
                      <button
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                        onClick={() => handleAddFriendClick(suggestion?.username)}
                      >
                        <UserPlus className="w-5 h-5" />
                        Add Friend
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-2 text-gray-500">No results found</div>
              )}
            </div>
          )
        )}
      </div>

      {/* Messages Section */}
      <h3 className="text-white px-2 ml-2 text-2xl mb-4 mt-4">Messages</h3>
      <div className="flex flex-col border-t border-gray-700 overflow-y-auto">
        {user?.friends?.map((friend, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 border-b border-gray-700 h-[72px] bg-[#0b0916] cursor-pointer"
            onClick={() => setCurrentChat?.(friend)}
          >
            <div className="flex items-center">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="h-10 rounded-full"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <h2 className="text-sm font-bold">{friend.toString()}</h2>
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
