import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { getUserData } from "../../Redux/authSlice";
import { cancelCourseBundle } from "../../Redux/razorpaySlice";

const Profile = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state?.auth?.data);
  // function to handle the cancel subscription of course
  const handleCourseCancelSubscription = async () => {
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
  };

  useEffect(() => {
    // getting user details
    dispatch(getUserData());
  }, []);
  return (
    <Layout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 border border-[#0095ff] shadow-[#0095ff] rounded-lg p-4 text-white w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/5 xl:w-1/5 2xl:w-1/5">
          <img
            className="w-40 mx-auto rounded-full border border-white"
            src={userData?.avatar?.secure_url}
            alt="user profile image"
          />

          <h3 className="text-xl font-semibold text-center capitalize">
            {userData.fullName}
          </h3>

          <div className="grid grid-cols-2">
            <p>Email :</p>
            <p>{userData?.email}</p>
            <p>Role :</p>
            <p>{userData?.role}</p>
            <p>Subscription :</p>
            <p>
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          {/* button to change the password */}
          <div className="flex items-center justify-between gap-2">
            <Link
              to={
                userData?.email === "test@gmail.com"
                  ? "/denied"
                  : "/changepassword"
              }
              className="w-1/2 border border-[#0095ff] text-[#ff7070] hover:border-[#ff7070] hover:text-[#ff4a4a] transition-all ease-in-out duration-300 rounded-sm py-2 px-3  font-semibold cursor-pointer text-center"
            >
              <button>Change Password</button>
            </Link>

            <Link
              to={
                userData?.email === "test@gmail.com"
                  ? "/denied"
                  : "/user/editprofile"
              }
              className="w-1/2 border border-[#0095ff] text-[#ff7070] hover:border-[#ff7070] hover:text-[#ff4a4a] transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              <button>Edit Profile</button>
            </Link>
          </div>

          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCourseCancelSubscription}
              className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
