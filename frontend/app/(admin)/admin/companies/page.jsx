"use client";
import CompaniesTable from "@/components/CompaniesTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const CompaniesPage = () => {
  const router = useRouter();

  return (
    <section>
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-start justify-between my-5">
          <Input className="w-fit" placeholder="Search by name" />
          <Button
            onClick={() => router.push("/admin/companies/register-company")}
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </section>
  );
};

export default CompaniesPage;
