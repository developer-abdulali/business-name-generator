// import LatestJobCard from "./LatestJobCard";

// const LatestJobs = () => {
//   const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//   return (
//     <div className="wrapper my-20">
//       <h1 className="text-4xl font-bold">
//         Latest <span className="text-customColor">Job Openings</span>
//       </h1>

//       {/* card */}
//       <div className="grid grid-cols-3 gap-4 my-5">
//         {randomJobs.slice(0, 6)?.map((job, i) => (
//           <LatestJobCard />
//         ))}
//       </div>
//     </div>
//   );
// };
// export default LatestJobs;

import LatestJobCard from "./LatestJobCard";

const LatestJobs = () => {
  const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="wrapper my-20 px-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-10">
        Latest <span className="text-customColor">Job Openings</span>
      </h1>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {randomJobs.slice(0, 6)?.map((job, i) => (
          <LatestJobCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
