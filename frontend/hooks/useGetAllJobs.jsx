"use client";

import { JOB_API_ENDPOINT } from "@/lib/constant";
import { setAllJobs } from "@/redux/slices/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const { searchedQuery } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  const fetchAllJobs = async () => {
    try {
      const res = await axios.get(`${JOB_API_ENDPOINT}/get`, {
        withCredentials: true,
      });
      console.log("All JOBS", res);
      if (res.data.success) {
        dispatch(setAllJobs(res.data.jobs));
      } else {
        dispatch(setAllJobs([]));
      }
    } catch (error) {
      dispatch(setAllJobs([]));
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, [searchedQuery, dispatch]);

  return { fetchAllJobs };
};

export default useGetAllJobs;
