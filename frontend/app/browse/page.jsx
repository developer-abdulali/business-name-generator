"use client";
import Job from "@/components/Job";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSavedJobs, setSearchedQuery } from "@/redux/slices/jobSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const BrowseJobs = () => {
  useGetAllJobs();
  const { user } = useSelector((state) => state.auth);
  const { allJobs, savedJobs = [] } = useSelector((state) => state.job);

  const dispatch = useDispatch();

  const toggleSaveJob = (job) => {
    if (!user) return toast.info("Please login to save the job.");
    const isSaved = savedJobs.some((savedJob) => savedJob._id === job._id);

    if (isSaved) {
      // If already saved, remove it and show a removal message
      const updatedSavedJobs = savedJobs.filter(
        (savedJob) => savedJob._id !== job._id
      );
      dispatch(setSavedJobs(updatedSavedJobs));
      toast.error("Job removed from saved list");
    } else {
      // If not saved, add it and show a success message
      const updatedSavedJobs = [...savedJobs, job];
      dispatch(setSavedJobs(updatedSavedJobs));
      toast.success("Job saved successfully");
    }
  };

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
          <Job key={job?._id} job={job} onSave={() => toggleSaveJob(job)} />
        ))}
      </div>
    </section>
  );
};

export default BrowseJobs;
