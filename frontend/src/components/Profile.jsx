// import { Contact, Mail, Pen } from "lucide-react";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { Label } from "./ui/label";
// import AppliedJobsTable from "./AppliedJobsTable";

// const skillsData = ["HTML", "CSS", "JavaScript", "TypeScript", "React"];

// const Profile = () => {
//   const haveResume = true;

//   return (
//     <div>
//       <div className="max-w-4xl mx-auto bg-white border border-gray-200 my-5 p-8">
//         <div className="flex justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar className="h-24 w-24">
//               <AvatarImage
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ar2jfvrUv7Ljjxpfu8UkQ0wNho_x8hRVHA&s"
//                 alt="profile img"
//               />
//             </Avatar>

//             <div>
//               <h2 className="text-xl font-mediumk">Full Name</h2>
//               <p>
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 Repudiandae, harum.
//               </p>
//             </div>
//           </div>
//           <Button className="text-right">
//             <Pen />
//           </Button>
//         </div>

//         <div className="my-3">
//           <div className="flex items-center gap-3 my-2">
//             <Mail />
//             <span>ali@gmail.com</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <Contact />
//             <span>3331122123</span>
//           </div>
//         </div>

//         <div>
//           <p className="my-3">Skills</p>
//           <div className="flex items-center gap-1">
//             {skillsData.length !== 0 ? (
//               skillsData.map((item, i) => (
//                 <Badge className="bg-gray-100" key={i}>
//                   {item}
//                 </Badge>
//               ))
//             ) : (
//               <span>NA</span>
//             )}
//           </div>

//           {/* resume */}
//           <div className="mt-3 grid w-full max-w-sm items-center gap-1.5">
//             <Label className="text-md font-bold">Resume</Label>
//             {haveResume ? (
//               <a
//                 href="https://github.com/developer-abdulali"
//                 target="_blank"
//                 className="text-blue-500 w-full cursor-pointer hover:underline"
//               >
//                 Developer Abdul Ali
//               </a>
//             ) : (
//               <span>NA</span>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* applied jobs table */}
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl">
//         <p className="font-bold text-lg my-5">Applied Jobs</p>
//         <AppliedJobsTable />
//       </div>
//     </div>
//   );
// };
// export default Profile;

import { Contact, Mail, Pen } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTable from "./AppliedJobsTable";

const skillsData = ["HTML", "CSS", "JavaScript", "TypeScript", "React"];

const Profile = () => {
  const haveResume = true;

  return (
    <div className="px-4 py-8 bg-gray-50">
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ar2jfvrUv7Ljjxpfu8UkQ0wNho_x8hRVHA&s"
                alt="profile img"
              />
            </Avatar>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Full Name
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae, harum.
              </p>
            </div>
          </div>
          <Button className="mt-4 sm:mt-0 text-gray-700 hover:bg-gray-100">
            <Pen className="w-5 h-5" />
          </Button>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-3 my-2">
            <Mail className="text-gray-500 w-5 h-5" />
            <span className="text-gray-700">ali@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-gray-500 w-5 h-5" />
            <span className="text-gray-700">3331122123</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-semibold text-gray-800">Skills</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {skillsData.length !== 0 ? (
              skillsData.map((item, i) => (
                <Badge
                  key={i}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-600">NA</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-6">
          <Label className="text-md font-semibold text-gray-800">Resume</Label>
          {haveResume ? (
            <a
              href="https://github.com/developer-abdulali"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-1 text-blue-500 hover:underline"
            >
              Developer Abdul Ali
            </a>
          ) : (
            <span className="text-gray-600">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white mt-8 rounded-lg shadow-md p-6 sm:p-8">
        <p className="font-bold text-lg text-gray-800 mb-4">Applied Jobs</p>
        <AppliedJobsTable />
      </div>
    </div>
  );
};

export default Profile;
