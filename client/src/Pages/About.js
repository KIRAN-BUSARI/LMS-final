import React from "react";
import Layout from "../Layout/Layout";
import aboutMainImage from "../Assets/Images/aboutMainImage.png";
import apj from "../Assets/Images/QuotesPersonalityImage/apj.png";
import billGates from "../Assets/Images/QuotesPersonalityImage/billGates.png";
import einstein from "../Assets/Images/QuotesPersonalityImage/einstein.png";
import nelsonMandela from "../Assets/Images/QuotesPersonalityImage/nelsonMandela.png";
import steveJobs from "../Assets/Images/QuotesPersonalityImage/steveJobs.png";

const About = () => {
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-20 pt-10 flex flex-col text-white">
        {/* Creating the about page main section */}
        <div className="flex flex-col lg:flex-row items-center gap-5 mx-4 sm:mx-10">
          {/* Our motto section */}
          <section className="w-full lg:w-1/2 space-y-5 sm:space-y-10">
            <h1 className="text-3xl sm:text-5xl text-yellow-500 font-semibold">
              Affordable and Quality Education
            </h1>
            <p className="text-base sm:text-xl text-gray-200">
              Our goal is to provide affordable and quality education to the world. We are providing a platform for aspiring teachers and students to share their creativity, skills, and knowledge to empower and contribute to the growth and wellness of mankind.
            </p>
          </section>

          {/* Our motto image section */}
          <div className="w-full lg:w-1/2">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0, 0, 0))",
              }}
              className="drop-shadow-2xl w-full h-auto"
              src={aboutMainImage}
              alt="About Main"
            />
          </div>
        </div>

        {/* Top personalities quotes section */}
        <div className="carousel mx-auto w-full lg:w-1/2 my-16">
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[10%] sm:px-[15%] text-center">
              {/* For personality image */}
              <img
                className="w-24 sm:w-40 rounded-full border-2 border-gray-400"
                src={nelsonMandela}
                alt="Nelson Mandela"
              />
              {/* For writing the quotes */}
              <p className="text-base sm:text-xl text-gray-200">
                "Education is the most powerful tool you can use to change the world."
              </p>
              {/* For personality name */}
              <h3 className="text-lg sm:text-2xl font-semibold">Nelson Mandela</h3>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide5" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>

          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[10%] sm:px-[15%] text-center">
              {/* For personality image */}
              <img
                className="w-24 sm:w-40 rounded-full border-2 border-gray-400"
                src={apj}
                alt="APJ Abdul Kalam"
              />
              {/* For writing the quotes */}
              <p className="text-base sm:text-xl text-gray-200">
                "Learning gives creativity, creativity leads to thinking, thinking provides knowledge, knowledge makes you great."
              </p>
              {/* For personality name */}
              <h3 className="text-lg sm:text-2xl font-semibold">A. P. J. Abdul Kalam</h3>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>

          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[10%] sm:px-[15%] text-center">
              {/* For personality image */}
              <img
                className="w-24 sm:w-40 rounded-full border-2 border-gray-400"
                src={einstein}
                alt="Einstein"
              />
              {/* For writing the quotes */}
              <p className="text-base sm:text-xl text-gray-200">
                "Education is not the learning of facts, but the training of the mind to think."
              </p>
              {/* For personality name */}
              <h3 className="text-lg sm:text-2xl font-semibold">Albert Einstein</h3>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide4" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>

          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[10%] sm:px-[15%] text-center">
              {/* For personality image */}
              <img
                className="w-24 sm:w-40 rounded-full border-2 border-gray-400"
                src={steveJobs}
                alt="Steve Jobs"
              />
              {/* For writing the quotes */}
              <p className="text-base sm:text-xl text-gray-200">
                "Innovation distinguishes between a leader and a follower."
              </p>
              {/* For personality name */}
              <h3 className="text-lg sm:text-2xl font-semibold">Steve Jobs</h3>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide5" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>

          <div id="slide5" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[10%] sm:px-[15%] text-center">
              {/* For personality image */}
              <img
                className="w-24 sm:w-40 rounded-full border-2 border-gray-400"
                src={billGates}
                alt="Bill Gates"
              />
              {/* For writing the quotes */}
              <p className="text-base sm:text-xl text-gray-200">
                "Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important."
              </p>
              {/* For personality name */}
              <h3 className="text-lg sm:text-2xl font-semibold">Bill Gates</h3>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
