import React from "react";
import { useSelector } from "react-redux";
import LatestJobCard from "./LatestJobCard";
import { ArrowRight, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

const LatestJobs = () => {
  const router = useRouter();
  const allJobs = useSelector((state) => state.job.allJobs);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="wrapper">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                Latest Job Openings
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Explore the newest opportunities
            </p>
          </div>

          <button
            onClick={() => router.push("/jobs")}
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-all"
          >
            View All Jobs
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Jobs Grid */}
        {allJobs?.length <= 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
            <Briefcase className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No jobs found
            </p>
            <p className="text-gray-500 dark:text-gray-500 mt-2">
              Check back later for new opportunities
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs?.slice(0, 6)?.map((job) => (
              <LatestJobCard key={job?._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
