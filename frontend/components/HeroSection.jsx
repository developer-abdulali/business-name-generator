import { Search } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <section className="flex flex-col text-center my-10 gap-5 px-4">
      {/* Highlighted text */}
      <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-customRedColor font-medium text-sm sm:text-base">
        No. 1 Job Hunt
      </span>

      {/* Main heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        Search, Apply & <br /> Get Your{" "}
        <span className="text-customColor">Dream Jobs</span>
      </h1>

      {/* Subheading */}
      <p className="text-sm sm:text-base max-w-[90%] md:max-w-[70%] mx-auto">
        Discover the best job opportunities in your area. Apply quickly, secure
        your job, and get the job you deserve.
      </p>

      {/* Search bar */}
      <div className="flex w-full max-w-[90%] sm:max-w-[70%] lg:max-w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
        <input
          type="text"
          placeholder="Find your dream job"
          className="outline-none border-none w-full text-sm sm:text-base"
        />
        <Button className="rounded-r-full bg-customColor hover:bg-black">
          <Search className="w-5 h-5 text-white" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
