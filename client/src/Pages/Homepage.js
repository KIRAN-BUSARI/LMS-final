import React from "react";
import Layout from "../Layout/Layout";
import homePageMainImage from "../Assets/Images/homePageMainImage.png";
import { Link } from "react-router-dom";
import { InputBox } from "../Components/InputBox";

const Homepage = () => {
  return (
    <Layout>
      {/* <Navbar/> */}
      <div className="pt-10 text-white flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-10 mx-4 md:mx-8 lg:mx-16 h-[90vh] text-md">
        {/* for platform details */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="sm:text-5xl text-xl font-semibold text-[#ff7070]">
            Find out best{" "}
            <span className="text-[#0095ff] font-bold">Online Courses</span>
          </h1>
          <p className="sm:text-xl text-base text-[#0095ff]">
            We have a large library of courses taught by highly skilled and
            qualified faculties at a very affordable cost.
          </p>

          {/* for buttons */}
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 items-center justify-center lg:justify-start">
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
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img src={homePageMainImage} alt="home page img" className="w-full h-auto max-w-sm lg:max-w-full" />
        </div>
        <div className="z-10 mt-6 lg:mt-0">
          <InputBox />
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
