"use client";
import React, { useState } from "react";
import { Search, Briefcase, ArrowRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/slices/jobSlice";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    router.push(`/browse`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 sm:py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-24 h-32 w-32 rounded-full bg-purple-100 dark:bg-purple-900 opacity-50 blur-2xl"></div>
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-100 dark:bg-blue-900 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 h-36 w-36 rounded-full bg-pink-100 dark:bg-pink-900 opacity-50 blur-2xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 px-4 py-2 text-sm font-semibold text-purple-700 dark:text-purple-300 shadow-sm transition-all hover:shadow-md">
              <Star className="h-4 w-4" />
              No. 1 Job Hunt Platform
              <Star className="h-4 w-4" />
            </span>
          </div>

          {/* Main heading */}
          <h1 className="mt-6 animate-fade-in-up text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
            Search, Apply & Get Your{" "}
            <span className="relative">
              <span className="relative inline-block text-purple-600 dark:text-purple-400">
                Dream Job
                <div className="absolute bottom-0 left-0 h-3 w-full bg-purple-100 dark:bg-purple-900 opacity-30"></div>
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-2xl animate-fade-in-up text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
            Discover the best job opportunities in your area. Apply quickly,
            secure your job, and get hired faster.
          </p>

          {/* Search Bar */}
          <div className="relative mt-8 w-full max-w-3xl animate-fade-in-up">
            <div className="group flex items-center gap-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 shadow-lg transition-all hover:border-purple-200 dark:hover:border-purple-700 hover:shadow-xl">
              <div className="flex flex-1 items-center gap-2 px-4">
                <Briefcase className="h-5 w-5 text-gray-400 dark:text-gray-600" />
                <input
                  type="text"
                  placeholder="Search for your dream job..."
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full py-3 text-base placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none bg-transparent"
                />
              </div>
              <Button
                onClick={searchJobHandler}
                className="flex items-center gap-2 rounded-xl bg-purple-600 dark:bg-purple-700 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-purple-700 dark:hover:bg-purple-600"
              >
                <span className="hidden sm:inline">Search Jobs</span>
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Popular searches */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Popular:</span>
              {["Remote", "Full-time", "Technology", "Marketing"].map(
                (term) => (
                  <button
                    key={term}
                    className="flex items-center gap-1 rounded-full bg-white dark:bg-gray-800 px-3 py-1 text-gray-600 dark:text-gray-400 shadow-sm transition-all hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    {term}
                    <ArrowRight className="h-3 w-3" />
                  </button>
                )
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { label: "Active Jobs", value: "10k+" },
              { label: "Companies", value: "2.5k+" },
              { label: "Job Seekers", value: "50k+" },
              { label: "Placements", value: "15k+" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
