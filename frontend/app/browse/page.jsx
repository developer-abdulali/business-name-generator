import Job from "@/components/Job";

const randomJobs = [
  { id: "1", title: "Software Engineer" },
  { id: "2", title: "Product Manager" },
  { id: "3", title: "Designer" },
];

const BrowseJobs = () => {
  return (
    <div className="wrapper my-10">
      <h2 className="font-bold text-xl my-10">
        Search Results ({randomJobs.length})
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {randomJobs?.map((item) => {
          return <Job key={item.id} job={item} />;
        })}
      </div>
    </div>
  );
};
export default BrowseJobs;
