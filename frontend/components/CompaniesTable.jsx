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
    <section className="p-4">
      <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <TableCaption className="p-4 text-lg font-normal">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="p-4">Logo</TableHead>
            <TableHead className="p-4">Name</TableHead>
            <TableHead className="p-4">Location</TableHead>
            <TableHead className="p-4">Jobs Posted</TableHead>
            <TableHead className="p-4">Date</TableHead>
            <TableHead className="p-4 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies.length === 0 ? (
            <TableRow>
              <TableCell colSpan="5" className="text-center p-4">
                No companies found.
              </TableCell>
            </TableRow>
          ) : (
            filteredCompanies.map((company) => (
              <TableRow
                onClick={() =>
                  router.push(`/recruiter/companies/${company?._id}`)
                }
                key={company?._id}
                className="cursor-pointer hover:bg-gray-50"
              >
                <TableCell className="p-4">
                  {company?.logo ? (
                    <Avatar>
                      <AvatarImage src={company?.logo} />
                      <AvatarFallback>{company?.name}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar>
                      <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_dnoBTEnG6YrkmO5hSZwEykg1w6cjdO1gFg&s" />
                      <AvatarFallback>{company?.name}</AvatarFallback>
                    </Avatar>
                  )}
                </TableCell>
                <TableCell className="p-4">{company?.name}</TableCell>
                <TableCell className="p-4">
                  {company.location || "N/A"}
                </TableCell>
                <TableCell className="p-4">
                  {company?.jobs?.length || 0}
                </TableCell>
                <TableCell className="p-4">
                  {moment(company.createdAt).format("DD-MM-YY")}
                </TableCell>

                <TableCell title="actions" className="p-4 text-right">
                  <Popover>
                    <PopoverTrigger onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="hover:text-blue-500" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2">
                      <div
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
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
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
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
        >
          <ChevronLeft />
        </Button>
        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 ${currentPage === page ? "bg-gray-200" : ""}`}
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
    </section>
  );
};

export default CompaniesTable;
