import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    savedJobs: [],
    allRecruiterJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload || [];
    },
    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload || [];
    },
    clearSavedJobs: (state) => {
      state.savedJobs = [];
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
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setDeleteJob: (state, action) => {
      state.allJobs = state.allJobs.filter((job) => job._id !== action.payload);
    },
  },
});

export const {
  setAllJobs,
  setSavedJobs,
  clearSavedJobs,
  setSingleJob,
  setAllRecruiterJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  clearAllAppliedJobs,
  setSearchedQuery,
  setDeleteJob,
} = jobSlice.actions;

export default jobSlice.reducer;
