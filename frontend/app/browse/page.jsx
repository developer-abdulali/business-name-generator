"use client";
import Job from "@/components/Job";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";

const BrowseJobs = () => {
  const { allJobs } = useSelector((state) => state.job);
  useGetAllJobs(); // Use the hook to fetch jobs

  return (
    <div className="wrapper my-10">
      <h2 className="font-bold text-xl my-10">
        Search Results ({allJobs.length})
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {allJobs?.map((job) => {
          return <Job key={job?._id} job={job} />;
        })}
      </div>
    </div>
  );
};
export default BrowseJobs;
