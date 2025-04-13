// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { X } from "lucide-react";
// import { setSearchJobByText } from "@/redux/slices/jobSlice";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import useGetAllRecruiterJobs from "@/hooks/useGetAllRecruiterJobs";
// import RecruiterJobsTable from "@/components/RecruiterJobsTable";
// import Loading from "@/components/shared/Loading";

// const RecruiterJobsPage = () => {
//   const router = useRouter();
//   const { loading, error } = useGetAllRecruiterJobs();
//   const [input, setInput] = useState("");
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setSearchJobByText(input));
//     document.title = "MERN Job Portal - Created Jobs";
//   }, [input, dispatch]);

//   const handleClearInput = () => {
//     setInput("");
//     dispatch(setSearchJobByText(""));
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   if (error) {
//     return <div>Error loading jobs: {error}</div>;
//   }

//   return (
//     <section className="max-w-screen-2xl mx-auto h-screen my-10">
//       <div className="flex items-center gap-3 sm:justify-between mx-3 my-5 2xl:mx-0">
//         <div className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
//           <Input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="pr-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
//             placeholder="Search by name, role, location"
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
//           onClick={() => router.push("/recruiter/jobs/post-job")}
//           className="w-auto bg-purple-600 hover:text-white dark:bg-purple-700 text-white hover:bg-purple-700 dark:hover:bg-purple-600"
//         >
//           Create New Job
//         </Button>
//       </div>
//       <RecruiterJobsTable />
//     </section>
//   );
// };

// export default RecruiterJobsPage;

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  X,
  PlusCircle,
  Search,
  AlertCircle,
  Building2,
  ChartNoAxesGantt,
} from "lucide-react";
import { setSearchJobByText } from "@/redux/slices/jobSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useGetAllRecruiterJobs from "@/hooks/useGetAllRecruiterJobs";
import RecruiterJobsTable from "@/components/RecruiterJobsTable";
import Loading from "@/components/shared/Loading";

const RecruiterJobsPage = () => {
  const router = useRouter();
  const { loading, error } = useGetAllRecruiterJobs();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
    document.title = "MERN Job Portal - Created Jobs";
  }, [input, dispatch]);

  const handleClearInput = () => {
    setInput("");
    dispatch(setSearchJobByText(""));
  };

  if (loading) {
    return <Loading loadingText="Loading jobs.." />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 text-red-500">
        <AlertCircle className="w-12 h-12" />
        <p className="text-2xl font-medium">Error loading jobs</p>
        <p className="text-lg">{error}</p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <section className="max-w-screen-2xl mx-auto h-screen px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <ChartNoAxesGantt className="h-6 w-6" />
            Your Posted Jobs
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Manage all created jobs
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-10 pr-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
              placeholder="Search jobs..."
            />
            {input && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={handleClearInput}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <Button
            onClick={() => router.push("/recruiter/jobs/post-job")}
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Job
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
        <RecruiterJobsTable />
      </div>
    </section>
  );
};

export default RecruiterJobsPage;
