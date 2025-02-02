"use client";
import { APPLICATION_API_ENDPOINT } from "@/lib/constant";
import { setAllAppliedJobs } from "@/redux/slices/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchAppliedJobs();
  }, []);
};
export default useGetAppliedJobs;
