import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
  const isApplied = true;

  return (
    <div className="wrapper my-10 px-4 xl:px-0">
      {/* Job Title */}
      <h2 className="font-bold text-2xl text-gray-800 mb-6">
        Frontend Developer
      </h2>

      {/* Badges and Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="text-blue-700 font-medium bg-blue-50 px-4 py-2 rounded-full">
            12 Positions
          </Badge>
          <Badge className="text-red-700 font-medium bg-red-50 px-4 py-2 rounded-full">
            Full Time
          </Badge>
          <Badge className="text-purple-700 font-medium bg-purple-50 px-4 py-2 rounded-full">
            PKR: 66,000
          </Badge>
        </div>

        {/* Apply Now Button */}
        <Button
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 text-white transition-all ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-800"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Details */}
      <div className="mt-8">
        <p className="border-b-2 border-gray-300 font-medium text-lg pb-2">
          Job Details
        </p>
        <div className="mt-4 space-y-3">
          <p className="font-semibold text-gray-700">
            Role:{" "}
            <span className="pl-4 font-normal text-gray-800">
              Frontend Developer
            </span>
          </p>
          <p className="font-semibold text-gray-700">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">Shikarpur</span>
          </p>
          <p className="font-semibold text-gray-700">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
              aliquid.
            </span>
          </p>
          <p className="font-semibold text-gray-700">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">1+ years</span>
          </p>
          <p className="font-semibold text-gray-700">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">
              PKR: 66,000 - 80,000
            </span>
          </p>
          <p className="font-semibold text-gray-700">
            Total Applications:{" "}
            <span className="pl-4 font-normal text-gray-800">3</span>
          </p>
          <p className="font-semibold text-gray-700">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">12-12-2013</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
