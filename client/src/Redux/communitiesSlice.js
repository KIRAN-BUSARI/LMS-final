import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance";

const initialState = {
    communities: [],
};

// function to get all the lectures
export const getCommunity = createAsyncThunk(
    "/community/communities/get",
    async (communityId) => {
        try {
            const res = axiosInstance.get(`/communities/${communityId}`);

            toast.promise(res, {
                loading: "Fetching the Communities...",
                success: "Communities fetched successfully",
                error: "Failed to fetch Communities",
            });

            const response = await res;
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
);

// function to add new lecture to the course
export const addCommunity = createAsyncThunk(
    "/community/communities/add",
    async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        // formData.append('createdBy', data.createdBy);
        // formData.append('category', data.category);
        formData.append("description", data.description);

        try {
            const res = axiosInstance.post(`/communities/${data.id}`, formData);

            toast.promise(res, {
                loading: "Adding the communities...",
                success: "communities added successfully",
                error: "Failed to add communities",
            });

            const response = await res;

            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
);

// function to delete the lecture from the course
export const deleteCommunity = createAsyncThunk(
    "/community/communities/delete",
    async (data) => {
        console.log(data);
        try {
            const res = axiosInstance.delete(
                `/communities/?communityId=${data.communityId}&communitiesId=${data.communitiesId}`
            );

            toast.promise(res, {
                loading: "Deleting the communities...",
                success: "communities deleted successfully",
                error: "Failed to delete communities",
            });

            const response = await res;
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
);

const communitiesSlice = createSlice({
    name: "communities",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCommunity.fulfilled, (state, action) => {
                state.communities = action?.payload?.communities;
            })
            .addCase(addCommunity.fulfilled, (state, action) => {
                state.communities = action?.payload?.community?.communities;
            });
    },
});

export const { } = communitiesSlice.actions;
export default communitiesSlice.reducer;




// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";
// import axiosInstance from "../Helper/axiosInstance";

// const initialState = {
//     communities: [],
// };

// export const getCommunity = createAsyncThunk(
//     "/community/communities/get",
//     async (communityId, { rejectWithValue }) => {
//         try {
//             const res = await axiosInstance.get(`/communities/${communityId}`);
//             toast.success("Communities fetched successfully");
//             return res.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.message);
//             return rejectWithValue(error?.response?.data?.message);
//         }
//     }
// );

// export const addCommunity = createAsyncThunk(
//     "/community/communities/add",
//     async (data, { rejectWithValue }) => {
//         const formData = new FormData();
//         formData.append("title", data.title);
//         formData.append("createdBy", data.createdBy);
//         formData.append("category", data.category);
//         formData.append("description", data.description);

//         try {
//             const res = await axiosInstance.post(`/communities/${data.id}`, formData);
//             toast.success("Community added successfully");
//             return res.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.message);
//             return rejectWithValue(error?.response?.data?.message);
//         }
//     }
// );

// export const deleteCommunity = createAsyncThunk(
//     "/community/communities/delete",
//     async (data, { rejectWithValue }) => {
//         try {
//             const res = await axiosInstance.delete(
//                 `/communities/?communityId=${data.communityId}&communitiesId=${data.communitiesId}`
//             );
//             toast.success("Community deleted successfully");
//             return res.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.message);
//             return rejectWithValue(error?.response?.data?.message);
//         }
//     }
// );

// const communitiesSlice = createSlice({
//     name: "communities",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getCommunity.fulfilled, (state, action) => {
//                 state.communities = action.payload.communities;
//             })
//             .addCase(addCommunity.fulfilled, (state, action) => {
//                 state.communities = action.payload.community.communities;
//             });
//     },
// });

// export default communitiesSlice.reducer;


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";
// import axiosInstance from "../Helper/axiosInstance";

// const initialState = {
//     communitiesData: [],
// };

// export const getAllCommunities = createAsyncThunk("/community/get", async () => {
//     try {
//         const res = await axiosInstance.get("/communities");

//         toast.promise(res, {
//             loading: "Loading Community data...",
//             success: "Communities loaded successfully",
//             error: "Failed to get Communities",
//         });

//         return res.data.communities;
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//         throw error; // Rethrow the error for handling in the component
//     }
// });

// export const createNewCommunity = createAsyncThunk(
//     "/get/communities",
//     async (data) => {
//         try {
//             let formData = new FormData();
//             formData.append("title", data?.title);
//             formData.append("createdBy", data?.createdBy);
//             formData.append("category", data?.category);
//             formData.append("description", data?.description);
//             formData.append("thumbnail", data?.thumbnail);

//             const res = await axiosInstance.post("/communities", formData);

//             toast.promise(res, {
//                 loading: "Creating the Community...",
//                 success: "Community created successfully",
//                 error: "Failed to create Community",
//             });

//             return res.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.message);
//             throw error; // Rethrow the error for handling in the component
//         }
//     }
// );

// // Define more thunks as needed (e.g., deleteCommunity, updateCommunity)

// const communitySlice = createSlice({
//     name: "community",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getAllCommunities.fulfilled, (state, action) => {
//             state.communitiesData = action.payload;
//         });
//     },
// });

// export const { } = communitySlice.actions;
// export default communitySlice.reducer;