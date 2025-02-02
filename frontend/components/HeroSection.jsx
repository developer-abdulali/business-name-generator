"use client";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/slices/jobSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    router.push(`/browse`);
  };

  return (
    <section className="flex flex-col text-center my-10 gap-5 px-4">
      <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-customRedColor font-medium text-sm sm:text-base">
        No. 1 Job Hunt
      </span>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        Search, Apply & <br /> Get Your{" "}
        <span className="text-customColor">Dream Jobs</span>
      </h1>
      <p className="text-sm sm:text-base max-w-[90%] md:max-w-[70%] mx-auto">
        Discover the best job opportunities in your area. Apply quickly, secure
        your job, and get the job you deserve.
      </p>
      <div className="flex w-full max-w-[90%] sm:max-w-[70%] lg:max-w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find your dream job"
          className="outline-none border-none w-full text-sm sm:text-base"
        />
        <Button
          onClick={searchJobHandler}
          className="rounded-r-full bg-customColor hover:bg-black"
        >
          <Search className="w-5 h-5 text-white" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
