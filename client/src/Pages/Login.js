import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { login } from "../Redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the fields");
      return;
    }

    const res = await dispatch(login(loginData));

    if (res?.payload?.success) navigate("/");

    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center gap-6 p-8 bg-gray-900 bg-opacity-90 rounded-lg shadow-lg w-full max-w-sm mx-4"
        >
          <h1 className="text-center text-4xl font-extrabold text-[#0095ff]">Login</h1>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold text-[#0095ff]" htmlFor="email">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-[#0095ff] rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0095ff] transition duration-200"
              value={loginData.email}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold text-[#0095ff]" htmlFor="password">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="px-4 py-2 border border-[#0095ff] rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0095ff] transition duration-200"
              value={loginData.password}
              onChange={handleUserInput}
            />
          </div>

          <div
            onClick={() =>
              setLoginData({ email: "test@gmail.com", password: "Test@123" })
            }
            className="text-center text-[#0095ff] cursor-pointer hover:underline transition duration-200"
          >
            Guest Login
          </div>

          <button
            className="w-full py-3 text-lg font-bold text-white transition-all duration-300 ease-in-out bg-[#0095ff] border border-transparent rounded-md hover:bg-white hover:text-[#0095ff] hover:border-[#0095ff] focus:outline-none focus:ring-2 focus:ring-[#0095ff] focus:ring-opacity-50"
            type="submit"
          >
            Login
          </button>

          <Link to={"/forgetpassword"}>
            <p className="text-center text-[#0095ff] cursor-pointer hover:underline transition duration-200">
              Forget Password?
            </p>
          </Link>

          <p className="text-center">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-[#0095ff] cursor-pointer hover:underline transition duration-200">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
