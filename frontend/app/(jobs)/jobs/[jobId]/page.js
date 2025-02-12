"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/lib/constant";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  MapPin,
  Calendar,
  Users,
  Clock,
  PiggyBank,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { setSingleJob } from "@/redux/slices/jobSlice";

const JobDescription = () => {
  const { singleJob } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.jobId;

  const router = useRouter();

  const dispatch = useDispatch();

  const formatSalary = (salary) => {
    return salary?.toLocaleString();
  };

  const applyJobHandler = async () => {
    if (!user) {
      router.push("/login");
    }
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some(
              (application) => application.applicant === user?._id
            ) || false
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob) {
    return <div>Loading...</div>;
  }

  return (
    <section className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-0">
      <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-xl rounded-xl hover:shadow-2xl transition-shadow duration-300">
        <CardContent className="p-3 sm:p-8">
          {/* Header with Company Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="h-16 w-16 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
                {singleJob?.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{singleJob?.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {singleJob?.createdAt
                      ? new Date(singleJob.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`w-full md:w-auto rounded-xl px-8 py-3 text-white transition-all transform hover:scale-105 ${
                isApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-600 shadow-lg hover:shadow-purple-200"
              }`}
            >
              {isApplied ? (
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Already Applied
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Apply Now
                </span>
              )}
            </Button>
          </div>

          {/* Key Information Badges */}
          <div className="py-6 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-4 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-300 font-medium">
                      Positions
                    </p>
                    <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                      {singleJob?.position}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900 rounded-xl p-4 hover:bg-green-100 dark:hover:bg-green-800 transition-colors">
                <div className="flex items-center gap-3">
                  <PiggyBank className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-300 font-medium">
                      Salary
                    </p>
                    <p className="text-lg font-semibold text-green-700 dark:text-green-300">
                      {formatSalary(singleJob?.salary)} PKR
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900 rounded-xl p-4 hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm text-purple-600 dark:text-purple-300 font-medium">
                      Job Type
                    </p>
                    <p className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                      {singleJob?.jobType}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Job Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <DetailItem
                  icon={
                    <Briefcase className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  }
                  label="Experience Required"
                  value={`${singleJob?.experienceLevel} years`}
                />
                <DetailItem
                  icon={
                    <Users className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  }
                  label="Total Applications"
                  value={singleJob?.applications?.length || 0}
                />
              </div>
              <div className="space-y-6">
                <DetailItem
                  icon={
                    <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  }
                  label="Location"
                  value={singleJob?.location}
                />
                <DetailItem
                  icon={
                    <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  }
                  label="Posted Date"
                  value={
                    singleJob?.createdAt
                      ? new Date(singleJob.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "N/A"
                  }
                />
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Job Description
              </h4>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {singleJob?.description}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default JobDescription;

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    {icon}
    <div>
      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </dt>
      <dd className="text-base font-semibold text-gray-900 dark:text-gray-100">
        {value}
      </dd>
    </div>
  </div>
);
