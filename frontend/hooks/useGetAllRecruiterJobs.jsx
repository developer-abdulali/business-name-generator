"use client";

import { JOB_API_ENDPOINT } from "@/lib/constant";
import { setAllRecruiterJobs } from "@/redux/slices/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllRecruiterJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllRecruiterJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getrecruiterjobs`, {
          withCredentials: true,
        });
        if (res.data.success) dispatch(setAllRecruiterJobs(res.data.jobs));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllRecruiterJobs();
  }, []);
};
export default useGetAllRecruiterJobs;
