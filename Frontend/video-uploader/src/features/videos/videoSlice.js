import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
  const response = await axiosInstance.get("/videos/");
  return response.data;
});

export const uploadVideo = createAsyncThunk("videos/uploadVideo", async (file, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosInstance.post("/upload/", formData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    status: "idle",
    error: null,
    uploadStatus: "idle",
    uploadError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(uploadVideo.pending, (state) => {
        state.uploadStatus = "loading";
      })
      .addCase(uploadVideo.fulfilled, (state) => {
        state.uploadStatus = "succeeded";
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.uploadError = action.payload;
      });
  },
});

export default videoSlice.reducer;
