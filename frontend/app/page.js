"use client";

import CategoryCarousel from "@/components/CategoryCarousel";
import HeroSection from "@/components/HeroSection";
import LatestJobs from "@/components/LatestJobs";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === "recruiter") redirect("/admin/companies");
  }, []);

  return (
    <div className="overflow-hidden">
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  );
};
export default Home;
