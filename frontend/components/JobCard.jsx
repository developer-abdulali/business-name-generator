import { Bookmark, BookmarkMinus } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import daysAgoFunction from "@/lib/daysAgoFunction";
import { useRouter } from "next/navigation";

const JobCard = ({ job }) => {
  const router = useRouter();
  const truncateDescription = (description, maxLength) => {
    if (!description) return "";
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "...";
  };

  const isSaved = false;

  return (
    <section
      onClick={() => router.push(`/jobs/${job._id}`)}
      className="p-5 rounded-lg shadow-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105"
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </span>
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          variant="outline"
          className="px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-purple-600 hover:text-white"
        >
          {isSaved ? (
            <>
              <BookmarkMinus /> Remove
            </>
          ) : (
            <>
              <Bookmark /> Save
            </>
          )}
        </Button>
      </div>
      <div className="flex items-center mb-4">
        {job.company?.logo ? (
          <Avatar>
            <AvatarImage
              src={job?.company?.logo}
              alt={job?.company?.name}
              className="object-contain"
            />
          </Avatar>
        ) : (
          <Avatar>
            <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {job?.company?.name.charAt(0)}
            </span>
          </Avatar>
        )}
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {job?.company?.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 -mt-1">
            {job?.location}
          </p>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        {job?.title}
      </h2>
      <p className="text-gray-700 dark:text-gray-400 mb-4">
        {truncateDescription(job?.description, 100)}
      </p>
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800">
          {job?.jobType}
        </Badge>
        <Badge className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-800">
          {job?.salary} PKR
        </Badge>
        <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800">
          {job?.experienceLevel} Experience
        </Badge>
      </div>
    </section>
  );
};

export default JobCard;
