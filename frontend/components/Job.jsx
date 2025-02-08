// "use client";
// import { useRouter } from "next/navigation";
// import { Bookmark } from "lucide-react";
// import { Button } from "./ui/button";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Badge } from "./ui/badge";
// import daysAgoFunction from "@/lib/daysAgoFunction";

// const Job = ({ job }) => {
//   const router = useRouter();

//   const truncateDescription = (description, maxLength) => {
//     if (description.length <= maxLength) {
//       return description;
//     }
//     return description.substring(0, maxLength) + "...";
//   };

//   return (
//     <section
//       onClick={() => router.push(`/jobs/${job?._id}`)}
//       className="p-5 rounded-lg shadow-md bg-white border border-gray-100 hover:shadow-lg cursor-pointer "
//     >
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-gray-500">
//           {daysAgoFunction(job?.createdAt) === 0
//             ? "Today"
//             : `${daysAgoFunction(job?.createdAt)} days ago`}
//         </p>
//         {/* Prevent navigation when clicking the button */}
//         <Button
//           title="Save For Later"
//           className="rounded-full"
//           variant="outline"
//           size="icon"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <Bookmark />
//         </Button>
//       </div>

//       <div className="flex items-center gap-4 my-4">
//         {job?.company?.logo === null ? (
//           <Avatar>
//             <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_dnoBTEnG6YrkmO5hSZwEykg1w6cjdO1gFg&s" />
//           </Avatar>
//         ) : (
//           <Avatar>
//             <AvatarImage src={job?.company?.logo} className="object-contain" />
//           </Avatar>
//         )}
//         <div>
//           <p className="font-medium text-lg">{job?.company?.name}</p>
//           <p className="text-sm text-gray-500">{job?.location}</p>
//         </div>
//       </div>

//       <div>
//         <p className="font-bold text-lg mb-2">{job?.title}</p>
//         <p className="text-sm text-gray-600 leading-relaxed">
//           {truncateDescription(job?.description, 100)}
//         </p>
//       </div>

//       <div className="flex flex-wrap items-center gap-2 mt-4">
//         <Badge
//           variant="secondary"
//           className="text-blue-700 font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
//         >
//           {job?.position} Positions
//         </Badge>
//         <Badge
//           variant="secondary"
//           className="text-customRedColor font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
//         >
//           {job?.jobType}
//         </Badge>
//         <Badge
//           variant="secondary"
//           className="text-customColor font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
//         >
//           {job?.salary} PKR
//         </Badge>
//         <Badge
//           variant="secondary"
//           className="text-customColor font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
//         >
//           {job?.experienceLevel} Experience
//         </Badge>
//       </div>
//     </section>
//   );
// };

// export default Job;

"use client";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import daysAgoFunction from "@/lib/daysAgoFunction";

const Job = ({ job }) => {
  const router = useRouter();

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "...";
  };

  return (
    <div
      onClick={() => router.push(`/jobs/${job?._id}`)}
      className="p-5 rounded-lg shadow-md bg-white border border-gray-100 hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105"
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500 text-sm">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </span>
        <Button
          onClick={(e) => e.stopPropagation()}
          variant="outline"
          className="px-3 py-1 text-gray-700"
        >
          <Bookmark className="mr-1" /> Save
        </Button>
      </div>
      <div className="flex items-center mb-4">
        {job?.company?.logo ? (
          <Avatar>
            <AvatarImage
              src={job?.company?.logo}
              alt={job?.company?.name}
              className="object-contain"
            />
          </Avatar>
        ) : (
          <Avatar>
            <span className="text-xl font-semibold">
              {job?.company?.name.charAt(0)}
            </span>
          </Avatar>
        )}
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{job?.company?.name}</h3>
          <p className="text-gray-600">{job?.location}</p>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">{job?.title}</h2>
      <p className="text-gray-700 mb-4">
        {truncateDescription(job?.description, 100)}
      </p>
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-blue-100 text-blue-800">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-green-100 text-green-800">{job?.jobType}</Badge>
        <Badge className="bg-yellow-100 text-yellow-800">
          {job?.salary} PKR
        </Badge>
        <Badge className="bg-purple-100 text-purple-800">
          {job?.experienceLevel} Experience
        </Badge>
      </div>
    </div>
  );
};

export default Job;
