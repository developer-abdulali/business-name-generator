// "use client";
// import CompaniesTable from "@/components/CompaniesTable";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { X } from "lucide-react";
// import useGetAllCompanies from "@/hooks/useGetAllCompanies";
// import { setSearchCompanyByText } from "@/redux/slices/companySlice";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import Loading from "@/components/shared/Loading";

// const CompaniesPage = () => {
//   const router = useRouter();
//   const { companies, loading, error } = useGetAllCompanies();
//   const [input, setInput] = useState("");
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setSearchCompanyByText(input));
//     document.title = "MERN Job Portal - Companies";
//   }, [input, dispatch]);

//   const handleClearInput = () => {
//     setInput("");
//     dispatch(setSearchCompanyByText(""));
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   if (error) {
//     return <div>Error loading companies</div>; // Handle error state
//   }

//   return (
//     <section className="max-w-screen-2xl mx-auto h-screen my-10">
//       <div className="flex items-center gap-3 sm:justify-between mx-3 my-5 2xl:mx-0">
//         <div className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
//           <Input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="pr-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
//             placeholder="Search by name, location"
//           />
//           {input && (
//             <button
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
//               onClick={handleClearInput}
//             >
//               <X className="w-4 h-4" />
//             </button>
//           )}
//         </div>
//         <Button
//           variant="outline"
//           onClick={() => router.push("/recruiter/companies/register-company")}
//           className="w-auto bg-purple-600 hover:text-white dark:bg-purple-700 text-white hover:bg-purple-700 dark:hover:bg-purple-600"
//         >
//           New Company
//         </Button>
//       </div>
//       <CompaniesTable companies={companies} />
//     </section>
//   );
// };

// export default CompaniesPage;

"use client";
import {
  Building2,
  PlusCircle,
  Search,
  X,
  AlertCircle,
  Loader2,
} from "lucide-react";
import CompaniesTable from "@/components/CompaniesTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { setSearchCompanyByText } from "@/redux/slices/companySlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "@/components/shared/Loading";

const CompaniesPage = () => {
  const router = useRouter();
  const { companies, loading, error } = useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
    document.title = "MERN Job Portal - Companies";
  }, [input, dispatch]);

  const handleClearInput = () => {
    setInput("");
    dispatch(setSearchCompanyByText(""));
  };

  if (loading) {
    return <Loading loadingText="Loading companies.." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4 max-w-md p-6 text-center">
          <AlertCircle className="h-10 w-10 text-red-500" />
          <h2 className="text-xl font-bold">Error loading companies</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto h-screen px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          Company Directory
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Manage all registered companies
        </p>
      </div>

      {/* Search and Create Company Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="pl-10 pr-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Search companies by name or location..."
          />
          {input && (
            <button
              onClick={handleClearInput}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
            </button>
          )}
        </div>

        <Button
          onClick={() => router.push("/recruiter/companies/register-company")}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Register New Company
        </Button>
      </div>

      {/* Companies Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <CompaniesTable companies={companies} />
      </div>

      {/* Empty State (if needed) */}
      {companies?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 border border-dashed rounded-lg mt-4">
          <Building2 className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            No companies registered yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">
            Get started by registering your first company
          </p>
          <Button
            onClick={() => router.push("/recruiter/companies/register-company")}
            className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Register Company
          </Button>
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
