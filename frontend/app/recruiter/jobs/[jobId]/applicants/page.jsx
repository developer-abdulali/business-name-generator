"use client";
import ApplicantsTable from "@/components/ApplicantsTable";
import { APPLICATION_API_ENDPOINT } from "@/lib/constant";
import { setAllApplicants } from "@/redux/slices/applicationSlice";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ApplicantsPage = () => {
  const params = useParams();
  const jobId = params.jobId;
  const dispatch = useDispatch();
  const { applicants } = useSelector((state) => state.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${jobId}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [dispatch, jobId]);

  return (
    <section className="mb-5 max-w-screen-2xl mx-auto px-4 sm:px-6 2xl:px-0">
      <h1 className="font-bold text-xl my-5 dark:text-white">
        Applicants {applicants?.applications?.length}
      </h1>
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
        <ApplicantsTable />
      </div>
    </section>
  );
};
export default ApplicantsPage;
