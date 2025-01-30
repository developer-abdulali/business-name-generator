"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/lib/constant";

import { setSingleJob } from "@/redux/slices/jobSlice";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const JobDescription = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.auth);
  const { singleJob } = useSelector((state) => state.job);
  const jobId = params.jobId;
  const isInitiallyApplied = singleJob?.applications?.some(
    (applications) => applications.applicant === user?._id || false
  );
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.success(error.response.data.message);
    }
  };

  useEffect(() => {
    const getJobDetail = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          // Ensure job data is set before checking applications
          const hasApplied = res.data.job.applications?.some(
            (application) => application.applicant === user?._id
          );

          setIsApplied(hasApplied);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (jobId && user?._id) {
      getJobDetail();
    }
  }, [jobId, user?._id, dispatch]);

  return (
    <div className="wrapper my-10 px-4 xl:px-0">
      {/* Job Title */}
      <h2 className="font-bold text-2xl text-gray-800 mb-6">
        {singleJob?.title}
      </h2>

      {/* Badges and Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant="secondary"
            className="text-blue-700 font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
          >
            {singleJob?.position} Positions
          </Badge>
          <Badge
            variant="secondary"
            className="text-customRedColor font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
          >
            {singleJob?.jobType}
          </Badge>
          <Badge
            variant="secondary"
            className="text-customColor font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
          >
            {singleJob?.salary} PKR
          </Badge>
        </div>

        {/* Apply Now Button */}
        <Button
          onClick={() => {
            if (!user) {
              toast.error("You must be logged in to apply for the job.");
            } else if (!isApplied) {
              applyJobHandler();
            }
          }}
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 text-white transition-all ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-800"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>

        {/* <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 text-white transition-all ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-800"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button> */}
      </div>

      {/* Job Details */}
      <div className="mt-8">
        <p className="border-b-2 border-gray-300 font-medium text-lg pb-2">
          Job Details
        </p>
        <div className="mt-4 space-y-3">
          <p className="font-semibold text-gray-700">
            Role:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </p>
          <p className="font-semibold text-gray-700">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </p>
          <p className="font-semibold text-gray-700">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </p>
          <p className="font-semibold text-gray-700">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel} years
            </span>
          </p>
          <p className="font-semibold text-gray-700">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary}
            </span>
          </p>
          <p className="font-semibold text-gray-700">
            Total Applications:
            <span className="pl-4 font-normal text-gray-800">
              {" "}
              {singleJob?.applications?.length}
            </span>
          </p>
          <p className="font-semibold text-gray-700">
            Posted Date:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt
                ? moment(singleJob?.createdAt).format("DD MMM YYYY")
                : "N/A"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
