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

  // function to handle the user input
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // function to login
  const handleLogin = async (event) => {
    event.preventDefault();

    // checking the empty fields
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the fields");
      return;
    }

    // calling login action
    const res = await dispatch(login(loginData));

    // redirect to home page if true
    if (res?.payload?.success) navigate("/");

    // clearing the login inputs
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <Layout>
      <div className="flex items-center text-white justify-center h-[100vh]">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center gap-4 rounded-lg p-4 w-80 h-[26rem] shadow-[0_0_15px_black]"
        >
          <h1 className="text-center text-2xl font-bold text-[#0095ff]">Login Page</h1>
          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold text-[#0095ff]" htmlFor="email">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="bg-transparent px-2 py-1 border border-[#0095ff] text-white"
              value={loginData.email}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold text-[#0095ff]" htmlFor="password">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="bg-transparent px-2 py-1 border border-[#0095ff] text-white"
              value={loginData.password}
              onChange={handleUserInput}
            />
          </div>

          {/* guest account access */}
          <div
            onClick={() =>
              setLoginData({ email: "test@gmail.com", password: "Test@123" })
            }
            className="text-center link text-[#0095ff] cursor-pointer"
          >
            Guest Login
          </div>

          <button
            className="w-full bg-[#0095ff] text-white hover:border hover:border-[#0095ff] hover:bg-[#fff] hover:text-[#0095ff] transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Login
          </button>

          <Link to={"/forgetpassword"}>
            <p className="text-center link text-[#0095ff] cursor-pointer">
              Forget Password
            </p>
          </Link>

          <p className="text-center">
            Don't have an account ?{" "}
            <Link to={"/signup"} className="link text-[#0095ff]   cursor-pointer">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
