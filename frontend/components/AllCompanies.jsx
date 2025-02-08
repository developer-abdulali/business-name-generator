// import React from "react";
// import { useSelector } from "react-redux";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import Image from "next/image";
// import { Navigation } from "swiper/modules";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const AllCompanies = () => {
//   const { allCompanies } = useSelector((state) => state.company);

//   return (
//     <section className="slider-container max-w-screen-2xl mx-auto px-2 2xl:px-0 relative mb-5">
//       <h1 className="text-center text-2xl sm:text-left sm:text-3xl lg:text-4xl font-semibold mb-10">
//         Top Companies <span className="text-customColor">Hiring Now</span>
//       </h1>

//       {/* Check if there are no companies */}
//       {allCompanies.length === 0 ? (
//         <p className="text-center text-lg text-gray-500">No companies found.</p>
//       ) : (
//         <>
//           {/* Custom Navigation Buttons */}
//           <button className="swiper-button-prev absolute -left-8 top-1/2 translate-y-1/2 z-10 p-2">
//             <ChevronLeft className="text-gray-600" />
//           </button>
//           <button className="swiper-button-next absolute -right-8 top-1/2 translate-y-1/2 z-10 p-2">
//             <ChevronRight className="text-gray-600" />
//           </button>

//           <div className="custom-slider max-h-[25rem]">
//             <Swiper
//               modules={[Navigation]}
//               slidesPerView={1} // Default to 1 slide per view for mobile
//               spaceBetween={10}
//               navigation={{
//                 nextEl: ".swiper-button-next",
//                 prevEl: ".swiper-button-prev",
//               }} // Link to buttons
//               breakpoints={{
//                 640: { slidesPerView: 2 }, // Two slides for small screens
//                 768: { slidesPerView: 2 }, // Two slides for tablets
//                 1024: { slidesPerView: 3 }, // Three slides for medium screens
//                 1280: { slidesPerView: 3 }, // Three slides for large screens
//                 1536: { slidesPerView: 4 }, // Four slides for extra-large screens
//               }}
//               className="swiper-container"
//             >
//               {allCompanies.map((company) => (
//                 <SwiperSlide
//                   key={company._id}
//                   className="cursor-pointer border border-gray-200 rounded-lg w-full p-4 hover:bg-gray-50"
//                 >
//                   <div className="flex flex-col items-center w-full">
//                     <Image
//                       src={company?.logo || "/companyIcon.png"}
//                       alt={company?.name}
//                       width={200}
//                       height={200}
//                       className="mb-5 h-[15rem] object-contain"
//                     />
//                     <h3 className="mb-2 text-xl sm:text-2xl font-semibold text-center w-full">
//                       {company.name}
//                     </h3>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </>
//       )}
//     </section>
//   );
// };

// export default AllCompanies;

"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  ExternalLink,
} from "lucide-react";

const AllCompanies = () => {
  const { allCompanies } = useSelector((state) => state.company);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Top Companies
              </h2>
            </div>
            <p className="text-gray-600">
              Leading organizations hiring top talent
            </p>
          </div>

          {/* Navigation Buttons for larger screens */}
          <div className="hidden md:flex items-center gap-3">
            <button className="swiper-button-prev group flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:bg-gray-50">
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
            </button>
            <button className="swiper-button-next group flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:bg-gray-50">
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
            </button>
          </div>
        </div>

        {allCompanies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <Building2 className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 text-center">
              No companies found.
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Mobile Navigation Buttons */}
            <div className="md:hidden flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 px-2">
              <button className="swiper-button-prev flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur shadow-md">
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button className="swiper-button-next flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur shadow-md">
                <ChevronRight className="w-4 h-4 text-gray-600" />
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
                  <div className="group relative h-full rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:border-purple-200">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-6 w-full h-48">
                        <Image
                          src={company?.logo || "/companyIcon.png"}
                          alt={company?.name}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                        {company.name}
                      </h3>

                      {/* Added details */}
                      <p className="text-sm text-gray-600 text-center mb-4">
                        {company.location || "Multiple Locations"}
                      </p>

                      <button className="flex items-center gap-2 text-sm font-medium text-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        View Openings
                        <ExternalLink className="w-4 h-4" />
                      </button>
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
