"use client"
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import ProductsDisplay from '../productDisplay/page';

const LoginPage = () => {
    const { data: session, status } = useSession();
    
    const handleLogin = async () => {
        await signIn("google"); 
    };

    const handleFacebookLogin = async () => {
      await signIn("facebook"); 
  };
    
    const handleLogout = async () => {
        await signOut();
    };

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-80">
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                    {status === "loading" && <p>Loading...</p>}
                    {status === "authenticated" && (
                        <div>
                            <p>Welcome, {session.user.name}!</p>
                            <p>Email: {session.user.email}</p>
                            <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                                Logout
                            </button>
                            <ProductsDisplay></ProductsDisplay>
                        </div>
                    )}
                    {status === "unauthenticated" && (
                        <div>
                            <button onClick={handleLogin} className="w-full bg-white-500 text-black py-2 px-4 rounded-md hover:bg-blue-600">
                                Login with Google
                            </button>
                        </div>
                    )}
                    {status === "unauthenticated" && (
                        <div>
                            <button onClick={handleFacebookLogin} className="w-full bg-white-500 text-black py-2 px-4 rounded-md hover:bg-blue-600">
                                Login with Facebook
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
