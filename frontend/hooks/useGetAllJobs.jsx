// "use client";

import { JOB_API_ENDPOINT } from "@/lib/constant";
import { setAllJobs } from "@/redux/slices/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = (applySearch = false) => {
  const { searchJobByText } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  const fetchAllJobs = async () => {
    try {
      const keyword = applySearch ? encodeURIComponent(searchJobByText) : "";
      const res = await axios.get(
        `${JOB_API_ENDPOINT}/get?keyword=${keyword}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setAllJobs(res.data.jobs));
      } else {
        dispatch(setAllJobs([]));
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      dispatch(setAllJobs([]));
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, [applySearch, searchJobByText, dispatch]);

  return { fetchAllJobs };
};

export default useGetAllJobs;
