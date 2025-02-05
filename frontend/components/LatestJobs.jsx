import { useSelector } from "react-redux";
import LatestJobCard from "./LatestJobCard";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.job.allJobs);

  return (
    <div className="wrapper my-20 px-2 xl:px-0">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-10">
        Latest <span className="text-customColor">Job Openings</span>
      </h1>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs?.length <= 0 ? (
          <span>No jobs found</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            ?.map((job) => <LatestJobCard key={job?._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
