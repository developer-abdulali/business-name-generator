import CategoryCarousel from "@/components/CategoryCarousel";
import HeroSection from "@/components/HeroSection";
import LatestJobs from "@/components/LatestJobs";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  );
};
export default Home;
