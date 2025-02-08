"use client";
import Job from "@/components/Job";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";

const BrowseJobs = () => {
  const { allJobs } = useSelector((state) => state.job);
  useGetAllJobs(); // Use the hook to fetch jobs

  return (
    <div className="wrapper my-10 px-2 xl:px-0">
      <h2 className="font-bold text-2xl md:text-3xl my-10 text-center md:text-left">
        Search Results ({allJobs.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs?.map((job) => (
          <Job key={job?._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default BrowseJobs;
