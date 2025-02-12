import {
  MapPin,
  Clock,
  Building,
  ArrowRight,
  Users,
  PiggyBank,
} from "lucide-react";
import Link from "next/link";

const LatestJobCard = ({ job }) => {
  const truncateDescription = (description, maxLength) => {
    if (description?.length <= maxLength) return description;
    return description?.substring(0, maxLength) + "...";
  };

  const formatSalary = (salary) => {
    return salary?.toLocaleString();
  };

  return (
    <section className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-700 cursor-pointer">
      {/* Company Info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Building className="w-4 h-4 text-gray-400 dark:text-gray-600" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {job?.company?.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{job?.location}</span>
          </div>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          {job?.title}
        </h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {truncateDescription(job?.description, 100)}
        </p>
      </div>

      {/* Job Details */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-gray-600 dark:text-gray-400">
            {job?.position} Positions
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-red-600 dark:text-red-400" />
          <span className="text-gray-600 dark:text-gray-400">
            {job?.jobType}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm col-span-2">
          <PiggyBank className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-gray-600 dark:text-gray-400">
            {formatSalary(job?.salary)} PKR
          </span>
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-6">
        <Link
          href={`/jobs/${job?._id}`}
          className="w-full bg-gray-50 dark:bg-gray-700 text-purple-600 dark:text-purple-400 font-medium py-2 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white"
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default LatestJobCard;
