import Job from "./Job";

const randomJobs = [1, 2, 3, 4];

const BrowseJobs = () => {
  return (
    <div className="wrapper my-10">
      <h2 className="font-bold text-xl my-10">
        Search Results ({randomJobs.length})
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {randomJobs.map((item, i) => {
          return <Job />;
        })}
      </div>
    </div>
  );
};
export default BrowseJobs;
