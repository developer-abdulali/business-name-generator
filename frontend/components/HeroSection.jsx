// "use client";
// import { Search } from "lucide-react";
// import { Button } from "./ui/button";

// const HeroSection = () => {
//   // const [query, setQuery] = useState("");
//   // const dispatch = useDispatch();
//   // const router = useRouter();

//   // const searchJobHandler = () => {
//   //   dispatch(setSearchedQuery(query));
//   //   router.push(`/browse`);
//   // };

//   return (
//     <section className="flex flex-col items-center text-center my-12 px-4">
//       <span className="px-4 py-2 rounded-full bg-gray-100 text-customRedColor font-medium text-sm sm:text-base">
//         No. 1 Job Hunt
//       </span>
//       <h1 className="text-3xl sm:text-5xl font-bold leading-tight mt-3">
//         Search, Apply & <br />
//         Get Your <span className="text-customColor">Dream Job</span>
//       </h1>
//       <p className="text-sm sm:text-lg max-w-[85%] md:max-w-[60%] text-gray-600 mt-2">
//         Discover the best job opportunities in your area. Apply quickly, secure
//         your job, and get hired faster.
//       </p>

//       {/* Search Bar */}
//       <div className="relative flex w-full max-w-lg sm:max-w-xl lg:max-w-2xl items-center gap-2 mt-6 p-1 bg-white border border-gray-300 rounded-full shadow-md">
//         <input
//           type="text"
//           placeholder="Find your dream job..."
//           className="w-full text-sm sm:text-base px-4 py-2 border-none outline-none bg-transparent"
//         />
//         <Button
//           // onClick={searchJobHandler}
//           className="px-3 py-2 rounded-full bg-customColor hover:bg-black transition-all"
//         >
//           <Search className="w-5 h-5 text-white" />
//         </Button>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

"use client";
import React from "react";
import { Search, Briefcase, ArrowRight, Star } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-16 sm:py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-24 h-32 w-32 rounded-full bg-purple-100 opacity-50 blur-2xl"></div>
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 h-36 w-36 rounded-full bg-pink-100 opacity-50 blur-2xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm transition-all hover:shadow-md">
              <Star className="h-4 w-4" />
              No. 1 Job Hunt Platform
              <Star className="h-4 w-4" />
            </span>
          </div>

          {/* Main heading */}
          <h1 className="mt-6 animate-fade-in-up text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Search, Apply & Get Your{" "}
            <span className="relative">
              <span className="relative inline-block text-purple-600">
                Dream Job
                <div className="absolute bottom-0 left-0 h-3 w-full bg-purple-100 opacity-30"></div>
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-2xl animate-fade-in-up text-lg text-gray-600 sm:text-xl">
            Discover the best job opportunities in your area. Apply quickly,
            secure your job, and get hired faster.
          </p>

          {/* Search Bar */}
          <div className="relative mt-8 w-full max-w-3xl animate-fade-in-up">
            <div className="group flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg transition-all hover:border-purple-200 hover:shadow-xl">
              <div className="flex flex-1 items-center gap-2 px-4">
                <Briefcase className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for your dream job..."
                  className="w-full py-3 text-base placeholder:text-gray-400 focus:outline-none"
                />
              </div>
              <Button className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-purple-700">
                <span className="hidden sm:inline">Search Jobs</span>
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Popular searches */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600">
              <span className="font-medium">Popular:</span>
              {["Remote", "Full-time", "Technology", "Marketing"].map(
                (term) => (
                  <button
                    key={term}
                    className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-gray-600 shadow-sm transition-all hover:bg-purple-50 hover:text-purple-600"
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
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
