"use client";
import CompaniesTable from "@/components/CompaniesTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { setSearchCompanyByText } from "@/redux/slices/companySlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CompaniesPage = () => {
  const router = useRouter();
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  const handleClearInput = () => {
    setInput("");
    dispatch(setSearchCompanyByText(""));
  };

  return (
    <section className="max-w-screen-2xl mx-auto my-10">
      <div className="flex items-center gap-3 sm:justify-between mx-3 my-5 2xl:mx-0">
        <div className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="pr-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
            placeholder="Search by name, location"
          />
          {input && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={handleClearInput}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/recruiter/companies/register-company")}
          className="w-auto bg-purple-600 dark:bg-purple-700 text-white hover:bg-purple-700 dark:hover:bg-purple-600"
        >
          New Company
        </Button>
      </div>
      <CompaniesTable />
    </section>
  );
};

export default CompaniesPage;
