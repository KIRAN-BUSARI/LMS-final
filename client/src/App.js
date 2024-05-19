import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import CourseList from "./Pages/Course/CourseList";
import NotFound from "./Pages/NotFound";
import HomePage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Checkout from "./Pages/Payment/Checkout";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess";
import CheckoutFail from "./Pages/Payment/CheckoutFail";
import ForgetPassword from "./Pages/Password/ForgetPassword";
import ResetPassword from "./Pages/Password/ResetPassword";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import CourseDescription from "./Pages/Course/CourseDescription";
import Profile from "./Pages/User/Profile";
import ChangePassword from "./Pages/Password/ChangePassword";
import EditProfile from "./Pages/User/EditProfile";
import CreateCourse from "./Pages/Course/CreateCourse";
import AddLecture from "./Pages/Dashboard/AddLecture";
import DisplayLectures from "./Pages/Dashboard/DisplayLectures";
import RequireAuth from "./Components/Auth/RequireAuth";
import NotRequireAuth from "./Components/Auth/NotRequireAuth";
import Denied from "./Pages/Denied";
import Home from './Pages/Home/index'
import RoomPage from "./Pages/Room";
import CreateCommunity from "./Pages/Communities/CreateCommunity";
import CommunityList from "./Pages/Communities/CommunityList";
import DisplayCommunities from './Pages/Dashboard/DisplayCommunities'
import CommunityDescription from "./Pages/Communities/CommunityDescription";
import Editor from "./Editor";
import CreateTodo from "./Pages/Todo/CreateTodo";
import Todos from "./Pages/Todo/Todos";
import { InputBox } from "./Components/InputBox";
import RoadMap from "./Pages/RoadMap/RoadMap";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/communities" element={<CommunityList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        <Route element={<NotRequireAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}>
          <Route path="/live" element={<Home />} />
          <Route path="/community/description" element={<CommunityDescription />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
          <Route path="/course/description" element={<CourseDescription />} />
          <Route path="/codeEditor" element={<Editor />} />
          <Route path="/community/description" element={<CommunityDescription />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFail />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/course/displaylectures" element={<DisplayLectures />} />
          <Route path="/createTodo" element={<CreateTodo />} />
          <Route path="/allTodos" element={<Todos />} />
          <Route path="/community/displaycommunities" element={<DisplayCommunities />} />
          <Route path="/chatbot" element={<InputBox />} />
          <Route path="/roadmap" element={<RoadMap />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/course/addlecture" element={<AddLecture />} />
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/community/create" element={<CreateCommunity />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
