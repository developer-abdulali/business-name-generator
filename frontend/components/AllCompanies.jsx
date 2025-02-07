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
      <h1 className="text-center text-2xl sm:text-left sm:text-3xl lg:text-4xl font-semibold mb-10">
        All <span className="text-customColor">Companies</span>
      </h1>

      {/* Check if there are no companies */}
      {allCompanies.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No companies found.</p>
      ) : (
        <>
          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev absolute -left-8 top-1/2 translate-y-1/2 z-10 p-2">
            <ChevronLeft className="text-gray-600" />
          </button>
          <button className="swiper-button-next absolute -right-8 top-1/2 translate-y-1/2 z-10 p-2">
            <ChevronRight className="text-gray-600" />
          </button>

          <div className="custom-slider max-h-[25rem]">
            <Swiper
              modules={[Navigation]}
              slidesPerView={1} // Default to 1 slide per view for mobile
              spaceBetween={10}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }} // Link to buttons
              breakpoints={{
                640: { slidesPerView: 2 }, // Two slides for small screens
                768: { slidesPerView: 2 }, // Two slides for tablets
                1024: { slidesPerView: 3 }, // Three slides for medium screens
                1280: { slidesPerView: 3 }, // Three slides for large screens
                1536: { slidesPerView: 4 }, // Four slides for extra-large screens
              }}
              className="swiper-container"
            >
              {allCompanies.map((company) => (
                <SwiperSlide
                  key={company._id}
                  className="cursor-pointer border border-gray-200 rounded-lg w-full p-4 hover:bg-gray-50"
                >
                  <div className="flex flex-col items-center w-full">
                    <Image
                      src={company?.logo || "/companyIcon.png"}
                      alt={company?.name}
                      width={200}
                      height={200}
                      className="mb-5 h-[15rem] object-contain"
                    />
                    <h3 className="mb-2 text-xl sm:text-2xl font-semibold text-center w-full">
                      {company.name}
                    </h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </section>
  );
};

export default AllCompanies;
