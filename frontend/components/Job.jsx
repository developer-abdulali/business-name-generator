"use client";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import daysAgoFunction from "@/lib/daysAgoFunction";

const Job = ({ job }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/jobs/${job?._id}`)}
      className="p-5 rounded-lg shadow-lg bg-white border border-gray-100 hover:shadow-xl cursor-pointer hover:scale-105 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        {/* Prevent navigation when clicking the button */}
        <Button
          title="Save For Later"
          className="rounded-full"
          variant="outline"
          size="icon"
          onClick={(e) => e.stopPropagation()}
        >
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-4 my-4">
        <Avatar>
          <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ar2jfvrUv7Ljjxpfu8UkQ0wNho_x8hRVHA&s" />
        </Avatar>
        <div>
          <p className="font-medium text-lg">{job?.company?.name}</p>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <p className="font-bold text-lg mb-2">{job?.title}</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge
          variant="secondary"
          className="text-blue-700 font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          variant="secondary"
          className="text-customRedColor font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
        >
          {job?.jobType}
        </Badge>
        <Badge
          variant="secondary"
          className="text-customColor font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
        >
          {job?.salary} PKR
        </Badge>
      </div>
    </div>
  );
};

export default Job;
