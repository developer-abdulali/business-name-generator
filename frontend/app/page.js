"use client";

import CategoryCarousel from "@/components/CategoryCarousel";
import HeroSection from "@/components/HeroSection";
import LatestJobs from "@/components/LatestJobs";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Home = () => {
  useGetAllJobs();
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  );
};
export default Home;
