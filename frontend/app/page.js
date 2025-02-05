"use client";

import AllCompanies from "@/components/AllCompanies";
import CategoryCarousel from "@/components/CategoryCarousel";
import HeroSection from "@/components/HeroSection";
import LatestJobs from "@/components/LatestJobs";
import useGetAllCompaniesForHome from "@/hooks/useGetAllCompaniesForHome";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  useGetAllCompaniesForHome();
  useGetAllJobs();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === "recruiter") redirect("/recruiter/companies");
  }, []);

  return (
    <div className="overflow-hidden">
      <HeroSection />
      <CategoryCarousel />
      <AllCompanies />
      <LatestJobs />
    </div>
  );
};
export default Home;
