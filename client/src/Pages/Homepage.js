import React from "react";
import Layout from "../Layout/Layout";
import homePageMainImage from "../Assets/Images/homePageMainImage.png";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import bot from "../Assets/bot.png"
import { InputBox } from "../Components/InputBox";
const Homepage = () => {
  return (
    <Layout>
      {/* <Navbar/> */}
      <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
        {/* for platform details */}
        <div className="w-1/2 space-y-6">
          <h1 className="text-5xl font-semibold text-[#ff7070]">
            Find out best{" "}
            <span className="text-[#0095ff] font-bold">Online Courses</span>
          </h1>
          <p className="text-xl text-[#0095ff]">
            We have a large library of courses taught by highly skilled and
            qualified faculities at a very affordable cost.
          </p>

          {/* for buttons */}
          <div className="space-x-6">
            <Link to={"/courses"}>
              <button className="bg-[#0095ff] text-white border px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:border-[#0095ff] hover:bg-white hover:text-[#0095ff] transition-all ease-in-out duration-300">
                Explore Courses
              </button>
            </Link>
            <Link to={"/contact"}>
              <button className="border bg-[#0095ff] px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:border-[#0095ff] hover:bg-white hover:text-[#0095ff] transition-all ease-in-out duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* right section for image */}
        <div className="w-1/2 flex items-center justify-center">
          <img src={homePageMainImage} alt="home page img" />
        </div>
        <div className="z-10">
          <InputBox />
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
