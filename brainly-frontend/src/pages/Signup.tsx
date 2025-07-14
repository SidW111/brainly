import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URI } from "../config";
import { useNavigate } from "react-router-dom";
export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(`${BACKEND_URI}/api/v1/signup`, {
       username, password 
    });
    navigate('/signin')
    alert("You have signed up successfully")
  }

  return (
    <div className=" w-screen h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 border min-w-48">
        <Input ref={usernameRef} placeholder="username" />
        <Input ref={passwordRef} placeholder="password" />
        <div className="pt-2 flex justify-center items-center">
          <Button
            onClick={signup}
            fullwidth={true}
            loading={false}
            variant="primary"
            title="Sign Up"
          />
        </div>
      </div>
    </div>
  );
}
