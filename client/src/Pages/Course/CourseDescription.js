import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";

const CourseDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
  const status = localStorage.getItem("subStatus");

  useEffect(() => {
    // scroll to the top on page render
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* wrapper for course description */}
      <div className="min-h-screen pt-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-white">
        {/* displaying the course details */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 py-10 relative">
          {/* creating the left side of description box */}
          <div className="space-y-6">
            <img
              className="w-full h-64 object-cover"
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
            />
            {/* course details */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xl">
                <div>
                  <p className="font-semibold">
                    <span className="text-yellow-500 font-bold">Total Lectures:</span>{" "}
                    {state.numberOfLectures}
                  </p>
                  <p className="font-semibold">
                    <span className="text-yellow-500 font-bold">Instructor:</span>{" "}
                    {state.createdBy}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {role === "ADMIN" && (
                    <>
                      <button
                        onClick={() =>
                          navigate("/course/displaylectures", { state: { ...state } })
                        }
                        className="bg-yellow-600 text-lg sm:text-xl rounded-md font-bold px-4 py-2 w-1/2 sm:w-auto mr-1 hover:bg-yellow-500 transition-all ease-in-out duration-300"
                      >
                        Watch Lectures
                      </button>
                      <button
                        onClick={() => navigate("/live", { state: { ...state } })}
                        className="bg-yellow-600 text-lg sm:text-xl rounded-md font-bold px-4 py-2 w-1/2 sm:w-auto hover:bg-yellow-500 transition-all ease-in-out duration-300"
                      >
                        Start Class
                      </button>
                    </>
                  )}
                  {role === "USER" && (
                    <>
                      {status === "active" ? (
                        <>
                          <button
                            onClick={() =>
                              navigate("/course/displaylectures", { state: { ...state } })
                            }
                            className="bg-yellow-600 text-lg sm:text-xl rounded-md font-bold px-4 py-2 w-1/2 sm:w-auto mr-1 hover:bg-yellow-500 transition-all ease-in-out duration-300"
                          >
                            Start Learning
                          </button>
                          <button
                            onClick={() => navigate("/live", { state: { ...state } })}
                            className="bg-yellow-600 text-lg sm:text-xl rounded-md font-bold px-4 py-2 w-1/2 sm:w-auto hover:bg-yellow-500 transition-all ease-in-out duration-300"
                          >
                            Join Class
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => navigate("/checkout")}
                          className="bg-yellow-600 text-lg sm:text-xl rounded-md font-bold px-4 py-2 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                        >
                          Subscribe to Course
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* creating the right section of description box */}
          <div className="space-y-4 text-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 text-center mb-4">
              {state.title}
            </h1>

            <p className="text-yellow-500 font-bold">Course Description:</p>

            <p className="whitespace-pre-wrap">{state.description}</p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default CourseDescription;
