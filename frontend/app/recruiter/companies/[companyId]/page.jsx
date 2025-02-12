"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { COMPANY_API_ENDPOINT } from "@/lib/constant";
import axios from "axios";
import { ArrowLeft, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const CompanyDescription = () => {
  const params = useParams();
  const router = useRouter();
  useGetCompanyById(params.companyId);
  const { singleCompany } = useSelector((state) => state.company);
  const { user } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [showRemoveIcon, setShowRemoveIcon] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setHasChanges(true);
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      setHasChanges(true);
      setShowRemoveIcon(true);
    }
  };

  const removeFileHandler = () => {
    setInput({ ...input, file: null });
    setShowRemoveIcon(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!hasChanges) {
      router.push("/recruiter/companies");
      return;
    }
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "MERN Job Portal - Company Setup";
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.logo || null,
    });
    setHasChanges(false);
    setShowRemoveIcon(!!singleCompany?.logo);
  }, [singleCompany]);

  return (
    <section className="max-w-screen-2xl mx-auto my-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <form onSubmit={submitHandler} className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => router.push("/recruiter/companies")}
            variant="ghost"
            className="flex items-center gap-2 font-semibold bg-purple-600 hover:text-white dark:bg-purple-700 text-white hover:bg-purple-700 dark:hover:bg-purple-600"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-2xl text-center w-full text-gray-900 dark:text-gray-100">
            Company Setup
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="block mb-2 text-gray-900 dark:text-gray-100">
              Company Name
            </Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Company Name"
              disabled={loading}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <Label className="block mb-2 text-gray-900 dark:text-gray-100">
              Description
            </Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Company description"
              disabled={loading}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <Label className="block mb-2 text-gray-900 dark:text-gray-100">
              Website
            </Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              placeholder="Company website"
              disabled={loading}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <Label className="block mb-2 text-gray-900 dark:text-gray-100">
              Location
            </Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              placeholder="Company location"
              disabled={loading}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="md:col-span-2 relative">
            <Label className="block mb-2 text-gray-900 dark:text-gray-100">
              Logo
            </Label>
            <div className="relative">
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {showRemoveIcon && (
                <button
                  type="button"
                  onClick={removeFileHandler}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          type="submit"
          className="bg-purple-600 hover:text-white dark:bg-purple-700 text-white hover:bg-purple-700 dark:hover:bg-purple-600"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </form>
    </section>
  );
};

export default CompanyDescription;
