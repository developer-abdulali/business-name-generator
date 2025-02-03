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
      <div className="flex items-start justify-between my-5">
        <div className="relative w-fit mr-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-fit pr-10"
            placeholder="Search by name or location"
          />
          {input && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={handleClearInput}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/recruiter/companies/register-company")}
        >
          New Company
        </Button>
      </div>
      <CompaniesTable />
    </section>
  );
};

export default CompaniesPage;
