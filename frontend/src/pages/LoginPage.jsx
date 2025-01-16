import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser.js";

const LoginPage = () => {
  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");
  const { login } = useAuthStore.getState();

  const submitHandler = (e) => {
    e.preventDefault();
    login({ email, password });
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
            Log-In
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
                placeholder="you@example.com"
                required
                id="email"
                value={email}
                onChange={(e) => getEmail(e.target.value)}
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
                onChange={(e) => getPassword(e.target.value)}
              />
            </div>

            <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
              Log-In
            </button>
          </form>
          <div className="text-balance text-gray-400">Forgot Password?</div>
          <div className="text-center text-gray-400">
            Don't have an Account!{" "}
            <Link to={"/signup"} className="text-blue-400 hover:underline">
              Sign-Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
