import LatestJobCard from "./LatestJobCard";

const LatestJobs = () => {
  const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="wrapper my-20">
      <h1 className="text-4xl font-bold">
        Latestp <span className="text-customColor">Job Openings</span>
      </h1>

      {/* card */}
      <div className="grid grid-cols-3 gap-4 my-5">
        {randomJobs.slice(0, 6)?.map((job, i) => (
          <LatestJobCard />
        ))}
      </div>
    </div>
  );
};
export default LatestJobs;
