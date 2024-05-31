import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../Components/CourseCard";
import Layout from "../../Layout/Layout";
import { getAllCourses } from "../../Redux/courseSlice";

const Courses = () => {
  const dispatch = useDispatch();
  const { coursesData } = useSelector((state) => state.course);

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
    })();
  }, []);

  return (
    <Layout>
      {/* courses container for displaying the cards */}
      <div className="min-h-[90vh] pt-10 pl-10 sm:pl-20 flex flex-col flex-wrap gap-10 text-white">
        <h1 className="text-center text-2xl sm:text-3xl font-semibold flex flex-col sm:flex-row sm:flex sm:text-center sm:justify-center">
          Explore the courses made by{" "}
          <span className="font-bold ml-2 mt-1 sm:text-2xl text-xl text-yellow-500">Industry Experts</span>
        </h1>

        {/* wrapper for courses card */}
        <div className="mb-10 flex flex-wrap gap-14">
          {coursesData?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
