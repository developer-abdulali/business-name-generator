// "use client";
// import { useState } from "react";
// import { Label } from "./ui/label";
// import { ChevronDown, ChevronUp } from "lucide-react";

// const filterData = [
//   {
//     filterType: "Location",
//     options: [
//       "Shikarpur",
//       "Sukkur",
//       "Hyderabad",
//       "Karachi",
//       "Islamabad",
//       "Rawalpindi",
//       "Lahore",
//       "Multan",
//       "Peshawar",
//       "Bahawalpur",
//       "Sargodha",
//     ],
//   },
//   {
//     filterType: "Job Type",
//     options: ["Full Time", "Part Time", "Contractual", "Internship"],
//   },
//   {
//     filterType: "Experience",
//     options: ["0-1 years", "1-2 years", "2-3 years", "3+ years"],
//   },
//   {
//     filterType: "Salary",
//     options: ["10-20k", "20-30k", "30-40k", "40-50k", "50-60k", "60-80k"],
//   },
// ];

// const Filters = ({ onFilterChange }) => {
//   const [openFilters, setOpenFilters] = useState({});
//   const [selectedFilters, setSelectedFilters] = useState({});

//   const toggleFilter = (filterType) => {
//     setOpenFilters((prev) => ({
//       ...prev,
//       [filterType]: !prev[filterType],
//     }));
//   };

//   const handleSelection = (filterType, value) => {
//     setSelectedFilters((prev) => {
//       const currentValues = prev[filterType] || [];
//       const updatedValues = currentValues.includes(value)
//         ? currentValues.filter((v) => v !== value)
//         : [...currentValues, value];

//       const updatedFilters = { ...prev, [filterType]: updatedValues };
//       onFilterChange(updatedFilters); // Pass selected filters to `Jobs`
//       return updatedFilters;
//     });
//   };

//   return (
//     <section className="p-4">
//       <p className="text-xl font-bold mb-3 text-gray-800">Filters</p>
//       <hr className="mb-4" />

//       {filterData.map((data, i) => (
//         <div key={i} className="mb-4">
//           <div
//             className="flex justify-between items-center cursor-pointer"
//             onClick={() => toggleFilter(data.filterType)}
//           >
//             <p className="font-semibold text-lg">{data.filterType}</p>
//             {openFilters[data.filterType] ? (
//               <ChevronUp className="text-gray-600" />
//             ) : (
//               <ChevronDown className="text-gray-600" />
//             )}
//           </div>

//           {openFilters[data.filterType] && (
//             <div className="mt-2 space-y-2">
//               {data.options.map((item, index) => (
//                 <div
//                   key={`${data.filterType}-${index}`}
//                   className="flex items-center space-x-2 space-y-2"
//                 >
//                   <input
//                     type="checkbox"
//                     id={`${data.filterType}-${item}`}
//                     checked={
//                       selectedFilters[data.filterType]?.includes(item) ?? false
//                     }
//                     onChange={() => handleSelection(data.filterType, item)}
//                     className="mt-2"
//                   />
//                   <Label
//                     htmlFor={`${data.filterType}-${item}`}
//                     className="cursor-pointer"
//                   >
//                     {item}
//                   </Label>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </section>
//   );
// };

// export default Filters;

"use client";
import { useState } from "react";
import { Label } from "./ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    options: [
      "Shikarpur",
      "Sukkur",
      "Hyderabad",
      "Karachi",
      "Islamabad",
      "Rawalpindi",
      "Lahore",
      "Multan",
      "Peshawar",
      "Bahawalpur",
      "Sargodha",
    ],
  },
  {
    filterType: "Job Type",
    options: ["Full Time", "Part Time", "Contractual", "Internship"],
  },
  {
    filterType: "Experience",
    options: ["0-1 years", "1-2 years", "2-3 years", "3+ years"],
  },
  {
    filterType: "Salary",
    options: ["10-20k", "20-30k", "30-40k", "40-50k", "50-60k", "60-80k"],
  },
];

const Filters = ({ onFilterChange }) => {
  const [openFilters, setOpenFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleFilter = (filterType) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  const handleSelection = (filterType, value) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[filterType] || [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      const updatedFilters = { ...prev, [filterType]: updatedValues };
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <div className="mb-6 lg:mb-0">
      <h2 className="text-2xl font-semibold mb-4">Filters</h2>
      {filterData.map((data) => (
        <div key={data.filterType} className="mb-4">
          <button
            onClick={() => toggleFilter(data.filterType)}
            className="flex justify-between items-center w-full py-2 px-4 bg-gray-100 rounded-lg"
          >
            <Label>{data.filterType}</Label>
            {openFilters[data.filterType] ? <ChevronUp /> : <ChevronDown />}
          </button>
          {openFilters[data.filterType] && (
            <div className="mt-2 space-y-2">
              {data.options.map((item) => (
                <div key={item} className="flex items-center">
                  <input
                    type="checkbox"
                    id={item}
                    checked={selectedFilters[data.filterType]?.includes(item)}
                    onChange={() => handleSelection(data.filterType, item)}
                    className="mr-2"
                  />
                  <label htmlFor={item} className="text-gray-700">
                    {item}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Filters;
