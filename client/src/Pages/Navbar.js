import React from 'react'
import './Navbar.css'

export default function Navbar() {
    return (
        <>
            <div className="header">
                <nav className='fixed'>
                    <h2><a className='text-xl font-sans font-bold text-[#0095ff] hover:text-white cursor-pointer' href='/'>Knowly.!</a></h2>
                    <ul>
                        <li><a href="/about">ABOUT</a></li>
                        <li><a href="/courses">COURSES</a></li>
                        <li><a href="/communities">COMMUNITIES</a></li>
                        <li><a href="/support">SUPPORT</a></li>
                        {/* <li><a href="/store">STORE</a></li> */}
                    </ul>
                    <a href='/login'><button className='bg-[#fff] text-[#0095ff] py-0 mr-5'>Signin</button></a>
                </nav>
            </div>
        </>
    )
}