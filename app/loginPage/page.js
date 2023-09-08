"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();

  const [newUserName, setNewUserName] = useState(""); // Initialize with an empty string
  const [newPassword, setNewPassword] = useState(""); // Initialize with an empty string

  // Function to handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Perform your user registration logic here.
    // If registration is successful, navigate to the login page.
    // For example, you might use an API call or other registration method.

    // Replace the following lines with your actual registration logic
    const isRegistered = true; // Set to true if registration succeeds
    if (isRegistered) {
      // Redirect to the login page after successful registration
      router.push('/login'); // Replace '/login' with the path to your login page
    }
  };

  // Function to navigate back to the login page
  const handleLogin = () => {
    router.push('/signupPage'); // Replace '/login' with the actual path to your login page
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
        <form onSubmit={handleSignUp}>
          <div className="mt-4">
            <label htmlFor="newUsername" className="block font-bold">
              Username:
            </label>
            <input
              type="text"
              id="newUsername"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border rounded-md py-2 px-3 mt-1"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        </form>
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
