import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AllCompanies = () => {
  const { allCompanies } = useSelector((state) => state.company);

  return (
    <section className="slider-container max-w-screen-2xl mx-auto px-2 2xl:px-0 relative">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-10">
        All <span className="text-customColor">Companies</span>
      </h1>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/1 z-10 p-2 rounded-full shadow-md">
        <ChevronLeft className="text-gray-600" />
      </button>
      <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/1 z-10 p-2 rounded-full shadow-md">
        <ChevronRight className="text-gray-600" />
      </button>

      <div className="custom-slider max-h-[25rem]">
        <Swiper
          modules={[Navigation]}
          slidesPerView={4}
          spaceBetween={10}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }} // Link to buttons
          breakpoints={{
            1536: { slidesPerView: 4 },
            1280: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
          className="swiper-container"
        >
          {allCompanies?.map((company) => (
            <SwiperSlide
              key={company._id}
              className="border border-gray-200 rounded-lg w-full p-4"
            >
              <div className="flex flex-col items-center w-full">
                <Image
                  src={company?.logo}
                  alt={company?.name}
                  width={200}
                  height={200}
                  className="mb-5 h-[15rem] object-contain"
                />
                <h3 className="mb-2 text-2xl font-semibold text-center w-full">
                  {company.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AllCompanies;
