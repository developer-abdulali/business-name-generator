"use client";
import JobCard from "@/components/JobCard";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/redux/slices/jobSlice";

const BrowseJobs = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery) {
      dispatch(setSearchJobByText(searchQuery));
    }
  }, [searchQuery, dispatch]);

  useGetAllJobs(true); // Fetch jobs with the search query
  const { allJobs } = useSelector((state) => state.job);

  return (
    <section className="wrapper my-10 px-4 sm:px-6 xl:px-0">
      <h2 className="font-bold text-2xl md:text-3xl my-10 text-center md:text-left text-gray-900 dark:text-gray-100">
        Search Results ({allJobs.length})
      </h2>
      {allJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs?.map((job) => (
            <JobCard key={job?._id} job={job} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No jobs found.
        </p>
      )}
    </section>
  );
};

export default BrowseJobs;
