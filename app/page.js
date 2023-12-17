import HeroBanner from "@/Components/HeroBanner/HeroBanner";
import ProductCard from "@/Components/ProductCard/ProductCard";
import Wrapper from "@/Components/Wrapper/Wrapper";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <Wrapper>
        {/* text and heading div start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Cushioning for Miles
          </div>
          <div className="text-md md:text-xl">
            A light weight Nike ZoomX midsol is combined with increase stack
            heights to help provide cushioning during extended stretches or
            running.
          </div>
        </div>
        {/* text and heading div end */}

        {/* products card div start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
        {/* products card div end */}

        
      </Wrapper>
    </main>
  );
}
