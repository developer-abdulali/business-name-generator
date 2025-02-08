// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import moment from "moment";
// import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/lib/constant";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useRouter } from "next/navigation";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { setSingleJob } from "@/redux/slices/jobSlice";

// const JobDescription = () => {
//   const { singleJob } = useSelector((state) => state.job);
//   const { user } = useSelector((state) => state.auth);
//   const isInitiallyApplied =
//     singleJob?.applications?.some(
//       (application) => application.applicant === user?._id
//     ) || false;
//   const [isApplied, setIsApplied] = useState(isInitiallyApplied);

//   const params = useParams();
//   const jobId = params.jobId;

//   const router = useRouter();

//   const dispatch = useDispatch();

//   const applyJobHandler = async () => {
//     if (!user) {
//       router.push("/login");
//     }
//     try {
//       const res = await axios.get(
//         `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         setIsApplied(true);
//         const updateSingleJob = {
//           ...singleJob,
//           applications: [...singleJob.applications, { applicant: user?._id }],
//         };
//         dispatch(setSingleJob(updateSingleJob));
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     const fetchSingleJob = async () => {
//       try {
//         const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
//           withCredentials: true,
//         });

//         if (res.data.success) {
//           dispatch(setSingleJob(res.data.job));
//           setIsApplied(
//             res.data.job.applications?.some(
//               (application) => application.applicant === user?._id
//             ) || false
//           );
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchSingleJob();
//   }, [jobId, dispatch, user?._id]);

//   if (!singleJob) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <section className="wrapper my-10 px-4 xl:px-0">
//       {/* Job Title */}
//       <h2 className="font-bold text-2xl text-gray-800 mb-6">
//         {singleJob?.title}
//       </h2>

//       {/* Badges and Button */}
//       <div className="flex flex-wrap items-center justify-between gap-4">
//         {/* Badges */}
//         <div className="flex flex-wrap items-center gap-3">
//           <Badge
//             variant="secondary"
//             className="text-blue-700 font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
//           >
//             {singleJob?.position} Positions
//           </Badge>
//           <Badge
//             variant="secondary"
//             className="text-customRedColor font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
//           >
//             {singleJob?.jobType}
//           </Badge>
//           <Badge
//             variant="secondary"
//             className="text-customColor font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
//           >
//             {singleJob?.salary} PKR
//           </Badge>
//         </div>

//         {/* Apply Now Button */}
//         <Button
//           onClick={isApplied ? null : applyJobHandler}
//           disabled={isApplied}
//           className={`rounded-lg px-6 py-2 text-white transition-all ${
//             isApplied
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-purple-700 hover:bg-purple-800"
//           }`}
//         >
//           {isApplied ? "Already Applied" : "Apply Now"}
//         </Button>
//       </div>

//       {/* Job Details */}
//       <div className="mt-8">
//         <p className="border-b-2 border-gray-300 font-medium text-lg pb-2">
//           Job Details
//         </p>
//         <div className="mt-4 space-y-3">
//           <p className="font-semibold text-gray-700">
//             Role:{" "}
//             <span className="pl-4 font-normal text-gray-800">
//               {singleJob?.title}
//             </span>
//           </p>
//           <p className="font-semibold text-gray-700">
//             Location:{" "}
//             <span className="pl-4 font-normal text-gray-800">
//               {singleJob?.location}
//             </span>
//           </p>
//           <p className="font-semibold text-gray-700">
//             Description:{" "}
//             <span className="pl-4 font-normal text-gray-800">
//               {singleJob?.description}
//             </span>
//           </p>
//           <p className="font-semibold text-gray-700">
//             Experience:{" "}
//             <span className="pl-4 font-normal text-gray-800">
//               {singleJob?.experienceLevel} years
//             </span>
//           </p>
//           <p className="font-semibold text-gray-700">
//             Salary:{" "}
//             <span className="pl-4 font-normal text-gray-800">
//               {singleJob?.salary}
//             </span>
//           </p>
//           <p className="font-semibold text-gray-700">
//             Total Applications:
//             <span className="pl-4 font-normal text-gray-800">
//               {singleJob?.applications?.length || 0}
//             </span>
//           </p>
//           <p className="font-semibold text-gray-700">
//             Posted Date:
//             <span className="pl-4 font-normal text-gray-800">
//               {singleJob?.createdAt
//                 ? moment(singleJob?.createdAt).format("DD MMM YYYY")
//                 : "N/A"}
//             </span>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JobDescription;

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/lib/constant";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Clock,
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
    <section className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card className="overflow-hidden bg-white shadow-xl rounded-xl hover:shadow-2xl transition-shadow duration-300">
        <CardContent className="p-8">
          {/* Header with Company Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-gray-100">
            <div className="h-16 w-16 bg-purple-100 rounded-xl flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {singleJob?.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
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
                  : "bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-200"
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
          <div className="py-6 border-b border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 hover:bg-blue-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-600 font-medium">
                      Positions
                    </p>
                    <p className="text-lg font-semibold text-blue-700">
                      {singleJob?.position}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 hover:bg-green-100 transition-colors">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-green-600 font-medium">Salary</p>
                    <p className="text-lg font-semibold text-green-700">
                      {singleJob?.salary} PKR
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 hover:bg-purple-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-purple-600 font-medium">
                      Job Type
                    </p>
                    <p className="text-lg font-semibold text-purple-700">
                      {singleJob?.jobType}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Job Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <DetailItem
                  icon={<Briefcase className="h-5 w-5 text-gray-400" />}
                  label="Experience Required"
                  value={`${singleJob?.experienceLevel} years`}
                />
                <DetailItem
                  icon={<Users className="h-5 w-5 text-gray-400" />}
                  label="Total Applications"
                  value={singleJob?.applications?.length || 0}
                />
              </div>
              <div className="space-y-6">
                <DetailItem
                  icon={<MapPin className="h-5 w-5 text-gray-400" />}
                  label="Location"
                  value={singleJob?.location}
                />
                <DetailItem
                  icon={<Calendar className="h-5 w-5 text-gray-400" />}
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
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Job Description
              </h4>
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <p className="text-gray-700 leading-relaxed">
                  {singleJob?.description}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>

    // <section className="wrapper my-10 px-4 xl:px-0">
    //   {/* Job Title */}
    //   <h2 className="font-bold text-2xl text-gray-800 mb-6">
    //     {singleJob?.title}
    //   </h2>

    //   {/* Badges and Button */}
    //   <div className="flex flex-wrap items-center justify-between gap-4">
    //     {/* Badges */}
    //     <div className="flex flex-wrap items-center gap-3">
    //       <Badge
    //         variant="secondary"
    //         className="text-blue-700 font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
    //       >
    //         {singleJob?.position} Positions
    //       </Badge>
    //       <Badge
    //         variant="secondary"
    //         className="text-customRedColor font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
    //       >
    //         {singleJob?.jobType}
    //       </Badge>
    //       <Badge
    //         variant="secondary"
    //         className="text-customColor font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
    //       >
    //         {singleJob?.salary} PKR
    //       </Badge>
    //     </div>

    //     {/* Apply Now Button */}
    //     <Button
    //       onClick={isApplied ? null : applyJobHandler}
    //       disabled={isApplied}
    //       className={`rounded-lg px-6 py-2 text-white transition-all ${
    //         isApplied
    //           ? "bg-gray-400 cursor-not-allowed"
    //           : "bg-purple-700 hover:bg-purple-800"
    //       }`}
    //     >
    //       {isApplied ? "Already Applied" : "Apply Now"}
    //     </Button>
    //   </div>

    //   {/* Job Details */}
    //   <div className="mt-8">
    //     <p className="border-b-2 border-gray-300 font-medium text-lg pb-2">
    //       Job Details
    //     </p>
    //     <div className="mt-4 space-y-3">
    //       <p className="font-semibold text-gray-700">
    //         Role:{" "}
    //         <span className="pl-4 font-normal text-gray-800">
    //           {singleJob?.title}
    //         </span>
    //       </p>
    //       <p className="font-semibold text-gray-700">
    //         Location:{" "}
    //         <span className="pl-4 font-normal text-gray-800">
    //           {singleJob?.location}
    //         </span>
    //       </p>
    //       <p className="font-semibold text-gray-700">
    //         Description:{" "}
    //         <span className="pl-4 font-normal text-gray-800">
    //           {singleJob?.description}
    //         </span>
    //       </p>
    //       <p className="font-semibold text-gray-700">
    //         Experience:{" "}
    //         <span className="pl-4 font-normal text-gray-800">
    //           {singleJob?.experienceLevel} years
    //         </span>
    //       </p>
    //       <p className="font-semibold text-gray-700">
    //         Salary:{" "}
    //         <span className="pl-4 font-normal text-gray-800">
    //           {singleJob?.salary}
    //         </span>
    //       </p>
    //       <p className="font-semibold text-gray-700">
    //         Total Applications:
    //         <span className="pl-4 font-normal text-gray-800">
    //           {singleJob?.applications?.length || 0}
    //         </span>
    //       </p>
    //       <p className="font-semibold text-gray-700">
    //         Posted Date:
    //         <span className="pl-4 font-normal text-gray-800">
    //           {singleJob?.createdAt
    //             ? moment(singleJob?.createdAt).format("DD MMM YYYY")
    //             : "N/A"}
    //         </span>
    //       </p>
    //     </div>
    //   </div>
    // </section>
  );
};

export default JobDescription;

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    {icon}
    <div>
      <dt className="text-sm font-medium text-gray-500 mb-1">{label}</dt>
      <dd className="text-base font-semibold text-gray-900">{value}</dd>
    </div>
  </div>
);
