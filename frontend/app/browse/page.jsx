"use client";
import JobCard from "@/components/JobCard";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/slices/jobSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BrowseJobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((state) => state.job);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <section className="wrapper my-10 px-4 sm:px-6 xl:px-0">
      <h2 className="font-bold text-2xl md:text-3xl my-10 text-center md:text-left text-gray-900 dark:text-gray-100">
        Search Results ({allJobs.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs?.map((job) => (
          <JobCard key={job?._id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default BrowseJobs;
