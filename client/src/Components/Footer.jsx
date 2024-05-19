import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { FaFacebook, FaFacebookF, FaFacebookSquare } from "react-icons/fa"
import { FaXTwitter, FaSquareXTwitter, FaSquareFacebook } from 'react-icons/fa6';
const Footer = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
    <>
      {/* adding the footer */}
      <footer className="relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between sm:px-20 text-[#0095ff] bg-black">
        {/* adding copyright section */}
        <section className="text-lg">
          Copyright {year} | All Rights Reserved
        </section>

        {/* adding the social media section */}
        <section className="flex items-center justify-center gap-5 text-2xl text-[#0095ff]">
          <a
            className="hover:text-[#3b5998] text-3xl transition-all ease-in-out duration-300"
            href="https://facebook.com/" target="_blank" rel="noreferrer">
            {/* <BsFacebook /> */}
            <FaFacebookSquare />
          </a>
          <a
            className="hover:text-[#d62976] transition-all ease-in-out duration-300"
            href="https://instagram.com/" target="_blank" rel="noreferrer">
            <BsInstagram />
          </a>
          <a
            className="hover:text-[#007bb5] transition-all ease-in-out duration-300"
            href="https://twitter.com" target="_blank" rel="noreferrer">
            {/* <BsTwitter/> */}
            <FaXTwitter />
            {/* <FaSquareXTwitter/> */}
          </a>
          <a
            className="hover:text-[#0072b1] transition-all ease-in-out duration-300"
            href="https://linkedin.com/" target="_blank" rel="noreferrer">
            <BsLinkedin />
          </a>
        </section>
      </footer>
    </>
  );
};

export default Footer;
