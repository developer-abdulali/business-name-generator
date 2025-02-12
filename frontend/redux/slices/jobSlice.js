import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allRecruiterJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload || [];
    },
    setAllRecruiterJobs: (state, action) => {
      state.allRecruiterJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    clearAllAppliedJobs: (state) => {
      state.allAppliedJobs = [];
    },
    setDeleteJob: (state, action) => {
      const jobId = action.payload;
      state.allJobs = state.allJobs.filter((job) => job._id !== jobId);
      state.allRecruiterJobs = state.allRecruiterJobs.filter(
        (job) => job._id !== jobId
      );
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllRecruiterJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  clearAllAppliedJobs,
  setDeleteJob,
} = jobSlice.actions;

export default jobSlice.reducer;
