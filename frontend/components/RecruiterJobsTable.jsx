// "use client";
// import {
//   Eye,
//   MoreHorizontal,
//   ChevronLeft,
//   ChevronRight,
//   Trash,
// } from "lucide-react";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "./ui/table";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import moment from "moment";
// import { useEffect, useState } from "react";
// import { Button } from "./ui/button";
// import { JOB_API_ENDPOINT } from "@/lib/constant";
// import { toast } from "sonner";
// import axios from "axios";
// import { setDeleteJob } from "@/redux/slices/jobSlice";
// import { useDispatch } from "react-redux";

// const RecruiterJobsTable = () => {
//   const { allRecruiterJobs, searchJobByText } = useSelector(
//     (state) => state.job
//   );
//   const [filterJobs, setFilterJobs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const router = useRouter();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const filteredJobs =
//       allRecruiterJobs?.length > 0
//         ? allRecruiterJobs.filter((job) => {
//             const nameMatch = job?.company?.name
//               ?.toLowerCase()
//               .includes(searchJobByText?.toLowerCase());
//             const locationMatch = job?.location
//               ?.toLowerCase()
//               .includes(searchJobByText?.toLowerCase());
//             return nameMatch || locationMatch;
//           })
//         : [];

//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

//     setFilterJobs(paginatedJobs);
//   }, [allRecruiterJobs, searchJobByText, currentPage]);

//   const totalPages = Math.ceil(allRecruiterJobs.length / itemsPerPage);
//   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

//   const deleteJobHandler = async (jobId) => {
//     try {
//       const res = await axios.delete(
//         `${JOB_API_ENDPOINT}/delete-job/${jobId}`,
//         {
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message);
//         dispatch(setDeleteJob(jobId));
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("An error occurred while deleting the job.");
//     }
//   };

//   return (
//     <section className="my-5 mx-3 2xl:mx-0">
//       <Table className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
//         <TableCaption className="p-4 text-lg font-normal text-gray-900 dark:text-gray-100">
//           A list of your recent posted jobs
//         </TableCaption>
//         <TableHeader>
//           <TableRow className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
//             <TableHead className="p-4 text-gray-900 dark:text-gray-100">
//               Company Name
//             </TableHead>
//             <TableHead className="p-4 text-gray-900 dark:text-gray-100">
//               Role
//             </TableHead>
//             <TableHead className="p-4 text-gray-900 dark:text-gray-100">
//               Location
//             </TableHead>
//             <TableHead className="p-4 text-gray-900 dark:text-gray-100">
//               Date
//             </TableHead>
//             <TableHead className="p-4 text-right text-gray-900 dark:text-gray-100">
//               Action
//             </TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {filterJobs.length === 0 ? (
//             <TableRow>
//               <TableCell
//                 colSpan="5"
//                 className="text-center p-4 text-gray-500 dark:text-gray-400"
//               >
//                 No jobs found.
//               </TableCell>
//             </TableRow>
//           ) : (
//             filterJobs.map((job) => (
//               <TableRow
//                 key={job?._id}
//                 className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
//               >
//                 <TableCell className="p-4 text-gray-900 dark:text-gray-100">
//                   {job?.company?.name}
//                 </TableCell>
//                 <TableCell className="p-4 text-gray-900 dark:text-gray-100">
//                   {job?.title}
//                 </TableCell>
//                 <TableCell className="p-4 text-gray-900 dark:text-gray-100">
//                   {job?.location || "N/A"}
//                 </TableCell>
//                 <TableCell className="p-4 text-gray-900 dark:text-gray-100">
//                   {moment(job.createdAt).format("DD-MM-YY")}
//                 </TableCell>
//                 <TableCell title="actions" className="p-4 text-right">
//                   <Popover>
//                     <PopoverTrigger onClick={(e) => e.stopPropagation()}>
//                       <MoreHorizontal className="hover:text-purple-600 dark:hover:text-purple-400" />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-fit p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
//                       <div
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteJobHandler(job?._id);
//                         }}
//                         className="flex items-center gap-2 cursor-pointer hover:bg-purple-600 dark:hover:bg-purple-700 hover:text-white p-2 rounded"
//                       >
//                         <Trash className="w-4" />
//                         <span>Delete</span>
//                       </div>
//                       <div
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           router.push(`/recruiter/jobs/${job?._id}/applicants`);
//                         }}
//                         className="flex items-center gap-2 cursor-pointer hover:bg-purple-600 dark:hover:bg-purple-700 hover:text-white p-2 rounded"
//                       >
//                         <Eye className="w-5" />
//                         <span>Applicants</span>
//                       </div>
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-4 space-x-2">
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className="text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
//         >
//           <ChevronLeft />
//         </Button>
//         {pageNumbers.map((page) => (
//           <Button
//             key={page}
//             variant="outline"
//             size="icon"
//             onClick={() => setCurrentPage(page)}
//             className={`px-4 py-2 ${
//               currentPage === page
//                 ? "bg-purple-600 text-white dark:bg-purple-700"
//                 : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//             }`}
//           >
//             {page}
//           </Button>
//         ))}
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//           className="text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
//         >
//           <ChevronRight />
//         </Button>
//       </div>
//     </section>
//   );
// };

