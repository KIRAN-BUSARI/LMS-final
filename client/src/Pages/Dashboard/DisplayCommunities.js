import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import {
    deleteCommunity,
    getCommunity,
} from "../../Redux/communitiesSlice";

const DisplayCommunities = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for getting the data from location of previous component
    const communityDetails = useLocation().state;
    const { communities } = useSelector((state) => state.community);
    const { role } = useSelector((state) => state.auth);

    // to play the video accordingly
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    // function to handle lecture delete
    const handleLectureDelete = async (communityId, communitiesId) => {
        const data = { communityId, communitiesId };
        await dispatch(deleteCommunity(data));
        await dispatch(getCommunity(communityDetails._id));
    };

    // fetching the course lecture data
    useEffect(() => {
        (async () => {
            await dispatch(getCommunity(communityDetails._id));
        })();
    }, []);
    return (
        <Layout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
                {/* displaying the course name */}

                <h1 className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name : {communityDetails?.title}
                </h1>

                <div className="flex justify-center gap-10 w-full">
                    {/* left section for playing the video and displaying course details to admin */}
                    <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        <video
                            className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            src={communities && communities[currentVideoIndex]?.lecture?.secure_url}
                            controls
                            disablePictureInPicture
                            muted
                            controlsList="nodownload"
                        ></video>
                        <div>
                            <h1>
                                <span className="text-yellow-500">Title : </span>
                                {communities && communities[currentVideoIndex]?.title}
                            </h1>
                            <p>
                                {" "}
                                <span className="text-yellow-500 line-clamp-4">
                                    Description :{" "}
                                </span>
                                {communities && communities[currentVideoIndex]?.description}
                            </p>
                        </div>
                    </div>

                    {/* right section for displaying all the communities of the course */}
                    <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                        <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                            <p>communities List</p>
                            {role === "ADMIN" && (
                                <button
                                    onClick={() =>
                                        navigate("/course/addlecture", {
                                            state: { ...communityDetails },
                                        })
                                    }
                                    className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                                >
                                    Add New Lecture
                                </button>
                            )}
                        </li>
                        {communities &&
                            communities.map((element, index) => {
                                return (
                                    <li className="space-y-2" key={element._id}>
                                        <p
                                            className="cursor-pointer"
                                            onClick={() => setCurrentVideoIndex(index)}
                                        >
                                            <span className="text-yellow-500">
                                                {" "}
                                                Lecture {index + 1} :{" "}
                                            </span>
                                            {element?.title}
                                        </p>
                                        {role === "ADMIN" && (
                                            <button
                                                onClick={() =>
                                                    handleLectureDelete(communityDetails?._id, element?._id)
                                                }
                                                className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                                            >
                                                Delete Lecture
                                            </button>
                                        )}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default DisplayCommunities;
