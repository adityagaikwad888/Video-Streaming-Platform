import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authUser.js";

const SignUpPage = () => {
  const { signup } = useAuthStore.getState();

  /* Grabing parameters from URL */
  const { searchParams } = new URL(document.location);
  const emailParam = searchParams.get("email");

  const [email, setEmail] = useState(emailParam ? emailParam : "");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(email, username, password);
    signup({ email, username, password });
  };

  return (
    <div className="hero-bg w-full h-screen">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-certer mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Sign Up
          </h1>
          <form className="space-y-4" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring focus:ring-blue-500"
                placeholder={emailParam ? emailParam : "xyz@example.com"}
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-300 block"
              >
                UserName
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="username"
                required
                id="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="********"
                required
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
              Sign Up
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:underline">
              Sign-In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
