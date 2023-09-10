"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  const handleSignUp = async () => {
    if(email === "" || email == ""){
      alert("Field must not be empty");
    }else{
      const response = await fetch("http://localhost:4000/api/checkUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      console.log('API Response:', response);

      const result = response.json();
      if(result.success){
        setName('');
        setEmail('');
        router.push("/")
      }
    }
  };

  const handleLogin = () => {
    router.push('/signupPage'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-lg">
        <div>
          <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Your Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up for an Account
          </h2>
        </div>
          <div className="mt-4">
            <label htmlFor="newUsername" className="block font-bold">
              Email:
            </label>
            <input
              type="text"
              id="newUsername"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-md py-2 px-3 mt-1"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="newPassword" className="block font-bold">
              Password:
            </label>
            <input
              type="password"
              id="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-md py-2 px-3 mt-1"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={handleLogin}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