// export default RecruiterJobsTable;

"use client";
import {
  Eye,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Trash,
  Briefcase,
  MapPin,
  CalendarDays,
  Building2,
  AlertCircle,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { JOB_API_ENDPOINT } from "@/lib/constant";
import { toast } from "sonner";
import axios from "axios";
import { setDeleteJob } from "@/redux/slices/jobSlice";
import { useDispatch } from "react-redux";

const RecruiterJobsTable = () => {
  const { allRecruiterJobs, searchJobByText } = useSelector(
    (state) => state.job
  );
  const [filterJobs, setFilterJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredJobs =
      allRecruiterJobs?.length > 0
        ? allRecruiterJobs.filter((job) => {
            const nameMatch = job?.company?.name
              ?.toLowerCase()
              .includes(searchJobByText?.toLowerCase());
            const locationMatch = job?.location
              ?.toLowerCase()
              .includes(searchJobByText?.toLowerCase());
            const titleMatch = job?.title
              ?.toLowerCase()
              .includes(searchJobByText?.toLowerCase());
            return nameMatch || locationMatch || titleMatch;
          })
        : [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    setFilterJobs(paginatedJobs);
  }, [allRecruiterJobs, searchJobByText, currentPage]);

  const totalPages = Math.ceil(allRecruiterJobs.length / itemsPerPage) || 1;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const deleteJobHandler = async (jobId) => {
    try {
      const res = await axios.delete(
        `${JOB_API_ENDPOINT}/delete-job/${jobId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setDeleteJob(jobId));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the job.");
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm dark:border-gray-700">
      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <TableHeader className="bg-gray-50 dark:bg-gray-800">
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Company
              </div>
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Position
              </div>
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </div>
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Posted
              </div>
            </TableHead>
            <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="px-6 py-4 whitespace-nowrap text-center"
              >
                <div className="flex flex-col items-center justify-center py-8">
                  <AlertCircle className="h-10 w-10 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    No jobs found
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {searchJobByText
                      ? "Try a different search term"
                      : "You haven't posted any jobs yet"}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow
                key={job?._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => router.push(`/jobs/${job?._id}`)}
              >
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {job?.company?.name || "N/A"}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {job?.jobType}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {job?.title}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {job?.salary || "Salary not specified"}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {job?.location || "Remote"}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {moment(job.createdAt).format("MMM D, YYYY")}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {moment(job.createdAt).fromNow()}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2" align="end">
                      <div className="space-y-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/recruiter/jobs/${job?._id}/applicants`
                            );
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Applicants
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteJobHandler(job?._id);
                          }}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Job
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    currentPage * itemsPerPage,
                    allRecruiterJobs.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium">{allRecruiterJobs.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-r-none"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous</span>
                </Button>

                {pageNumbers.map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      page === 1
                        ? "rounded-l-none"
                        : page === totalPages
                        ? "rounded-r-none"
                        : ""
                    }
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-l-none"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next</span>
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterJobsTable;
