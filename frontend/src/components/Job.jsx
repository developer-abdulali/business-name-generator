// import { Bookmark } from "lucide-react";
// import { Button } from "./ui/button";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Badge } from "./ui/badge";

// const Job = () => {
//   return (
//     <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-gray-500">2 days ago</p>
//         <Button className="rounded-full" size="icon">
//           <Bookmark />
//         </Button>
//       </div>

//       <div className="flex items-center gap-2 my-2">
//         <Button className="p-6" size="icon">
//           <Avatar>
//             <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ar2jfvrUv7Ljjxpfu8UkQ0wNho_x8hRVHA&s" />
//           </Avatar>
//         </Button>
//         <div>
//           <p className="font-medium text-lg">Company Name</p>
//           <p className="text-sm text-gray-500">Pakistan</p>
//         </div>
//       </div>

//       <div>
//         <p className="font-bold text-lg my-2">Title</p>
//         <p className="text-sm text-gray-600">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
//           quam quidem quisquam debitis dolorum ut ipsa expedita, iusto aliquam
//           consectetur!
//         </p>
//       </div>

//       <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4">
//         <Badge className="text-blue-700 font-medium bg-blue-50 px-3 py-1 rounded-full">
//           12 Positions
//         </Badge>
//         <Badge className="text-[#F83002] font-medium bg-red-50 px-3 py-1 rounded-full">
//           Full Time
//         </Badge>
//         <Badge className="text-[#7209b7] font-medium bg-purple-50 px-3 py-1 rounded-full">
//           PKR: 66,000
//         </Badge>
//       </div>

//       <div className="flex items-center gap-4 mt-4">
//         <Button variant="primary" size="medium">
//           Details
//         </Button>
//         <Button className="text-[#7209b7]">Save For Later</Button>
//       </div>
//     </div>
//   );
// };
// export default Job;

import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const Job = () => {
  return (
    <div className="p-5 rounded-lg shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-4 my-4">
        <Avatar>
          <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ar2jfvrUv7Ljjxpfu8UkQ0wNho_x8hRVHA&s" />
        </Avatar>
        <div>
          <p className="font-medium text-lg">Company Name</p>
          <p className="text-sm text-gray-500">Pakistan</p>
        </div>
      </div>

      <div>
        <p className="font-bold text-lg mb-2">Title</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          quam quidem quisquam debitis dolorum ut ipsa expedita, iusto aliquam
          consectetur!
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
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

      <div className="flex items-center gap-4 mt-6">
        <Button variant="primary" size="medium">
          Details
        </Button>
        <Button className="text-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
