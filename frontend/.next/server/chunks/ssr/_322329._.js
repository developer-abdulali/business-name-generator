module.exports = {

"[project]/components/Filters.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
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
//     options: ["Full Time", "Part Time", "Contract", "Internship"],
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
//   const [selectedFilters, setSelectedFilters] = useState({
//     Location: [],
//     "Job Type": [],
//     Experience: [],
//     Salary: [],
//   });
//   const toggleFilter = (filterType) => {
//     setOpenFilters((prev) => ({
//       ...prev,
//       [filterType]: !prev[filterType],
//     }));
//   };
//   const handleFilterSelect = (filterType, value) => {
//     setSelectedFilters((prev) => {
//       const updatedFilters = {
//         ...prev,
//         [filterType]: prev[filterType].includes(value)
//           ? prev[filterType].filter((item) => item !== value)
//           : [...prev[filterType], value],
//       };
//       onFilterChange(filterType.toLowerCase(), updatedFilters[filterType]);
//       return updatedFilters;
//     });
//   };
//   return (
//     <div className="p-4">
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
//           <div
//             className={`overflow-hidden transition-all duration-300 ease-in-out ${
//               openFilters[data.filterType] ? "max-h-screen" : "max-h-0"
//             }`}
//           >
//             <div className="mt-2 space-y-2">
//               {data.options.map((item, index) => (
//                 <div
//                   key={`${data.filterType}-${index}`}
//                   className="flex items-center space-x-2"
//                 >
//                   <input
//                     type="checkbox"
//                     id={`${data.filterType}-${item}`}
//                     value={item}
//                     checked={selectedFilters[data.filterType].includes(item)}
//                     onChange={() => handleFilterSelect(data.filterType, item)}
//                   />
//                   <Label htmlFor={`${data.filterType}-${item}`}>{item}</Label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default Filters;
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const Filters = ({ setJobs })=>{
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        keyword: "",
        location: ""
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Fetch or filter jobs based on the filters state
        const filteredJobs = []; // Replace with actual filtering logic
        setJobs(filteredJobs); // ✅ Updating state inside useEffect, not during render
    }, [
        filters,
        setJobs
    ]); // Dependencies ensure it only runs when filters change
    const handleFilterChange = (e)=>{
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                name: "keyword",
                placeholder: "Job title",
                value: filters.keyword,
                onChange: handleFilterChange
            }, void 0, false, {
                fileName: "[project]/components/Filters.jsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                name: "location",
                placeholder: "Location",
                value: filters.location,
                onChange: handleFilterChange
            }, void 0, false, {
                fileName: "[project]/components/Filters.jsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Filters.jsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = Filters;
}}),
"[project]/components/Jobs.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// "use client";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import useGetAllJobs from "@/hooks/useGetAllJobs";
// import Filters from "./Filters";
// import Job from "./Job";
// import { ListFilter } from "lucide-react";
// const Jobs = () => {
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     location: [],
//     jobType: [],
//     experience: [],
//     salary: [],
//   });
//   const { allJobs } = useSelector((state) => state.job);
//   console.log("ALL JOBS",allJobs);
//   const { fetchAllJobs } = useGetAllJobs();
//   useEffect(() => {
//     fetchAllJobs();
//   }, []);
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setShowFilters(true);
//       } else {
//         setShowFilters(false);
//       }
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);
//   const handleFilterChange = (filterType, value) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [filterType]: value,
//     }));
//   };
//   const filterJobs = () => {
//     return allJobs.filter((job) => {
//       const matchesLocation =
//         filters.location.length === 0 ||
//         filters.location.includes(job.location);
//       const matchesJobType =
//         filters.jobType.length === 0 || filters.jobType.includes(job.jobType);
//       const matchesExperience =
//         filters.experience.length === 0 ||
//         filters.experience.includes(job.experienceLevel.toString());
//       const matchesSalary =
//         filters.salary.length === 0 ||
//         filters.salary.some((range) => {
//           const [min, max] = range.split("-").map(Number);
//           return job.salary >= min && job.salary <= max;
//         });
//       return (
//         matchesLocation && matchesJobType && matchesExperience && matchesSalary
//       );
//     });
//   };
//   const filteredJobs = filterJobs();
//   return (
//     <section className="min-h-screen wrapper px-4 xl:px-0 py-8">
//       <div className="flex items-center justify-between">
//         <p className="text-3xl font-bold mb-5 text-gray-800">Job Listings</p>
//         <span
//           onClick={() => setShowFilters((prev) => !prev)}
//           className="cursor-pointer lg:hidden"
//         >
//           <ListFilter size={28} />
//         </span>
//       </div>
//       <div className="flex flex-col lg:flex-row gap-4">
//         <div
//           className={`transform transition-all duration-300 ease-in-out ${
//             showFilters
//               ? "opacity-100 translate-x-0 block"
//               : "opacity-0 -translate-x-full hidden lg:block"
//           } w-full lg:w-1/4 bg-white p-4 rounded-lg border`}
//         >
//           <Filters onFilterChange={handleFilterChange} />
//         </div>
//         <div className="flex-1">
//           {filteredJobs.length === 0 ? (
//             <div className="text-center py-10">
//               <span className="text-xl text-gray-600">No jobs found</span>
//             </div>
//           ) : (
//             <div
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 overflow-auto scrollable-content"
//               style={{ maxHeight: "calc(100vh - 200px)" }}
//             >
//               {filteredJobs.map((job) => (
//                 <Job key={job._id} job={job} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };
// export default Jobs;
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Filters$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/Filters.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const Jobs = ()=>{
    const [jobs, setJobs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Filters$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                setJobs: setJobs
            }, void 0, false, {
                fileName: "[project]/components/Jobs.jsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: jobs.length > 0 ? jobs.map((job)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: job.title
                    }, job.id, false, {
                        fileName: "[project]/components/Jobs.jsx",
                        lineNumber: 131,
                        columnNumber: 29
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "No jobs found"
                }, void 0, false, {
                    fileName: "[project]/components/Jobs.jsx",
                    lineNumber: 133,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Jobs.jsx",
                lineNumber: 129,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Jobs.jsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = Jobs;
}}),
"[project]/app/jobs/page.jsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=_322329._.js.map