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
        <Badge
          variant="secondary"
          className="text-black font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
        >
          12 Positions
        </Badge>
        <Badge variant="secondary">Full Time</Badge>
        <Badge variant="secondary">PKR: 66,000</Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
