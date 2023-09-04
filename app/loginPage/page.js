"use client"
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import HeaderPage from '../components/header';

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const[userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  const handleLogin = async () => {
    await signIn('google');
  };

  useEffect(() => {
    if(session){
      setUserName(session.user.name);
      setUserImage(session.user.image);
      router.push('/productDisplay');
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-lg">
        <div>
          <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Your Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Your Account
          </h2>
        </div>
        {session ? (
          <HeaderPage userName={userName} userImage={userImage}/>
        ) : (
          <div>
            <p className="mt-4 text-center">Please sign in to continue</p>
            <div className="mt-6">
              <button onClick={handleLogin} type="button" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <img class="w-6 h-6 mr-2" src="google.png"></img>
                Sign in with Google
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
