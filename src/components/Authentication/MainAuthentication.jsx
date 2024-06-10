import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import SignIn from "./Signin.jsx";
import SignUp from "./Signup.jsx";
import { Toaster } from "@/components/ui/sonner";


function MainAuthentication() {
    const location = useLocation();
  const [isLoginForm, setIsLoginForm] = useState(true);
  useEffect(() => {
    // Check the pathname of the current location
    if (location.pathname === '/signup') {
      setIsLoginForm(false);
    } else if (location.pathname === '/login') {
      setIsLoginForm(true);
    }
  }, [location.pathname]); // Re-run effect when location.pathname changes

  return (

    <div className="mx-auto max-w-md space-y-6 py-12">
        <Toaster />
      <div className="flex justify-center">
       <div>
        LOAN APPLICATION
       </div>
      </div>
      {isLoginForm ? (
        <SignIn onSwitchToSignUp={() => setIsLoginForm(false)} />
      ) : (
        <SignUp onSwitchToSignIn={() => setIsLoginForm(true)} />
      )}
    </div>
  );
}

export default MainAuthentication;
