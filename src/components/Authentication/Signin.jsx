import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SignIn({ onSwitchToSignUp }) {
  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignInData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(signInData)
      const response = await axios.post('https://loanappbackend-dcsb.onrender.com/api/signin', signInData);
      console.log('Sign in successful:', response.data);
      localStorage.setItem("token", response.data.data);
      console.log("set man")
	    window.location = "/";
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your credentials to access your account
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            value={signInData.email}
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
            value={signInData.password}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Don't have an account?{" "}
        <Link to="/signup">
        <button
          type="button"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          onClick={onSwitchToSignUp}
        >
          Sign Up
        </button>
        </Link>
      </div>
    </div>
  );
}
