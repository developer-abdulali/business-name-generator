"use client";

import { JOB_API_ENDPOINT } from "@/lib/constant";
import { setAllRecruiterJobs } from "@/redux/slices/jobSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllRecruiterJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllRecruiterJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getrecruiterjobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllRecruiterJobs(res.data.jobs));
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllRecruiterJobs();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllRecruiterJobs;
