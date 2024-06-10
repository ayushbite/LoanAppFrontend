import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function SignUp({ onSwitchToSignIn }) {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    pin: "",
  });
  const [pin, setPin] = React.useState("")

  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(signupData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
     
      const dataWithPin = { ...signupData, pin };
      const response = await axios.post(
        "https://loanappbackend-dcsb.onrender.com/api/users",
        dataWithPin // Send data with pin included
      );
      console.log("Sign up successful:", response.data);
      navigate("/");
      toast("Sign up successful!");
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.response) {
        toast(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        toast("Error: No response received from the server.");
      } else {
        toast(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your details to get started
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="John"
            required
            value={signupData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            required
            value={signupData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            value={signupData.email}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={signupData.password}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pin">Secret Pin : </Label>
          <div className="space-y-2">
          <InputOTP
        maxLength={6}
        value={pin}
        onChange={(pin) => setPin(pin)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link to="/login">
          <button
            type="button"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            onClick={onSwitchToSignIn}
          >
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
