import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import moment from "moment";
import { useRouter } from "next/navigation";

const AppliedJobsTable = () => {
  const router = useRouter();
  const { allAppliedJobs } = useSelector((state) => state.job);

  return (
    <section>
      <Table>
        <TableCaption>Applied Jobs List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                {`You haven't applied any job yet.`}
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => {
              const jobId = appliedJob?.job?._id;
              return (
                <TableRow
                  key={appliedJob?._id}
                  onClick={() => router.push(`/jobs/${jobId}`)}
                  className="cursor-pointer"
                >
                  <TableCell>
                    {moment(appliedJob?.createdAt).format("DD-MM-YY")}
                  </TableCell>
                  <TableCell>{appliedJob?.job?.title}</TableCell>
                  <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={`text-right ${
                        appliedJob?.status === "rejected"
                          ? "bg-red-400"
                          : appliedJob?.status === "pending"
                          ? "bg-gray-400"
                          : "bg-green-400"
                      }`}
                    >
                      {appliedJob?.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </section>
  );
};
export default AppliedJobsTable;
