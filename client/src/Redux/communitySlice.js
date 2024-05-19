import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance";

const initialState = {
    communitiesData: [],
};

export const getAllCommunities = createAsyncThunk("/community/get", async () => {
    try {
        const res = axiosInstance.get("/communities");

        toast.promise(res, {
            loading: "Loading Commiunity data...",
            success: "Communities loaded successfully",
            error: "Failed to get Communities",
        });

        const response = await res;

        return response.data.communities;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const createNewCommunity = createAsyncThunk("/get/communities",
    async (data) => {
        try {
            // creating the form data from user data
            let formData = new FormData();
            formData.append("title", data?.title);
            formData.append("category", data?.category);
            formData.append("description", data?.description);
            formData.append("thumbnail", data?.thumbnail);

            const res = axiosInstance.post("/communities", formData);

            toast.promise(res, {
                loading: "Creating the Comunity...",
                success: "Community created successfully",
                error: "Failed to create Commmunity",
            });

            const response = await res;
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
);

export const deleteCommunity = createAsyncThunk("/community/delete", async (id) => {
    try {
        const res = axiosInstance.delete(`communities/${id}`);

        toast.promise(res, {
            loading: "Deleting the Community...",
            success: "Community deleted successfully",
            error: "Failed to delete Community",
        });

        const response = await res;

        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const updateCommunity = createAsyncThunk("/community/update", async (data) => {
    try {
        // creating the form data from user data
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("category", data.category);
        formData.append("description", data.description);
        // backend is not allowing change of thumbnail
        if (data.thumbnail) {
            formData.append("thumbnail", data.thumbnail);
        }

        const res = axiosInstance.put(`/communities/${data.id}`, {
            title: data.title,
            category: data.category,
            description: data.description,
        });

        toast.promise(res, {
            loading: "Updating the Community...",
            success: "Community updated successfully",
            error: "Failed to update Community",
        });

        const response = await res;
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
});

const communitySlice = createSlice({
    name: "community",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCommunities.fulfilled, (state, action) => {
            if (action.payload) {
                state.communitiesData = [...action.payload];
            }
        });
    },
});

export const { } = communitySlice.actions;
export default communitySlice.reducer;




// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";
// import axiosInstance from "../Helper/axiosInstance";

// const initialState = {
//     communitiesData: [],
// };

// export const getAllCommunities = createAsyncThunk(
//     "/community/get",
//     async (_, { rejectWithValue }) => {
//         try {
//             const res = await axiosInstance.get("/communities");
//             toast.success("Communities loaded successfully");
//             return res.data.communities;
//         } catch (error) {
//             toast.error(error?.response?.data?.message);
//             return rejectWithValue(error?.response?.data?.message);
//         }
//     }
// );

// export const createNewCommunity = createAsyncThunk(
//     "/get/communities",
//     async (data, { rejectWithValue }) => {
//         try {
//             let formData = new FormData();
//             formData.append("title", data?.title);
//             formData.append("createdBy", data?.createdBy);
//             formData.append("category", data?.category);
//             formData.append("description", data?.description);
//             formData.append("thumbnail", data?.thumbnail);

//             const res = await axiosInstance.post("/communities", formData);
//             toast.success("Community created successfully");
//             return res.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.message);
//             return rejectWithValue(error?.response?.data?.message);
//         }
//     }
// );

// export const deleteCommunity = createAsyncThunk(
//     "/community/delete",
//     async (id, { rejectWithValue }) => {
//         try {
//             const res = await axiosInstance.delete(`communities/${id}`);
//             toast.success("Community deleted successfully");
//             return res.data;
//         } catch (error) {
//             toast.error(error?.response?.data?.message);
//             return rejectWithValue(error?.response?.data?.message);
//         }
//     }
// );

// const communitySlice = createSlice({
//     name: "community",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getAllCommunities.fulfilled, (state, action) => {
//             if (action.payload) {
//                 state.communitiesData = [...action.payload];
//             }
//         });
//     },
// });

// export default communitySlice.reducer;