import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../Redux/authSlice";
import courseSliceReducer from "../Redux/courseSlice";
import lectureSliceReducer from "../Redux/lectureSlice";
import razorpaySliceReducer from "./razorpaySlice";
import statSliceReducer from "./statSlice";
import communitySliceReducer from '../Redux/communitySlice'
import communitiesSliceReducer from '../Redux/communitiesSlice'
const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    community: communitySliceReducer,
    communities: communitiesSliceReducer,
    course: courseSliceReducer,
    lecture: lectureSliceReducer,
    razorpay: razorpaySliceReducer,
    stat: statSliceReducer,
  },
});

export default store;
