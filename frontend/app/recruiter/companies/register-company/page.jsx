"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COMPANY_API_ENDPOINT } from "@/lib/constant";
import { setSingleCompany } from "@/redux/slices/companySlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const RegisterCompanyPage = () => {
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const router = useRouter();

  const registerCompanyHandler = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        { withCredentials: true }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res?.data?.message);
        const companyId = res?.data?.company?._id;
        router.push(`/recruiter/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = "MERN Job Portal - Register Company";
  }, []);

  return (
    <section className="max-w-screen-2xl mx-auto px-4">
      <div className="my-10">
        <h1 className="font-bold text-2xl text-gray-900 dark:text-gray-100">
          Your Company Name
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          What would you like to give your company name? You can change it
          later.
        </p>
      </div>
      <Label className="text-gray-900 dark:text-gray-100">Company Name</Label>
      <Input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="JobHunt, Microsoft etc."
        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
      />

      <div className="flex items-center gap-2 my-10">
        <Button
          onClick={() => router.push("/recruiter/companies")}
          variant="outline"
          className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          onClick={registerCompanyHandler}
          className="bg-purple-600 hover:text-white dark:bg-purple-700 text-white hover:bg-purple-700 dark:hover:bg-purple-600"
        >
          Continue
        </Button>
      </div>
    </section>
  );
};

export default RegisterCompanyPage;
