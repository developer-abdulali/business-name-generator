// import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
// import { Label } from "./ui/label";

// const filterData = [
//   {
//     filterType: "Location",
//     options: [
//       "Shikarpur",
//       "Sukkur",
//       "Hyderabad",
//       "Nawabshah",
//       "Karachi",
//       "Islamabad",
//     ],
//   },
//   {
//     filterType: "Industry",
//     options: ["IT", "Finance", "Marketing", "Engineering", "Healthcare"],
//   },
//   {
//     filterType: "Job Type",
//     options: ["Full Time", "Part Time", "Contract", "Internship"],
//   },
//   {
//     filterType: "Experience",
//     options: ["0-3 years", "3-5 years", "5-10 years", "10+ years"],
//   },
//   {
//     filterType: "Salary",
//     options: [
//       "10-20k",
//       "20-30k",
//       "30-40k",
//       "40-50k",
//       "50-60k",
//       "60-80k",
//       "80-100k",
//     ],
//   },
//   {
//     filterType: "Job",
//     options: [
//       "Software Engineer",
//       "Frontend Developer",
//       "Backend Developer",
//       "Data Analyst",
//     ],
//   },
// ];

// const Filters = () => {
//   return (
//     <div>
//       <p>Filter Job</p>
//       <hr className="mt-3" />

//       <RadioGroup>
//         {filterData?.map((data, i) => (
//           <div key={i}>
//             <p className="font-bold text-lg">{data.filterType}</p>
//             {data?.options?.map((item, i) => {
//               return (
//                 <div
//                   key={`${data.filterType}-${i}`}
//                   className="flex items-center space-x-2 my-2"
//                 >
//                   <RadioGroupItem value={item} />
//                   <Label>{item}</Label>
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </RadioGroup>
//     </div>
//   );
// };
// export default Filters;

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    options: ["Shikarpur", "Sukkur", "Hyderabad", "Karachi", "Islamabad"],
  },
  {
    filterType: "Industry",
    options: ["IT", "Finance", "Marketing", "Engineering", "Healthcare"],
  },
  {
    filterType: "Job Type",
    options: ["Full Time", "Part Time", "Contract", "Internship"],
  },
  {
    filterType: "Experience",
    options: ["0-3 years", "3-5 years", "5-10 years", "10+ years"],
  },
  {
    filterType: "Salary",
    options: ["10-20k", "20-30k", "30-40k", "40-50k", "50-60k", "60-80k"],
  },
];

const Filters = () => {
  const [openFilters, setOpenFilters] = useState({});

  const toggleFilter = (filterType) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  return (
    <div className="p-4">
      <p className="text-xl font-bold mb-3 text-gray-800">Filters</p>
      <hr className="mb-4" />

      <RadioGroup>
        {filterData.map((data, i) => (
          <div key={i} className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFilter(data.filterType)}
            >
              <p className="font-semibold text-lg">{data.filterType}</p>
              {openFilters[data.filterType] ? (
                <ChevronUp className="text-gray-600" />
              ) : (
                <ChevronDown className="text-gray-600" />
              )}
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openFilters[data.filterType] ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="mt-2 space-y-2">
                {data.options.map((item, index) => (
                  <div
                    key={`${data.filterType}-${index}`}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value={item} />
                    <Label>{item}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filters;

// import { useState } from "react";
// import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
// import { Label } from "./ui/label";
// import { ChevronDown, ChevronUp } from "lucide-react";

// const filterData = [
//   {
//     filterType: "Location",
//     options: [
//       "Shikarpur",
//       "Sukkur",
//       "Hyderabad",
//       "Nawabshah",
//       "Karachi",
//       "Islamabad",
//     ],
//   },
//   {
//     filterType: "Industry",
//     options: ["IT", "Finance", "Marketing", "Engineering", "Healthcare"],
//   },
//   {
//     filterType: "Job Type",
//     options: ["Full Time", "Part Time", "Contract", "Internship"],
//   },
//   {
//     filterType: "Experience",
//     options: ["0-3 years", "3-5 years", "5-10 years", "10+ years"],
//   },
//   {
//     filterType: "Salary",
//     options: [
//       "10-20k",
//       "20-30k",
//       "30-40k",
//       "40-50k",
//       "50-60k",
//       "60-80k",
//       "80-100k",
//     ],
//   },
//   {
//     filterType: "Job",
//     options: [
//       "Software Engineer",
//       "Frontend Developer",
//       "Backend Developer",
//       "Data Analyst",
//     ],
//   },
// ];

// const Filters = () => {
//   const [openFilters, setOpenFilters] = useState({});

//   // Toggle filter visibility
//   const toggleFilter = (filterType) => {
//     setOpenFilters((prev) => ({
//       ...prev,
//       [filterType]: !prev[filterType],
//     }));
//   };

//   return (
//     <div className="p-4">
//       <p className="text-xl font-bold mb-3">Filters</p>
//       <hr className="mb-4" />

//       <RadioGroup>
//         {filterData.map((data, i) => (
//           <div key={i} className="mb-4">
//             {/* Filter Header */}
//             <div
//               className="flex justify-between items-center cursor-pointer"
//               onClick={() => toggleFilter(data.filterType)}
//             >
//               <p className="font-bold text-lg">{data.filterType}</p>
//               {/* Arrow Icon */}
//               {openFilters[data.filterType] ? (
//                 <ChevronUp className="text-xl" />
//               ) : (
//                 <ChevronDown className="text-xl" />
//               )}
//             </div>

//             {/* Filter Options (Collapsible with Smooth Transition) */}
//             <div
//               className={`overflow-hidden transition-all duration-300 ${
//                 openFilters[data.filterType] ? "max-h-screen" : "max-h-0"
//               }`}
//             >
//               <div className="mt-2">
//                 {data.options.map((item, index) => (
//                   <div
//                     key={`${data.filterType}-${index}`}
//                     className="flex items-center space-x-2 my-2"
//                   >
//                     <RadioGroupItem value={item} />
//                     <Label>{item}</Label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </RadioGroup>
//     </div>
//   );
// };

// export default Filters;
