import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
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
import moment from "moment";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/lib/constant";

const shortlistingStatus = [
  { label: "Accepted", icon: CheckCircle },
  { label: "Rejected", icon: XCircle },
];

const ApplicantsTable = () => {
  const { applicants } = useSelector((state) => state.application);

  // Ensure applicants.applications is an array
  const applicantsArray = Array.isArray(applicants?.applications)
    ? applicants.applications
    : [];

  const changeStatusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section>
      <Table className="min-w-full bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
        <TableCaption className="dark:text-gray-300">
          A list of your recent applied users
        </TableCaption>
        <TableHeader className="dark:bg-gray-800">
          <TableRow>
            <TableHead className="px-4 py-2 dark:text-gray-300">
              FullName
            </TableHead>
            <TableHead className="px-4 py-2 dark:text-gray-300">
              Email
            </TableHead>
            <TableHead className="px-4 py-2 dark:text-gray-300">
              Contact
            </TableHead>
            <TableHead className="px-4 py-2 dark:text-gray-300">
              Resume
            </TableHead>
            <TableHead className="px-4 py-2 dark:text-gray-300">Date</TableHead>
            <TableHead className="px-4 py-2 text-right dark:text-gray-300">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicantsArray.length === 0 ? (
            <TableRow className="border-b dark:border-gray-700">
              <TableCell
                colSpan="6"
                className="px-4 py-2 text-gray-500 text-center dark:text-gray-300"
              >
                No applicants found.
              </TableCell>
            </TableRow>
          ) : (
            applicantsArray.map((item, index) => (
              <TableRow key={index} className="border-b dark:border-gray-700">
                <TableCell className="px-4 py-2 dark:text-gray-300">
                  {item?.applicant?.fullname}
                </TableCell>
                <TableCell className="px-4 py-2 dark:text-gray-300">
                  {item?.applicant?.email}
                </TableCell>
                <TableCell className="px-4 py-2 dark:text-gray-300">
                  {item?.applicant?.phoneNumber}
                </TableCell>
                <TableCell className="px-4 py-2">
                  <a
                    href={item?.applicant?.profile?.resume || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-blue-600 dark:text-blue-400 cursor-pointer"
                  >
                    {item?.applicant?.profile?.resume ? "See resume" : "N/A"}
                  </a>
                </TableCell>
                <TableCell className="px-4 py-2 dark:text-gray-300">
                  {moment(item?.createdAt).format("DD-MM-YY")}
                </TableCell>
                <TableCell className="px-4 py-2 text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer hover:text-purple-600 dark:hover:text-purple-400" />
                    </PopoverTrigger>
                    <PopoverContent className="w-fit bg-white dark:bg-gray-800 dark:text-gray-300 border dark:border-gray-700">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            changeStatusHandler(status.label, item?._id)
                          }
                          className="flex items-center gap-2 cursor-pointer hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white p-2 rounded"
                        >
                          <status.icon size={20} />
                          <span className="px-1">{status.label}</span>
                        </div>
                      ))}
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

export default ApplicantsTable;
