import { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
const API_END_POINT = import.meta.env.VITE_API_END_POINT;

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_END_POINT}/signup`, input);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/login");
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
      <Form input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} loading={loading} heading="Create an account"/>
    </>
  );
};

export default Signup;
