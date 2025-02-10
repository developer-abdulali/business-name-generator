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
import { setSingleJob } from "@/redux/slices/jobSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const PostAJobPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
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
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);

        dispatch(setSingleJob(res.data.job));
        router.push("/recruiter/jobs");
      }
    } catch (error) {
      console.log("error from submitHandler", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="flex items-center justify-center w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-3xl text-gray-900 dark:text-gray-100">
          Post a Job
        </h2>
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Title & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-900 dark:text-gray-100">Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Job Title"
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600"
              />
            </div>
            <div>
              <Label className="text-gray-900 dark:text-gray-100">
                Location
              </Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Location"
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Salary & Job Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-900 dark:text-gray-100">Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="Salary"
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600"
              />
            </div>
            <div>
              <Label className="text-gray-900 dark:text-gray-100">
                Job Type
              </Label>
              <Select
                onValueChange={(value) =>
                  setInput({ ...input, jobType: value })
                }
              >
                <SelectTrigger className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600">
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <SelectGroup>
                    <SelectItem
                      value="Full Time"
                      className="text-gray-900 dark:text-gray-100"
                    >
                      Full Time
                    </SelectItem>
                    <SelectItem
                      value="Part Time"
                      className="text-gray-900 dark:text-gray-100"
                    >
                      Part Time
                    </SelectItem>
                    <SelectItem
                      value="Contractual"
                      className="text-gray-900 dark:text-gray-100"
                    >
                      Contractual
                    </SelectItem>
                    <SelectItem
                      value="Internship"
                      className="text-gray-900 dark:text-gray-100"
                    >
                      Internship
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Experience & Position */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-900 dark:text-gray-100">
                Experience
              </Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="Experience"
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600"
              />
            </div>
            <div>
              <Label className="text-gray-900 dark:text-gray-100">
                Position
              </Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="Position"
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Description & Requirements */}
          <div>
            <Label className="text-gray-900 dark:text-gray-100">
              Description
            </Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Job Description"
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600"
            />
          </div>
          <div>
            <Label className="text-gray-900 dark:text-gray-100">
              Requirements
            </Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              placeholder="Job Requirements"
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600"
            />
          </div>

          {/* Company Select */}
          <div>
            <Label className="text-gray-900 dark:text-gray-100">Company</Label>
            {companies?.length > 0 ? (
              <Select onValueChange={changeSelectHandler}>
                <SelectTrigger className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company.name.toLowerCase()}
                        className="text-gray-900 dark:text-gray-100"
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No companies available
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
              className="w-full md:w-auto bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              type="submit"
              className="w-full md:w-auto bg-purple-600 hover:text-white dark:bg-purple-700 text-white hover:bg-purple-700 dark:hover:bg-purple-600"
            >
              Create Job
            </Button>
          </div>

          {/* Warning Message */}
          {companies?.length === 0 && (
            <p className="text-sm text-red-600 dark:text-red-400 font-bold text-center">
              *Please register a company before posting a job
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default PostAJobPage;
