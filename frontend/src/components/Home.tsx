import Sidebar from "../components/navbar/Sidebar"
import Chat from "./chats/Chat"
import RecentChats from "./chats/RecentChats"

const Home = () => {
  return (
    <div className="flex">
        <Sidebar />
        <RecentChats />
        <Chat />
    </div>
  )
}

export default Home