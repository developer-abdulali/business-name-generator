"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";

const AllCompanies = () => {
  const { allCompanies } = useSelector((state) => state.company);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                Top{" "}
                <span className="text-purple-600 dark:text-purple-400">
                  Companies
                </span>
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Leading organizations hiring top talent
            </p>
          </div>

          {/* Navigation Buttons for larger screens */}
          <div className="hidden md:flex items-center gap-3">
            <button className="swiper-button-prev group flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-gray-700">
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200" />
            </button>
            <button className="swiper-button-next group flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-gray-700">
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200" />
            </button>
          </div>
        </div>

        {allCompanies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <Building2 className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-400 text-center">
              No companies found.
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Mobile Navigation Buttons */}
            <div className="md:hidden flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 px-2">
              <button className="swiper-button-prev flex items-center justify-center w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-md">
                <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="swiper-button-next flex items-center justify-center w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-md">
                <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={24}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="px-1 py-4"
            >
              {allCompanies.map((company) => (
                <SwiperSlide key={company._id}>
                  <div className="group relative h-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 transition-all duration-300 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-700">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-6 w-full h-48">
                        <Image
                          src={company?.logo || "/companyIcon.png"}
                          alt={company?.name}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-2">
                        {company.name}
                      </h3>

                      {/* Added details */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                        {company.location || "Multiple Locations"}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllCompanies;
