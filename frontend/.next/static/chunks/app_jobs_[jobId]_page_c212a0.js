(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_jobs_[jobId]_page_c212a0.js", {

"[project]/app/jobs/[jobId]/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import moment from "moment";
// import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/lib/constant";
// import { setSingleJob } from "@/redux/slices/jobSlice";
// import { useParams } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// const JobDescription = () => {
//   const { singleJob } = useSelector((state) => state.job);
//   const { user } = useSelector((state) => state.auth);
//   const isInitiallyApplied = singleJob?.applications?.some(
//     (application) => application.applicant === user?._id || false
//   );
//   const [isApplied, setIsApplied] = useState(isInitiallyApplied);
//   const params = useParams();
//   const jobId = params.jobId;
//   const dispatch = useDispatch();
//   const applyJobHandler = async () => {
//     try {
//       const res = await axios.get(
//         `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
//         { withCredentials: true }
//       );
//       console.log("applyJobHandler", res);
//       if (res.data.success) {
//         setIsApplied(true); // update the local state
//         const updateSingleJob = {
//           ...singleJob,
//           applications: [...singleJob.applications, { applicant: user?._id }],
//         };
//         dispatch(setSingleJob(updateSingleJob)); // update the redux state
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };
//   useEffect(() => {
//     const fetchSingleJob = async () => {
//       try {
//         const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
//           withCredentials: true,
//         });
//         if (res.data.success) {
//           dispatch(setSingleJob(res.data.job));
//           setIsApplied(
//             res.data.job.applications.some(
//               (application) => application.applicant === user?._id
//             )
//           );
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchSingleJob();
//   }, [jobId, dispatch, user?._id]);
//   return (
//     <div className="wrapper my-10 px-4 xl:px-0">
//       {/* Job Title */}
//       <h2 className="font-bold text-2xl text-gray-800 mb-6">
//         {singleJob?.title}
//       </h2>
//       {/* Badges and Button */}
//       <div className="flex flex-wrap items-center justify-between gap-4">
//         {/* Badges */}
//         <div className="flex flex-wrap items-center gap-3">
//           <Badge
//             variant="secondary"
//             className="text-blue-700 font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
//           >
//             {singleJob?.position} Positions
//           </Badge>
//           <Badge
//             variant="secondary"
//             className="text-customRedColor font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
//           >
//             {singleJob?.jobType}
//           </Badge>
//           <Badge
//             variant="secondary"
//             className="text-customColor font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none"
//           >
//             {singleJob?.salary} PKR
//           </Badge>
//         </div>
//         {/* Apply Now Button */}
//         <Button
//           onClick={isApplied ? null : applyJobHandler}
//           disabled={isApplied}
//           className={`rounded-lg px-6 py-2 text-white transition-all ${
//             isApplied
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-purple-700 hover:bg-purple-800"
//           }`}
//         >
//           {isApplied ? "Already Applied" : "Apply Now"}
//         </Button>
//       </div>
//       {/* Job Details */}
//       <div className="mt-8">
//         <p className="border-b-2 border-gray-300 font-medium text-lg pb-2">
//           Job Details
//         </p>
//         <div className="mt-4 space-y-3">
//           <p className="font-semibold text-gray-700">
//             Role:{" "}
//             <span className="pl-4 font-normal text-gray-800">
//               {singleJob?.title}
//             </span>
//           </p>
//           <p className="font-semibold text-gray-700">
//             Location:{" "}
//             <span className="pl-4 font-normal text-gray-800">
//               {singleJob?.location}
//             </span>
//           </p>
//           <p className="font-semibold text-gray-700">
//             Description:{" "}
//             <span className="pl-4 font-normal text-gray-800">
//               {singleJob?.description}
//             </span>
//           </p>
//           <p className="font-semibold text-gray-700">
//             Experience:{" "}
//             <span className="pl-4 font-normal text-gray-800">
//               {singleJob?.experienceLevel} years
//             </span>
//           </p>
//           <p className="font-semibold text-gray-700">
//             Salary:{" "}
//             <span className="pl-4 font-normal text-gray-800">
//               {singleJob?.salary}
//             </span>
//           </p>
//           <p className="font-semibold text-gray-700">
//             Total Applications:
//             <span className="pl-4 font-normal text-gray-800">
//               {singleJob?.applications?.length}
//             </span>
//           </p>
//           <p className="font-semibold text-gray-700">
//             Posted Date:
//             <span className="pl-4 font-normal text-gray-800">
//               {singleJob?.createdAt
//                 ? moment(singleJob?.createdAt).format("DD MMM YYYY")
//                 : "N/A"}
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default JobDescription;
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$moment$2f$moment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/moment/moment.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/constant.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/badge.js [app-client] (ecmascript) <export default as Badge>");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
;
const JobDescription = ()=>{
    _s();
    const { singleJob } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "JobDescription.useSelector": (state)=>state.job
    }["JobDescription.useSelector"]);
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "JobDescription.useSelector": (state)=>state.auth
    }["JobDescription.useSelector"]);
    const isInitiallyApplied = singleJob?.applications?.some((application)=>application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(isInitiallyApplied);
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const jobId = params.jobId;
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const applyJobHandler = async ()=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APPLICATION_API_ENDPOINT"]}/apply/${jobId}`, {
                withCredentials: true
            });
            console.log("applyJobHandler", res);
            if (res.data.success) {
                setIsApplied(true);
                const updateSingleJob = {
                    ...singleJob,
                    applications: [
                        ...singleJob.applications,
                        {
                            applicant: user?._id
                        }
                    ]
                };
                dispatch(setSingleJob(updateSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "JobDescription.useEffect": ()=>{
            const fetchSingleJob = {
                "JobDescription.useEffect.fetchSingleJob": async ()=>{
                    try {
                        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JOB_API_ENDPOINT"]}/get/${jobId}`, {
                            withCredentials: true
                        });
                        if (res.data.success) {
                            dispatch(setSingleJob(res.data.job));
                            setIsApplied(res.data.job.applications?.some({
                                "JobDescription.useEffect.fetchSingleJob": (application)=>application.applicant === user?._id
                            }["JobDescription.useEffect.fetchSingleJob"]) || false);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }["JobDescription.useEffect.fetchSingleJob"];
            fetchSingleJob();
        }
    }["JobDescription.useEffect"], [
        jobId,
        dispatch,
        user?._id
    ]);
    if (!singleJob) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/app/jobs/[jobId]/page.js",
            lineNumber: 241,
            columnNumber: 12
        }, this); // Handle loading state
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "wrapper my-10 px-4 xl:px-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "font-bold text-2xl text-gray-800 mb-6",
                children: singleJob?.title
            }, void 0, false, {
                fileName: "[project]/app/jobs/[jobId]/page.js",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                                variant: "secondary",
                                className: "text-blue-700 font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none",
                                children: [
                                    singleJob?.position,
                                    " Positions"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/jobs/[jobId]/page.js",
                                lineNumber: 255,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                                variant: "secondary",
                                className: "text-customRedColor font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none",
                                children: singleJob?.jobType
                            }, void 0, false, {
                                fileName: "[project]/app/jobs/[jobId]/page.js",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                                variant: "secondary",
                                className: "text-customColor font-medium bg-gray-50 px-3 py-1 rounded-full hover:bg-none",
                                children: [
                                    singleJob?.salary,
                                    " PKR"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/jobs/[jobId]/page.js",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/jobs/[jobId]/page.js",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                        onClick: isApplied ? null : applyJobHandler,
                        disabled: isApplied,
                        className: `rounded-lg px-6 py-2 text-white transition-all ${isApplied ? "bg-gray-400 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800"}`,
                        children: isApplied ? "Already Applied" : "Apply Now"
                    }, void 0, false, {
                        fileName: "[project]/app/jobs/[jobId]/page.js",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/jobs/[jobId]/page.js",
                lineNumber: 252,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "border-b-2 border-gray-300 font-medium text-lg pb-2",
                        children: "Job Details"
                    }, void 0, false, {
                        fileName: "[project]/app/jobs/[jobId]/page.js",
                        lineNumber: 291,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold text-gray-700",
                                children: [
                                    "Role:",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "pl-4 font-normal text-gray-800",
                                        children: singleJob?.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/jobs/[jobId]/page.js",
                                        lineNumber: 297,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/jobs/[jobId]/page.js",
                                lineNumber: 295,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold text-gray-700",
                                children: [
                                    "Location:",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "pl-4 font-normal text-gray-800",
                                        children: singleJob?.location
                                    }, void 0, false, {
                                        fileName: "[project]/app/jobs/[jobId]/page.js",
                                        lineNumber: 303,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/jobs/[jobId]/page.js",
                                lineNumber: 301,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold text-gray-700",
                                children: [
                                    "Description:",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "pl-4 font-normal text-gray-800",
                                        children: singleJob?.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/jobs/[jobId]/page.js",
                                        lineNumber: 309,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/jobs/[jobId]/page.js",
                                lineNumber: 307,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold text-gray-700",
                                children: [
                                    "Experience:",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "pl-4 font-normal text-gray-800",
                                        children: [
                                            singleJob?.experienceLevel,
                                            " years"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/jobs/[jobId]/page.js",
                                        lineNumber: 315,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/jobs/[jobId]/page.js",
                                lineNumber: 313,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold text-gray-700",
                                children: [
                                    "Salary:",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "pl-4 font-normal text-gray-800",
                                        children: singleJob?.salary
                                    }, void 0, false, {
                                        fileName: "[project]/app/jobs/[jobId]/page.js",
                                        lineNumber: 321,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/jobs/[jobId]/page.js",
                                lineNumber: 319,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold text-gray-700",
                                children: [
                                    "Total Applications:",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "pl-4 font-normal text-gray-800",
                                        children: singleJob?.applications?.length || 0
                                    }, void 0, false, {
                                        fileName: "[project]/app/jobs/[jobId]/page.js",
                                        lineNumber: 327,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/jobs/[jobId]/page.js",
                                lineNumber: 325,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold text-gray-700",
                                children: [
                                    "Posted Date:",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "pl-4 font-normal text-gray-800",
                                        children: singleJob?.createdAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$moment$2f$moment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(singleJob?.createdAt).format("DD MMM YYYY") : "N/A"
                                    }, void 0, false, {
                                        fileName: "[project]/app/jobs/[jobId]/page.js",
                                        lineNumber: 333,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/jobs/[jobId]/page.js",
                                lineNumber: 331,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/jobs/[jobId]/page.js",
                        lineNumber: 294,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/jobs/[jobId]/page.js",
                lineNumber: 290,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/jobs/[jobId]/page.js",
        lineNumber: 245,
        columnNumber: 5
    }, this);
};
_s(JobDescription, "5xMmGUZ9OJxCFHWj1gByPa8sK0w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"]
    ];
});
_c = JobDescription;
const __TURBOPACK__default__export__ = JobDescription;
var _c;
__turbopack_refresh__.register(_c, "JobDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/jobs/[jobId]/page.js [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_jobs_%5BjobId%5D_page_c212a0.js.map