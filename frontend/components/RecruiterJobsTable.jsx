"use client";
import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
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
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import moment from "moment";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/lib/constant";
import { toast } from "sonner";
import { deleteCompany } from "@/redux/slices/companySlice";
import { useEffect, useState } from "react";

const RecruiterJobsTable = () => {
  const { allRecruiterJobs, searchJobByText } = useSelector(
    (state) => state.job
  );
  const [filterJobs, setFilterJobs] = useState([]);
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
    setFilterJobs(filteredJobs);
  }, [allRecruiterJobs, searchJobByText]);

  return (
    <section className="p-4">
      <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <TableCaption className="p-4 text-lg font-semibold">
          A list of your recent posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="p-4">Company Name</TableHead>
            <TableHead className="p-4">Role</TableHead>
            <TableHead className="p-4">Location</TableHead>
            <TableHead className="p-4">Date</TableHead>
            <TableHead className="p-4 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan="5" className="text-center p-4">
                No jobs found.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow
                onClick={() => router.push(`/recruiter/jobs/${job?._id}`)}
                key={job?._id}
                className="cursor-pointer hover:bg-gray-50"
              >
                <TableCell className="p-4">{job?.company.name}</TableCell>
                <TableCell className="p-4">{job?.title}</TableCell>
                <TableCell className="p-4">{job?.location || "N/A"}</TableCell>
                <TableCell className="p-4">
                  {moment(job.createdAt).format("DD-MM-YY")}
                </TableCell>
                <TableCell title="actions" className="p-4 text-right">
                  <Popover>
                    <PopoverTrigger onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="hover:text-blue-500" />
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-2">
                      <div
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          // router.push(`/recruiter/jobs/${job?._id}`);
                        }}
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/recruiter/jobs/${job?._id}/applicants`);
                        }}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                      >
                        <Eye className="w-4" />
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
    </section>
  );
};

export default RecruiterJobsTable;
