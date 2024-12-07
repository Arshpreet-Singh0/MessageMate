import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormEvent } from "react";

interface propsType {
    input : {
        username : string,
        password : string,
    },
    handleInputChange : (e:React.ChangeEvent<HTMLInputElement>)=>void,
    handleSubmit : (e:FormEvent<HTMLFormElement>)=>void,
    loading : boolean,
    heading : string,
}
const Form = ({input, handleInputChange, handleSubmit, loading, heading} : propsType) => {
  return (
    <>
      <div className="flex items-center justify-center h-[90vh]">
        {/* <div className="w-1/2">
          <img src="" alt="" />
      </div> */}
        <div className="w-[405px] h-[400px] border border-black rounded-xl bg-custom-blue text-white p-10">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-center p-2">{heading}</h1>
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
      </div>
    </>
  )
}

export default Form