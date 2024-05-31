// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Layout from "../../Layout/Layout";
// import {
//   deleteCourseLecture,
//   getCourseLecture,
// } from "../../Redux/lectureSlice";

// const DisplayLectures = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // for getting the data from location of previous component
//   const courseDetails = useLocation().state;
//   const { lectures } = useSelector((state) => state.lecture);
//   const { role } = useSelector((state) => state.auth);

//   // to play the video accordingly
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

//   // function to handle lecture delete
//   const handleLectureDelete = async (courseId, lectureId) => {
//     const data = { courseId, lectureId };
//     await dispatch(deleteCourseLecture(data));
//     await dispatch(getCourseLecture(courseDetails._id));
//   };

//   // fetching the course lecture data
//   useEffect(() => {
//     (async () => {
//       await dispatch(getCourseLecture(courseDetails._id));
//     })();
//   }, []);
//   return (
//     <Layout>
//       <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
//         {/* displaying the course name */}

//         <h1 className="text-center text-2xl font-semibold text-yellow-500">
//           Course Name : {courseDetails?.title}
//         </h1>

//         <div className="flex flex-col sm:flex-row justify-center gap-10 w-full">
//           {/* left section for playing the video and displaying course details to admin */}
//           <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
//             <video
//               className="object-fill rounded-tl-lg rounded-tr-lg w-full"
//               src={lectures && lectures[currentVideoIndex]?.lecture?.secure_url}
//               controls
//               disablePictureInPicture
//               muted
//               controlsList="nodownload"
//             ></video>
//             <div>
//               <h1>
//                 <span className="text-yellow-500">Title : </span>
//                 {lectures && lectures[currentVideoIndex]?.title}
//               </h1>
//               <p>
//                 {" "}
//                 <span className="text-yellow-500 line-clamp-4">
//                   Description :{" "}
//                 </span>
//                 {lectures && lectures[currentVideoIndex]?.description}
//               </p>
//             </div>
//             <div>
//               <Link target="_blank" to={"/codeEditor"} className="text-white">
//                 Start Coding
//               </Link>
//             </div>

//           </div>

//           {/* right section for displaying all the lectures of the course */}
//           <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
//             <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
//               <p>Lectures List</p>
//               {role === "ADMIN" && (
//                 <button
//                   onClick={() =>
//                     navigate("/course/addlecture", {
//                       state: { ...courseDetails },
//                     })
//                   }
//                   className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
//                 >
//                   Add New Lecture
//                 </button>
//               )}
//             </li>
//             {lectures &&
//               lectures.map((element, index) => {
//                 return (
//                   <li className="space-y-2" key={element._id}>
//                     <p
//                       className="cursor-pointer"
//                       onClick={() => setCurrentVideoIndex(index)}
//                     >
//                       <span className="text-yellow-500">
//                         {" "}
//                         Lecture {index + 1} :{" "}
//                       </span>
//                       {element?.title}
//                     </p>
//                     {role === "ADMIN" && (
//                       <button
//                         onClick={() =>
//                           handleLectureDelete(courseDetails?._id, element?._id)
//                         }
//                         className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
//                       >
//                         Delete Lecture
//                       </button>
//                     )}
//                   </li>
//                 );
//               })}
//           </ul>
//           <div>
//             <Link target="_blank" to={"/createTodo"} className="text-white">
//               Create a Note
//             </Link>
//           </div>
//           <div>
//             <Link to={"/roadmap"}>
//               Generate RoadMap
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default DisplayLectures;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { deleteCourseLecture, getCourseLecture } from "../../Redux/lectureSlice";

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courseDetails = useLocation().state;
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleLectureDelete = async (courseId, lectureId) => {
    const data = { courseId, lectureId };
    await dispatch(deleteCourseLecture(data));
    await dispatch(getCourseLecture(courseDetails._id));
  };

  useEffect(() => {
    (async () => {
      await dispatch(getCourseLecture(courseDetails._id));
    })();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-3xl font-bold text-yellow-500 mb-8">
          {courseDetails?.title}
        </h1>

        <div className="flex flex-col lg:flex-row justify-center gap-10 w-full">
          <div className="bg-gray-900 p-5 rounded-lg shadow-lg w-full lg:w-[28rem]">
            <video
              className="object-fill rounded-lg w-full mb-5"
              src={lectures && lectures[currentVideoIndex]?.lecture?.secure_url}
              controls
              disablePictureInPicture
              muted
              controlsList="nodownload"
            ></video>
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-yellow-500 mb-2">
                {lectures && lectures[currentVideoIndex]?.title}
              </h2>
              <p className="text-gray-300">
                {lectures && lectures[currentVideoIndex]?.description}
              </p>
            </div>
            <div className="text-center">
              <Link
                target="_blank"
                to={"/codeEditor"}
                className="inline-block bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
              >
                Start Coding
              </Link>
            </div>
          </div>

          <ul className="bg-gray-900 p-5 rounded-lg shadow-lg w-full lg:w-[28rem]">
            <li className="font-semibold text-2xl text-yellow-500 mb-5 flex items-center justify-between">
              <p>Lectures List</p>
              {role === "ADMIN" && (
                <button
                  onClick={() =>
                    navigate("/course/addlecture", {
                      state: { ...courseDetails },
                    })
                  }
                  className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
                >
                  Add New Lecture
                </button>
              )}
            </li>
            {lectures &&
              lectures.map((element, index) => (
                <li
                  className="mb-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-300"
                  key={element._id}
                  onClick={() => setCurrentVideoIndex(index)}
                >
                  <div className="flex justify-between items-center">
                    <p>
                      <span className="text-yellow-500 font-bold">
                        Lecture {index + 1}:
                      </span>{" "}
                      {element?.title}
                    </p>
                    {role === "ADMIN" && (
                      <button
                        onClick={() =>
                          handleLectureDelete(courseDetails?._id, element?._id)
                        }
                        className="bg-red-500 text-gray-900 font-bold py-1 px-2 rounded hover:bg-red-400 transition duration-300"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-center mt-6 w-full lg:w-auto">
          <Link
            target="_blank"
            to={"/createTodo"}
            className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
          >
            Create a Note
          </Link>
          <Link
            to={"/roadmap"}
            className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
          >
            Generate RoadMap
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default DisplayLectures;
