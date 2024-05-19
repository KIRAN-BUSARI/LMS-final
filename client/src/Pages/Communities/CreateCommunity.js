import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { createNewCommunity, updateCommunity } from "../../Redux/communitySlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CreateCommunity = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for getting the data from location of previous component
    const { initialCommunitiesData } = useLocation().state;

    // for toggling disable of image input box
    const [isDisabled, setIsDisabled] = useState(!initialCommunitiesData?.newCommunity);

    // for storing the user input
    const [userInput, setUserInput] = useState({
        title: initialCommunitiesData?.title,
        description: initialCommunitiesData?.description,
        category: initialCommunitiesData?.category,
        thumbnail: null,
        previewImage: initialCommunitiesData?.thumbnail?.secure_url,
    });

    // function to handle the image upload
    const getImage = (event) => {
        event.preventDefault();
        // getting the image
        const uploadedImage = event.target.files[0];
        console.log(uploadedImage);

        // if image exists then getting the url link of it
        if (uploadedImage) {
            // setUserInput({ ...userInput, thumbnail: uploadedImage });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage,
                });
            });
        }
    };

    // function to handle user input
    const handleUserInput = (event) => {
        const { name, value } = event.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });
    };

    // function to handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        let res = undefined;

        // for creating a new course
        if (initialCommunitiesData.newCommunity) {
            //   checking for the empty fields
            console.log(userInput);
            if (
                !userInput.title ||
                !userInput.description ||
                !userInput.category ||
                !userInput.thumbnail
            ) {
                toast.error("All fields are mandatory");
                return;
            }

            // calling the api
            res = await dispatch(createNewCommunity(userInput));
        }
        // for updating an existing course
        else {
            //   checking for the empty fields
            if (
                !userInput.title ||
                !userInput.description ||
                !userInput.category ||
                !userInput.thumbnail
            ) {
                toast.error("All fields are mandatory");
                return;
            }

            const data = { ...userInput, id: initialCommunitiesData._id };
            // calling the api
            res = await dispatch(updateCommunity(data));
        }

        // clearing the input fields
        if (res?.payload?.success) {
            setUserInput({
                title: "",
                description: "",
                category: "",
                thumbnail: undefined,
                previewImage: "",
            });

            setIsDisabled(false);

            // redirecting the user to admin dashboard
            navigate("/admin/dashboard");
        }
    };

    return (
        <Layout>
            <div className="flex items-center justify-center h-[100vh]">
                {/* card for creating the new card */}
                <form
                    onSubmit={handleFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] h-[450px] my-10 shadow-[0_0_10px_black] relative"
                >
                    <Link
                        to={"/admin/dashboard"}
                        className="absolute top-8 text-2xl link text-accent cursor-pointer"
                    >
                        <AiOutlineArrowLeft />
                    </Link>

                    <h1 className="text-center text-2xl font-bold">
                        {!initialCommunitiesData.newCommunity ? "Update" : "Create new"}{" "}
                        <span>Community</span>
                    </h1>

                    <main className="grid grid-cols-2 gap-x-10">
                        {/* for course basic details */}
                        <div className="space-y-6">
                            <div
                                onClick={() =>
                                    !initialCommunitiesData.newCommunity
                                        ? toast.error("Cannot update thumbnail image")
                                        : ""
                                }
                            >
                                {/* input for image file */}
                                <label className="cursor-pointer" htmlFor="image_uploads">
                                    {userInput.previewImage ? (
                                        <img
                                            className="w-full h-44 m-auto border"
                                            src={userInput.previewImage}
                                            alt="preview_image"
                                        />
                                    ) : (
                                        <div className="w-full h-44 m-auto flex items-center justify-center border">
                                            <h1 className="font-bold text-lg">
                                                Upload your Community thumbnail
                                            </h1>
                                        </div>
                                    )}
                                </label>
                                <input
                                    onChange={getImage}
                                    className="hidden"
                                    type="file"
                                    id="image_uploads"
                                    name="image_uploads"
                                    accept=".jpg, .jpeg, .png"
                                    disabled={isDisabled}
                                />
                            </div>

                            {/* adding the title section */}
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="title">
                                    Community Title
                                </label>
                                <input
                                    required
                                    type="name"
                                    name="title"
                                    id="title"
                                    placeholder="Enter the community title"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.title}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>

                        {/* for course description and go to profile button */}

                        {/* adding the course description */}
                        <div className="flex flex-col gap-1">
                            {/* adding the category */}
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="category">
                                    Community Category
                                </label>
                                <input
                                    required
                                    type="name"
                                    name="category"
                                    id="category"
                                    placeholder="Enter the category name"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.category}
                                    onChange={handleUserInput}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="description">
                                    Community Description
                                </label>
                                <textarea
                                    required
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Enter the community description"
                                    className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                                    value={userInput.description}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>
                    </main>

                    <button
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                        type="submit"
                    >
                        {!initialCommunitiesData.newCommunity ? "Update Community" : "Create Community"}
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default CreateCommunity;
