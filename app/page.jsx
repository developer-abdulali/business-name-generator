"use client";

import Search from "@/components/Search";
import { Filter, Globe, Lightbulb } from "lucide-react";

const Home = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-20 lg:px-56 text-center">
        <div className="mt-40 md:mt-20">
          <h1 className="text-4xl md:text-6xl font-semibold mb-4">
            Business Name Generator
          </h1>

          <p className="text-base md:text-xl max-w-3xl mx-auto mb-6">
            Find the perfect name for your startup or brand with our AI-powered
            generator — plus instantly check domain availability to launch your
            business online.
          </p>

          <Search />
        </div>

        {/* Features Section */}
        <div className="w-full mt-20">
          <div className="flex flex-col md:flex-row gap-10 md:gap-6 justify-between items-stretch">
            {/* Generate Idea */}
            <div className="flex-1 bg-zinc-900 p-6 rounded-md text-center md:text-left">
              <Lightbulb
                className="text-primary mb-3 mx-auto md:mx-0"
                size={30}
              />
              <h4 className="text-lg font-semibold mb-2">Generate Idea</h4>
              <p className="text-sm md:text-base">
                Start with a keyword and let our AI suggest creative, trendy
                name ideas.
              </p>
            </div>

            {/* Filter Results */}
            <div className="flex-1 bg-zinc-900 p-6 rounded-md text-center md:text-left">
              <Filter className="text-primary mb-3 mx-auto md:mx-0" size={30} />
              <h4 className="text-lg font-semibold mb-2">Filter Results</h4>
              <p className="text-sm md:text-base">
                Refine suggestions by name style or tone — get results that fit
                your brand.
              </p>
            </div>

            {/* Check Domain */}
            <div className="flex-1 bg-zinc-900 p-6 rounded-md text-center md:text-left">
              <Globe className="text-primary mb-3 mx-auto md:mx-0" size={30} />
              <h4 className="text-lg font-semibold mb-2">Check Domain</h4>
              <p className="text-sm md:text-base">
                Instantly check domain availability for any generated name so
                you're ready to go live.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
