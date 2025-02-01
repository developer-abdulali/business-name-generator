"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { COMPANY_API_ENDPOINT } from "@/lib/constant";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const CompanyDescription = () => {
  const params = useParams();
  const router = useRouter();
  useGetCompanyById(params.companyId);
  const { singleCompany } = useSelector((state) => state.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setHasChanges(true);
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
    setHasChanges(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!hasChanges) {
      router.push("/recruiter/companies");
      return;
    }

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("logo", input.file);
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/update/${params.companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/recruiter/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null,
    });
    setHasChanges(false);
  }, [singleCompany]);

  return (
    <section className="max-w-xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={submitHandler} className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => router.push("/recruiter/companies")}
            variant={"ghost"}
            className="flex items-center gap-2 text-gray-500 font-semibold"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-2xl text-center w-full">
            Company Setup
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="block mb-2">Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <Label className="block mb-2">Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <Label className="block mb-2">Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <Label className="block mb-2">Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="md:col-span-2">
            <Label className="block mb-2">Logo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <Button type="submit">Save</Button>
      </form>
    </section>
  );
};

export default CompanyDescription;
