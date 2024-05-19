import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
const Home = () => {
    const [Roomcode, setRoomcode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (ev) => {
        ev.preventDefault()
        navigate(`/room/${Roomcode}`);
    }
    return (
        <Layout>
            <div className="h-[100vh] flex justify-center items-center">
                <div className="h-[30vh] w-[30vw] flex items-center justify-center border border-black shadow-2xl">
                    <form onSubmit={handleSubmit} className="block">
                        <div>
                            <label className="block text-3xl text-white">Enter Room Code: </label>
                            <input type="text" value={Roomcode} onChange={(e) => setRoomcode(e.target.value)} required placeholder="Enter your room code" className="w-[100%] p-2 m-2 bg-white text-black" />
                            <button type="submit" className="bg-white p-2 rounded-xl text-blue-500 font-bold">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Home;