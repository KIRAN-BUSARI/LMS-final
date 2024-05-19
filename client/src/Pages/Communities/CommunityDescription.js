import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";

const CourseDescription = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { role, data } = useSelector((state) => state.auth);

    useEffect(() => {
        // scroll to the top on page render
        window.scrollTo(0, 0);
    }, []);

    return (
        <Layout>
            {/* wrapper for course description */}
            <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
                {/* displaying the course details */}
                <div className="grid grid-cols-2 gap-10 py-10 relative">
                    {/* creating the left side of description box */}
                    <div className="space-y-5">
                        <img
                            className="w-full h-64"
                            src={state?.thumbnail?.secure_url}
                            alt="thumbnail"
                        />
                        {/* course details */}
                        <div className="space-y-4">
                            {/* adding the subscribe button */}
                            {role === "ADMIN" || data?.subscription?.status === "active" ? (
                                <div className="block">
                                    <button
                                        onClick={() => navigate("/community/displaycommunities", {
                                            state: { ...state },
                                        })}
                                        className="bg-yellow-600 text-xl rounded-md font-bold px-4 py-2 w-full mr-1 hover:bg-yellow-500 transition-all ease-in-out duration-300">Watch Communities</button>
                                    {/* <button onClick={() => navigate('/live', {
                                        state: { ...state },
                                    })}
                                        className="bg-yellow-600 text-xl rounded-md font-bold px-4 py-2 w-[45%] hover:bg-yellow-500 transition-all ease-in-out duration-300"
                                    >Start Class</button> */}
                                </div>
                            ) : (
                                <button
                                    onClick={() => navigate("/checkout")}
                                    className="bg-yellow-600 text-xl rounded-md font-bold px-4 py-2 w-full mr-1 hover:bg-yellow-500 transition-all ease-in-out duration-300">Join the Community</button>
                            )}
                        </div>
                    </div>

                    {/* creating the right section of description box */}
                    <div className="space-y-2 text-xl">
                        <h1 className="text-3xl font-bold text-yellow-500 text-center mb-4">
                            {state.title}
                        </h1>

                        <p className="text-yellow-500 font-bold">Community Description :</p>

                        <p>{state.description}</p>
                    </div>
                </div>
            </div >
        </Layout >
    );
};

export default CourseDescription;
