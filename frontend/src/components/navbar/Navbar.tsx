import { useAppSelector } from "@/hooks/hook";
import { Button } from "../ui/button";
import { isUserLoggedIn } from "@/redux/authSlice";

const Navbar = () => {
  const isUserExist = useAppSelector(isUserLoggedIn);
  return (
    <div className="flex items-center justify-between px-16 h-20 text-white">
      <div>
        <h1 className="text-3xl font-bold text-[#1570EF]">Message Mate</h1>
      </div>
      <div>
          <ul className="flex items-center gap-16">
              <li>Home</li>
              <li>About us</li>
        {isUserExist ? (
          <>
          <li>Profile</li>
          </>
        ) : (
            <>
            <Button className="bg-[#1570EF]">Sign in</Button>
            <Button className="bg-[#1570EF]">Sign up</Button>
            </>
        )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
