"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COMPANY_API_ENDPOINT } from "@/lib/constant";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const CompanyDescription = () => {
  const { singleCompany } = useSelector((state) => state.company);

  const params = useParams();
  const router = useRouter();
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("logo", input.file);
    try {
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
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
        router.push("/admin/companies");
      }
    } catch (error) {
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
  }, [singleCompany]);

  return (
    <section className="max-w-xl mx-auto my-10">
      <form onSubmit={submitHandler}>
        <div className="flex items-center gap-5">
          <Button
            onClick={() => router.push("/admin/companies")}
            variant={"ghost"}
            className="flex items-center gap-2 text-gray-500 font-semibold"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-xl">Company Setup</h1>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Label>Company Name</Label>
          <Input
            type="text"
            name="name"
            value={input.name}
            onChange={changeEventHandler}
          />

          <Label>Description</Label>
          <Input
            type="text"
            name="description"
            value={input.description}
            onChange={changeEventHandler}
          />

          <Label>Website</Label>
          <Input
            type="text"
            name="website"
            value={input.website}
            onChange={changeEventHandler}
          />

          <Label>Location</Label>
          <Input
            type="text"
            name="location"
            value={input.location}
            onChange={changeEventHandler}
          />

          <Label>Logo</Label>
          <Input type="file" accept="image/*" onChange={changeFileHandler} />
        </div>
        <Button type="submit" className="w-full mt-5">
          Save
        </Button>
      </form>
    </section>
  );
};
export default CompanyDescription;
