"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JOB_API_ENDPOINT } from "@/lib/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const PostAJobPage = () => {
  const router = useRouter();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const { companies } = useSelector((state) => state.company);
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeSelectHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany?._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/admin/jobs");
      }
    } catch (error) {
      console.log("error from submitHandler", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center w-full min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-3xl">
          Post a Job
        </h2>
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Title & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Job Title"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Location"
              />
            </div>
          </div>

          {/* Salary & Job Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="Salary"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Select
                onValueChange={(value) =>
                  setInput({ ...input, jobType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Full Time">Full Time</SelectItem>
                    <SelectItem value="Part Time">Part Time</SelectItem>
                    <SelectItem value="Contractual">Contractual</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Experience & Position */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Experience</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="Experience"
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="Position"
              />
            </div>
          </div>

          {/* Description & Requirements */}
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Job Description"
            />
          </div>
          <div>
            <Label>Requirements</Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              placeholder="Job Requirements"
            />
          </div>

          {/* Company Select */}
          <div>
            <Label>Company</Label>
            {companies?.length > 0 ? (
              <Select onValueChange={changeSelectHandler}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company.name.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-gray-500">No companies available</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" className="w-full md:w-auto">
              Post Job
            </Button>
          </div>

          {/* Warning Message */}
          {companies?.length === 0 && (
            <p className="text-sm text-red-600 font-bold text-center">
              *Please register a company before posting a job
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default PostAJobPage;
