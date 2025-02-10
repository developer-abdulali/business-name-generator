"use client";
import {
  Edit2,
  Eye,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Trash,
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
            return nameMatch || locationMatch;
          })
        : [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    setFilterJobs(paginatedJobs);
  }, [allRecruiterJobs, searchJobByText, currentPage]);

  const totalPages = Math.ceil(allRecruiterJobs.length / itemsPerPage);
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
    <section className="my-5 mx-3 2xl:mx-0">
      <Table className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <TableCaption className="p-4 text-lg font-normal text-gray-900 dark:text-gray-100">
          A list of your recent posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
            <TableHead className="p-4 text-gray-900 dark:text-gray-100">
              Company Name
            </TableHead>
            <TableHead className="p-4 text-gray-900 dark:text-gray-100">
              Role
            </TableHead>
            <TableHead className="p-4 text-gray-900 dark:text-gray-100">
              Location
            </TableHead>
            <TableHead className="p-4 text-gray-900 dark:text-gray-100">
              Date
            </TableHead>
            <TableHead className="p-4 text-right text-gray-900 dark:text-gray-100">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan="5"
                className="text-center p-4 text-gray-500 dark:text-gray-400"
              >
                No jobs found.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow
                key={job?._id}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <TableCell className="p-4 text-gray-900 dark:text-gray-100">
                  {job?.company?.name}
                </TableCell>
                <TableCell className="p-4 text-gray-900 dark:text-gray-100">
                  {job?.title}
                </TableCell>
                <TableCell className="p-4 text-gray-900 dark:text-gray-100">
                  {job?.location || "N/A"}
                </TableCell>
                <TableCell className="p-4 text-gray-900 dark:text-gray-100">
                  {moment(job.createdAt).format("DD-MM-YY")}
                </TableCell>
                <TableCell title="actions" className="p-4 text-right">
                  <Popover>
                    <PopoverTrigger onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="hover:text-purple-600 dark:hover:text-purple-400" />
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteJobHandler(job?._id);
                        }}
                        className="flex items-center gap-2 cursor-pointer hover:bg-purple-600 dark:hover:bg-purple-700 hover:text-white p-2 rounded"
                      >
                        <Trash className="w-4" />
                        <span>Delete</span>
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/recruiter/jobs/${job?._id}/applicants`);
                        }}
                        className="flex items-center gap-2 cursor-pointer hover:bg-purple-600 dark:hover:bg-purple-700 hover:text-white p-2 rounded"
                      >
                        <Eye className="w-5" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
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
                ? "bg-purple-600 text-white dark:bg-purple-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
          className="text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
};

export default RecruiterJobsTable;
