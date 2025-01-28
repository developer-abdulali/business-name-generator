"use client";

import { JOB_API_ENDPOINT } from "@/lib/constant";
import { useEffect } from "react";

const useGetAllJobs = () => {
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await fetch(`${JOB_API_ENDPOINT}/`);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
};
export default useGetAllJobs;
$;
