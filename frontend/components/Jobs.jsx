"use client";

import { ListFilter } from "lucide-react";
import Filters from "./Filters";
import Job from "./Job";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Jobs = () => {
  const [showFilters, setShowFilters] = useState(false);
  const allJobs = useSelector((state) => state.job.allJobs);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowFilters(true);
      } else {
        setShowFilters(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="wrapper px-4 xl:px-0 py-8">
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold mb-6 text-gray-800">Job Listings</p>
          {/* Toggle button for smaller screens */}
          <span
            onClick={() => setShowFilters((prev) => !prev)}
            className="cursor-pointer lg:hidden"
          >
            <ListFilter size={28} />
          </span>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Section */}
          <div
            className={`transform transition-all duration-300 ease-in-out ${
              showFilters
                ? "opacity-100 translate-x-0 block"
                : "opacity-0 -translate-x-full hidden lg:block"
            } w-full lg:w-1/4 bg-white p-4 rounded-lg shadow-md border`}
          >
            <Filters />
          </div>

          {/* Jobs Section */}
          <div className="flex-1">
            {allJobs?.length <= 0 ? (
              <div className="text-center py-10">
                <span className="text-xl text-gray-600">No jobs found</span>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 overflow-auto scrollable-content"
                style={{ maxHeight: "calc(100vh - 200px)" }}
              >
                {allJobs?.map((job) => (
                  <Job key={job?._id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
