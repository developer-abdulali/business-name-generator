// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { JOB_API_ENDPOINT } from "@/lib/constant";
// import { setSingleJob } from "@/redux/slices/jobSlice";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";

// const PostAJobPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [input, setInput] = useState({
//     title: "",
//     description: "",
//     requirements: "",
//     salary: "",
//     location: "",
//     jobType: "",
//     experience: "",
//     position: 0,
//     companyId: "",
//   });

//   const { companies } = useSelector((state) => state.company);

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const changeSelectHandler = (value) => {
//     const selectedCompany = companies.find(
//       (company) => company.name.toLowerCase() === value
//     );
//     setInput({ ...input, companyId: selectedCompany?._id });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         toast.success(res.data.message);

//         dispatch(setSingleJob(res.data.job));
//         router.push("/recruiter/jobs");
//       }
//     } catch (error) {
//       console.log("error from submitHandler", error);
//       toast.error(error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     document.title = "MERN Job Portal - Post A Job";
//   }, []);

//   return (
//     <section className="flex items-center justify-center w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//       <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
//         <h2 className="text-2xl font-bold mb-6 text-center md:text-3xl text-gray-900 dark:text-gray-100">
//           Post a Job
//         </h2>
//         <form onSubmit={submitHandler} className="space-y-6">
//           {/* Title & Location */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label className="text-gray-900 dark:text-gray-100">Title</Label>
//               <Input
//                 type="text"
//                 name="title"
//                 value={input.title}
//                 onChange={changeEventHandler}
//                 placeholder="Job Title"
//                 className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600"
//               />
//             </div>
//             <div>
//               <Label className="text-gray-900 dark:text-gray-100">
//                 Location
//               </Label>
//               <Input
//                 type="text"
//                 name="location"
//                 value={input.location}
//                 onChange={changeEventHandler}
//                 placeholder="Location"
//                 className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600"
//               />
//             </div>
//           </div>

//           {/* Salary & Job Type */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label className="text-gray-900 dark:text-gray-100">Salary</Label>
//               <Input
//                 type="text"
//                 name="salary"
//                 value={input.salary}
//                 onChange={changeEventHandler}
//                 placeholder="Salary"
//                 className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600"
//               />
//             </div>
//             <div>
//               <Label className="text-gray-900 dark:text-gray-100">
//                 Job Type
//               </Label>
//               <Select
//                 onValueChange={(value) =>
//                   setInput({ ...input, jobType: value })
//                 }
//               >
//                 <SelectTrigger className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600">
//                   <SelectValue placeholder="Select Job Type" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
//                   <SelectGroup>
//                     <SelectItem
//                       value="Full Time"
//                       className="text-gray-900 dark:text-gray-100"
//                     >
//                       Full Time
//                     </SelectItem>
//                     <SelectItem
//                       value="Part Time"
//                       className="text-gray-900 dark:text-gray-100"
//                     >
//                       Part Time
//                     </SelectItem>
//                     <SelectItem
//                       value="Contractual"
//                       className="text-gray-900 dark:text-gray-100"
//                     >
//                       Contractual
//                     </SelectItem>
//                     <SelectItem
//                       value="Internship"
//                       className="text-gray-900 dark:text-gray-100"
//                     >
//                       Internship
//                     </SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Experience & Position */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label className="text-gray-900 dark:text-gray-100">
//                 Experience
//               </Label>
//               <Input
//                 type="text"
//                 name="experience"
//                 value={input.experience}
//                 onChange={changeEventHandler}
//                 placeholder="Experience"
//                 className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600"
//               />
//             </div>
//             <div>
//               <Label className="text-gray-900 dark:text-gray-100">
//                 Position
//               </Label>
//               <Input
//                 type="number"
//                 name="position"
//                 value={input.position}
//                 onChange={changeEventHandler}
//                 placeholder="Position"
//                 className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600"
//               />
//             </div>
//           </div>

//           {/* Description & Requirements */}
//           <div>
//             <Label className="text-gray-900 dark:text-gray-100">
//               Description
//             </Label>
//             <Input
//               type="text"
//               name="description"
//               value={input.description}
//               onChange={changeEventHandler}
//               placeholder="Job Description"
//               className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600"
//             />
//           </div>
//           <div>
//             <Label className="text-gray-900 dark:text-gray-100">
//               Requirements
//             </Label>
//             <Input
//               type="text"
//               name="requirements"
//               value={input.requirements}
//               onChange={changeEventHandler}
//               placeholder="Job Requirements"
//               className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600"
//             />
//           </div>

//           {/* Company Select */}
//           <div>
//             <Label className="text-gray-900 dark:text-gray-100">Company</Label>
//             {companies?.length > 0 ? (
//               <Select onValueChange={changeSelectHandler}>
//                 <SelectTrigger className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600">
//                   <SelectValue placeholder="Select a Company" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
//                   <SelectGroup>
//                     {companies.map((company) => (
//                       <SelectItem
//                         key={company._id}
//                         value={company.name.toLowerCase()}
//                         className="text-gray-900 dark:text-gray-100"
//                       >
//                         {company.name}
//                       </SelectItem>
//                     ))}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             ) : (
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 No companies available
//               </p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex items-center justify-between">
//             <Button
//               variant="outline"
//               type="button"
//               onClick={() => router.back()}
//               className="w-full md:w-auto bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="outline"
//               type="submit"
//               className="w-full md:w-auto bg-purple-600 hover:text-white dark:bg-purple-700 text-white hover:bg-purple-700 dark:hover:bg-purple-600"
//             >
//               Create Job
//             </Button>
//           </div>

//           {/* Warning Message */}
//           {companies?.length === 0 && (
//             <p className="text-sm text-red-600 dark:text-red-400 font-bold text-center">
//               *Please register a company before posting a job
//             </p>
//           )}
//         </form>
//       </div>
//     </section>
//   );
// };

// export default PostAJobPage;

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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  Briefcase,
  Building2,
  CalendarDays,
  Clock,
  DollarSign,
  MapPin,
  ScrollText,
  Type,
  User,
  X,
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);

    try {
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message, {
          icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
        });
        dispatch(setSingleJob(res.data.job));
        router.push("/recruiter/jobs");
      }
    } catch (error) {
      console.log("error from submitHandler", error);
      toast.error(error.response.data.message, {
        icon: <AlertCircle className="w-4 h-4 text-red-500" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    document.title = "MERN Job Portal - Post A Job";
  }, []);

  return (
    <section className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
        {/* Form Header */}
        <div className="bg-purple-600 dark:bg-purple-700 p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-white hover:bg-purple-700 dark:hover:bg-purple-600"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-bold text-center text-white flex items-center gap-2">
              <Briefcase className="h-6 w-6" />
              Post a New Job
            </h2>
            <div className="w-10"></div> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Title & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Job Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  placeholder="e.g. Senior Frontend Developer"
                  className="bg-gray-50 dark:bg-gray-700"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="e.g. Remote, New York, etc."
                  className="bg-gray-50 dark:bg-gray-700"
                  required
                />
              </div>
            </div>

            {/* Salary & Job Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="salary" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Salary Range
                </Label>
                <Input
                  id="salary"
                  type="text"
                  name="salary"
                  value={input.salary}
                  onChange={changeEventHandler}
                  placeholder="e.g. $80,000 - $100,000"
                  className="bg-gray-50 dark:bg-gray-700"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobType" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Job Type
                </Label>
                <Select
                  onValueChange={(value) =>
                    setInput({ ...input, jobType: value })
                  }
                  required
                >
                  <SelectTrigger className="bg-gray-50 dark:bg-gray-700">
                    <SelectValue placeholder="Select employment type" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="experience" className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Experience Level
                </Label>
                <Input
                  id="experience"
                  type="text"
                  name="experience"
                  value={input.experience}
                  onChange={changeEventHandler}
                  placeholder="e.g. 3+ years, Entry Level, etc."
                  className="bg-gray-50 dark:bg-gray-700"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Open Positions
                </Label>
                <Input
                  id="position"
                  type="number"
                  name="position"
                  min="1"
                  value={input.position}
                  onChange={changeEventHandler}
                  placeholder="Number of open positions"
                  className="bg-gray-50 dark:bg-gray-700"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <ScrollText className="h-4 w-4" />
                Job Description
              </Label>
              <textarea
                id="description"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Detailed description of the job responsibilities..."
                className="flex h-32 w-full rounded-md border border-input bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <Label htmlFor="requirements" className="flex items-center gap-2">
                <ScrollText className="h-4 w-4" />
                Requirements
              </Label>
              <textarea
                id="requirements"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="List the required skills, qualifications, and experience..."
                className="flex h-32 w-full rounded-md border border-input bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
              <p className="text-xs text-muted-foreground">
                Separate requirements with commas or bullet points
              </p>
            </div>

            {/* Company Select */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Company
              </Label>
              {companies?.length > 0 ? (
                <Select onValueChange={changeSelectHandler} required>
                  <SelectTrigger className="bg-gray-50 dark:bg-gray-700">
                    <SelectValue placeholder="Select your company" />
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
                <div className="flex items-center gap-2 text-sm text-red-500 dark:text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <span>
                    You need to register a company before posting a job.{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/recruiter/company")}
                      className="underline hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      Register Company
                    </button>
                  </span>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="w-full sm:w-auto flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 flex items-center gap-2"
                disabled={isSubmitting || companies?.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Posting...
                  </>
                ) : (
                  <>
                    <Briefcase className="h-4 w-4" />
                    Post Job
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PostAJobPage;
