import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/hook";
import { setUser } from "@/redux/authSlice";
import Navbar from "../navbar/Navbar";
const API_END_POINT = import.meta.env.VITE_API_END_POINT;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e: any): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await axios.post(`${API_END_POINT}/login`, input);
      console.log(res);

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        localStorage.setItem("token", res?.data?.token);
        console.log(res);
        dispatch(setUser(res?.data?.user));
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong.");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center h-[90vh]">
        {/* <div className="w-1/2">
          <img src="" alt="" />
      </div> */}
        <div className="w-[405px] h-[400px] border border-black rounded-xl bg-custom-blue text-white p-10">
          <form>
            <h1 className="text-2xl font-bold text-center p-2"> Create An Account</h1>
            <div className="mt-4">
              <Label htmlFor="name">Username : </Label>
              <Input
                className="mt-2"
                placeholder="Username"
                id="name"
                name="username"
                value={input.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="password">Password : </Label>
              <Input
                type="password"
                className="mt-2"
                placeholder="Password"
                name="password"
                id="password"
                value={input.password}
                onChange={handleInputChange}
              />
            </div>
            {loading ? (
              <Button className="mt-10 w-full bg-[#1570EF] hover:bg-[#1570EF]">
                <Loader2 /> Please Wait
              </Button>
            ) : (
              <Button
                className="mt-10 w-full bg-[#1570EF] hover:bg-[#1570EF]"
                type="submit"
              >
                Submit
              </Button>
            )}
          </form>
        </div>
        {/* <div className="flex justify-center items-center flex-col gap-8 xl:w-[700px] h-screen text-white w-full">
      <h1 className="text-3xl font-bold text-[#DD9538]">Message <span className="text-[#7733A6]">Mate</span></h1>
          <div className="border px-10 py-5 rounded-lg w-96">
            <h1 className="text-2xl font-bold text-center p-2"> Login </h1>
                <div className="mt-4">
                  <Label htmlFor="name">Username : </Label>
                  <Input className="mt-2" placeholder="Username" id="name" name="username" value={input.username} onChange={handleInputChange}/>

                </div>
                <div className="mt-4">
                  <Label htmlFor="password" >Password : </Label>
                  <Input type="password" className="mt-2" placeholder="Password" name="password" id="password" value={input.password} onChange={handleInputChange}/>
                </div>
                {
                  loading ? <Button className="mt-10 w-full bg-white text-black hover:bg-white"><Loader2 /> Please Wait</Button> : <Button className="mt-10 w-full bg-white text-black hover:bg-white" onClick={handleSubmit}>Submit</Button>
                }

          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center xl:flex-1">
            <img src="https://res.cloudinary.com/djusmuols/image/upload/Screenshot_2024-12-06_at_10.55.23_AM_alccpt.png" alt="" className="h-[90vh] rounded" />
        </div> */}
      </div>
    </>
  );
};

export default Login;
