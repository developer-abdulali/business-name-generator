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
        console.log(res);
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="font-bold text-xl my-5">
        Applicants {applicants?.applications?.length}
      </h1>
      <ApplicantsTable />
    </section>
  );
};
export default ApplicantsPage;
