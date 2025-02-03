"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { setSearchJobByText } from "@/redux/slices/jobSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useGetAllRecruiterJobs from "@/hooks/useGetAllRecruiterJobs";
import RecruiterJobsTable from "@/components/RecruiterJobsTable";

const RecruiterJobsPage = () => {
  const router = useRouter();
  useGetAllRecruiterJobs();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  const handleClearInput = () => {
    setInput("");
    dispatch(setSearchJobByText(""));
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
          onClick={() => router.push("/recruiter/jobs/post-job")}
        >
          New Job
        </Button>
      </div>
      <RecruiterJobsTable />
    </section>
  );
};

export default RecruiterJobsPage;
