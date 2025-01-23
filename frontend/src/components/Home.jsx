import CategoryCarousel from "./CategoryCarousel";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";

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
