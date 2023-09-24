"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignUp = async () => {
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (email === "" || password === "") {
      alert("Field must not be empty");
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await fetch("http://localhost:4000/api/checkUsers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password,
            rememberMe: rememberMe,
          })
        })

        console.log('API Response:', response);

        if (response.status === 200) {
          const result = await response.json();
          const { token } = result;
          localStorage.setItem('token', token);
          console.log('Token stored:', token);
          router.push("/");

        } else if (response.status === 401) {
          toast.error("User not found in the database or invalid credentials", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 3000,
          })
        }


      } catch (error) {
        console.error('Error finding user:', error);
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
          <p className="text-red-500">{emailError}</p>
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
          <p className="text-red-500">{passwordError}</p>
        </div>
        <div className="mt-4">
          <label htmlFor="rememberMe" className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <span className="text-sm">Remember Me</span>
          </label>
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
        <div className="mt-4">
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
