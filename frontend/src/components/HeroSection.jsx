import { Search } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col my-10 gap-5">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No. 1 Job Hunt
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p>
          Discover the best job opportunities in your area. Apply quickly,
          secure your job, and get the job you deserve.
        </p>

        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream job"
            className="outline-none border-none w-full"
          />
          <Button className="rounded-r-full bg-[#6A38C2] hover:bg-black">
            <Search className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
