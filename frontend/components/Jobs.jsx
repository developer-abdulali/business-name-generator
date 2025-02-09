"use client";

import { ChevronLeft, ChevronRight, ListFilter, X } from "lucide-react";
import Filters from "./Filters";
import Job from "./Job";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Button } from "@/components/ui/button";
import { setSavedJobs } from "@/redux/slices/jobSlice";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/lib/constant";
import axios from "axios";

const Jobs = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { allJobs } = useSelector((state) => state.job);
  const { fetchAllJobs } = useGetAllJobs();

  useEffect(() => {
    fetchAllJobs();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setShowFilters(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSaveJob = async (job) => {
    if (!user) return toast.info("Please login to save the job.");

    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/save-job`,
        { jobId: job._id },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setSavedJobs(res.data.savedJobs));
        toast.success("Job saved successfully");
      } else {
        toast.error(res.data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const filteredJobs = allJobs?.filter((job) => {
    const locationMatch =
      !selectedFilters["Location"]?.length ||
      selectedFilters["Location"].includes(job.location);

    const jobTypeMatch =
      !selectedFilters["Job Type"]?.length ||
      selectedFilters["Job Type"].includes(job.jobType);

    const experienceMatch =
      !selectedFilters["Experience"]?.length ||
      selectedFilters["Experience"].includes(`${job.experienceLevel} years`);

    const salaryMatch =
      !selectedFilters["Salary"]?.length ||
      selectedFilters["Salary"].some((salary) => {
        const [min] = salary.split("-");
        return job.salary >= parseInt(min) * 1000;
      });

    return locationMatch && jobTypeMatch && experienceMatch && salaryMatch;
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs?.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="wrapper py-8 px-4 sm:px-6 xl:px-0">
      <div className="">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
          Job <span className="text-purple-600">Listings</span>
        </h1>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-lg font-semibold">Filters</p>
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center text-gray-700 cursor-pointer lg:hidden"
          >
            {showFilters ? (
              <X className="mr-2" />
            ) : (
              <ListFilter className="mr-2" />
            )}
          </button>
        </div>
      </div>
      <div className="lg:flex lg:space-x-8">
        {showFilters && <Filters onFilterChange={setSelectedFilters} />}
        <div className="flex-1">
          {currentJobs.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No jobs found</p>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentJobs?.map((job) => (
                  <Job
                    key={job?._id}
                    job={job}
                    onSave={() => toggleSaveJob(job)}
                  />
                ))}
              </div>
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft />
                  </Button>
                  {pageNumbers.map((page) => (
                    <Button
                      key={page}
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 ${
                        currentPage === page
                          ? "bg-purple-600 text-white hover:bg-gray-100 dark:hover:text-black dark:hover:bg-gray"
                          : ""
                      }`}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
