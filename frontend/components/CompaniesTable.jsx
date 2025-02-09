"use client";
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
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
import { COMPANY_API_ENDPOINT } from "@/lib/constant";
import { toast } from "sonner";
import { deleteCompany } from "@/redux/slices/companySlice";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const CompaniesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { companies, searchCompanyByText } = useSelector(
    (state) => state.company
  );
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const totalPages = Math.ceil(companies.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleDeleteCompany = async (companyId) => {
    try {
      const res = await axios.delete(
        `${COMPANY_API_ENDPOINT}/delete/${companyId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(deleteCompany(companyId));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the company.");
    }
  };

  useEffect(() => {
    const filteredCompany =
      companies?.length > 0
        ? companies.filter((company) => {
            const nameMatch = company?.name
              ?.toLowerCase()
              .includes(searchCompanyByText?.toLowerCase());
            const locationMatch = company?.location
              ?.toLowerCase()
              .includes(searchCompanyByText?.toLowerCase());
            return nameMatch || locationMatch;
          })
        : [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCompanies = filteredCompany.slice(startIndex, endIndex);

    setFilteredCompanies(paginatedCompanies);
  }, [companies, searchCompanyByText, currentPage]);

  return (
    <section className="my-5 mx-3 2xl:mx-0">
      <Table className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <TableCaption className="p-4 text-lg font-normal text-gray-900 dark:text-gray-100">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
            <TableHead className="p-4 text-gray-900 dark:text-gray-100">
              Logo
            </TableHead>
            <TableHead className="p-4 text-gray-900 dark:text-gray-100">
              Name
            </TableHead>
            <TableHead className="p-4 text-gray-900 dark:text-gray-100">
              Location
            </TableHead>
            <TableHead className="p-4 text-gray-900 dark:text-gray-100">
              Jobs Posted
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
          {filteredCompanies.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan="6"
                className="text-center p-4 text-gray-500 dark:text-gray-400"
              >
                <p>No companies found.</p>
              </TableCell>
            </TableRow>
          ) : (
            filteredCompanies.map((company) => (
              <TableRow
                onClick={() =>
                  router.push(`/recruiter/companies/${company?._id}`)
                }
                key={company?._id}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <TableCell className="p-4">
                  {company?.logo ? (
                    <Avatar>
                      <AvatarImage
                        src={company?.logo}
                        className="object-contain"
                      />
                      <AvatarFallback>{company?.name}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar>
                      <AvatarImage src="/company.svg" />
                      <AvatarFallback>{company?.name}</AvatarFallback>
                    </Avatar>
                  )}
                </TableCell>
                <TableCell className="p-4 text-gray-900 dark:text-gray-100">
                  {company?.name}
                </TableCell>
                <TableCell className="p-4 text-gray-900 dark:text-gray-100">
                  {company.location || "N/A"}
                </TableCell>
                <TableCell className="p-4 text-gray-900 dark:text-gray-100">
                  {company?.jobs?.length || 0}
                </TableCell>
                <TableCell className="p-4 text-gray-900 dark:text-gray-100">
                  {moment(company.createdAt).format("DD-MM-YY")}
                </TableCell>

                <TableCell title="actions" className="p-4 text-right">
                  <Popover>
                    <PopoverTrigger onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="hover:text-purple-600 dark:hover:text-purple-400" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                      <div
                        className="flex items-center gap-2 cursor-pointer hover:bg-purple-600 dark:hover:bg-purple-700 hover:text-white p-2 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/recruiter/companies/${company?._id}`);
                        }}
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCompany(company?._id);
                        }}
                        className="flex items-center gap-2 cursor-pointer hover:bg-purple-600 dark:hover:bg-purple-700 hover:text-white p-2 rounded"
                      >
                        <Trash2 className="w-4" />
                        <span>Delete</span>
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

export default CompaniesTable;
