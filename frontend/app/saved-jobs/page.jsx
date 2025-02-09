"use client";

import Job from "@/components/Job";
import { setSavedJobs } from "@/redux/slices/jobSlice";
import { useSelector, useDispatch } from "react-redux";

const SavedJobs = () => {
  const { savedJobs } = useSelector((state) => state.job);
  console.log("Saved jobs:", savedJobs);
  const dispatch = useDispatch();

  const toggleSaveJob = (job) => {
    const updatedSavedJobs = savedJobs.filter(
      (savedJob) => savedJob._id !== job._id
    );
    dispatch(setSavedJobs(updatedSavedJobs));
  };

  return (
    <section className="wrapper py-8 px-2 xl:px-0">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Saved <span className="text-purple-600">Jobs</span>
      </h1>
      {savedJobs?.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No saved jobs</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedJobs?.map((job, i) => (
            <Job key={i} job={job} onSave={() => toggleSaveJob(job)} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SavedJobs;
