"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSignup = async () => {
    setEmailError("");
    setPasswordError("");
    setPhoneError("");

    let isValid = true;

    if (name === "" || email === "" || password === "" || address === "" || city === "" || phoneNumber === "") {
      alert("All fields must be filled.");
      isValid = false;
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email address.");
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must contain at least one uppercase letter, one symbol, and one digit.");
      isValid = false;
    }

    if (!validatePhone(phoneNumber)) {
      setPhoneError("Invalid phone number. It should be 10 digits.");
      isValid = false;
    }

    if (isValid) {
      try {
        console.log(name, email, password, address, city, phoneNumber);

        const response = await fetch("http://localhost:4000/api/addUsers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            address: address,
            city: city,
            phoneNumber: phoneNumber
          }),
        });

        console.log('API Response:', response);

        // Check if the response status is OK (200) before parsing it as JSON
        if (response.status === 200) {
          const result = await response.json();
          if (result.success) {
            toast.success("Account created", {
              position: toast.POSITION.TOP_LEFT,
              autoClose: 3000,
            });
            setName('');
            setEmail('');
            setAddress('');
            setPassword('');
            setPhoneNumber('');
            setCity('');
            router.push("/loginPage");
          } else {
            console.log("Failed to create account: " + result.message);
          }
        } else if (response.status === 400) {
          const result = await response.json();
          setEmailError(result.message);
        } else {
          // Handle other status codes
          console.log("Failed to create account. Status code: " + response.status);
        }
      } catch (error) {
        console.error('Error adding user:', error);
      }

    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/;
    return passwordRegex.test(password);
  };

  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  }

  const handleLogin = () => {
    router.push('/loginPage');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-lg">
        <div>
          <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Your Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an Account
          </h2>
        </div>
        <div className="mt-4">
          <label htmlFor="userName" className="block font-bold">
            Username:
          </label>
          <input
            type="text"
            id="userName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="block font-bold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
          <p className="text-red-500">{emailError}</p>
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block font-bold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
          <p className="text-red-500">{passwordError}</p>
        </div>
        <div className="mt-4">
          <label htmlFor="address" className="block font-bold">
            Address:
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="city" className="block font-bold">
            City:
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="phoneNumber" className="block font-bold">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full border rounded-md py-2 px-3 mt-1"
          />
        </div>
        <p className="text-red-500">{phoneError}</p>
        <div className="mt-6">
          <button
            type="button"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleSignup}
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

