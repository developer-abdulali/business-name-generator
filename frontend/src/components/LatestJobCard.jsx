import { Badge } from "./ui/badge";

const LatestJobCard = () => {
  return (
    <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 cursor-pointer transform transition-transform hover:scale-105 duration-300 max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-semibold text-lg sm:text-xl lg:text-2xl text-gray-800">
          Company Name
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-2 sm:mt-0">
          Pakistan
        </p>
      </div>

      {/* Job Details Section */}
      <div className="mt-4">
        <p className="font-bold text-md sm:text-lg lg:text-xl text-gray-900">
          Job Title
        </p>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
          nobis!
        </p>
      </div>

      {/* Badges Section */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4">
        <Badge className="text-blue-700 font-medium bg-blue-50 px-3 py-1 rounded-full">
          12 Positions
        </Badge>
        <Badge className="text-[#F83002] font-medium bg-red-50 px-3 py-1 rounded-full">
          Full Time
        </Badge>
        <Badge className="text-[#7209b7] font-medium bg-purple-50 px-3 py-1 rounded-full">
          PKR: 66,000
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
