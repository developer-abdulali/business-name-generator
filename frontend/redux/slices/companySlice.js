import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    searchCompanyByText: "",
    searchCompanyByLocation: "",
  },
  reducers: {
    // actions
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    deleteCompany: (state, action) => {
      state.companies = state.companies.filter(
        (company) => company._id !== action.payload
      );
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
    setSearchCompanyByLocation: (state, action) => {
      state.searchCompanyByLocation = action.payload;
    },
  },
});

export const {
  setSingleCompany,
  setCompanies,
  deleteCompany,
  setSearchCompanyByText,
  setSearchCompanyByLocation,
} = companySlice.actions;

export default companySlice.reducer;
