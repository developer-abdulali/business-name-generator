import { useSelector } from "react-redux";
import LatestJobCard from "./LatestJobCard";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.job.allJobs);

  return (
    <div className="wrapper my-20 px-2 xl:px-0">
      <h1 className="text-center text-2xl sm:text-left sm:text-3xl lg:text-4xl font-semibold mb-10">
        Latest <span className="text-customColor">Job Openings</span>
      </h1>

      {/* Card Grid */}
      {allJobs?.length <= 0 ? (
        <div className="w-full text-center text-lg text-gray-500">
          No jobs found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs?.slice(0, 6)?.map((job) => (
            <LatestJobCard key={job?._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
