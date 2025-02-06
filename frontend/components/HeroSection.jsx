"use client";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  // const [query, setQuery] = useState("");
  // const dispatch = useDispatch();
  // const router = useRouter();

  // const searchJobHandler = () => {
  //   dispatch(setSearchedQuery(query));
  //   router.push(`/browse`);
  // };

  return (
    <section className="flex flex-col items-center text-center my-12 px-4">
      <span className="px-4 py-2 rounded-full bg-gray-100 text-customRedColor font-medium text-sm sm:text-base">
        No. 1 Job Hunt
      </span>
      <h1 className="text-3xl sm:text-5xl font-bold leading-tight mt-3">
        Search, Apply & <br />
        Get Your <span className="text-customColor">Dream Job</span>
      </h1>
      <p className="text-sm sm:text-lg max-w-[85%] md:max-w-[60%] text-gray-600 mt-2">
        Discover the best job opportunities in your area. Apply quickly, secure
        your job, and get hired faster.
      </p>

      {/* Search Bar */}
      <div className="relative flex w-full max-w-lg sm:max-w-xl lg:max-w-2xl items-center gap-2 mt-6 p-1 bg-white border border-gray-300 rounded-full shadow-md">
        <input
          type="text"
          // value={query}
          // onChange={(e) => setQuery(e.target.value)}
          placeholder="Find your dream job..."
          className="w-full text-sm sm:text-base px-4 py-2 border-none outline-none bg-transparent"
        />
        <Button
          // onClick={searchJobHandler}
          className="px-3 py-2 rounded-full bg-customColor hover:bg-black transition-all"
        >
          <Search className="w-5 h-5 text-white" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
