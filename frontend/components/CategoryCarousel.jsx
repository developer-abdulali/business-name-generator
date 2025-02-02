// "use client";
// import { useState } from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "./ui/carousel";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import { setSearchedQuery } from "@/redux/slices/jobSlice";

// const CategoryCarousel = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const category = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Data Science",
//     "Graphic Designer",
//     "FullStack Developer",
//   ];

//   const searchJobHandler = (query) => {
//     dispatch(setSearchedQuery(query));
//     router.push(`/browse`);
//     // router.push(`/browse?search=${query}`);
//   };

//   return (
//     <section>
//       <Carousel className="w-full max-w-xl mx-auto my-20">
//         <CarouselContent>
//           {category?.map((cat, index) => (
//             <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
//               <button
//                 onClick={() => searchJobHandler(cat)}
//                 className="rounded-full py-2 px-3 hover:bg-gray-100 border"
//               >
//                 {cat}
//               </button>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </section>
//   );
// };
// export default CategoryCarousel;

"use client";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setSearchedQuery } from "@/redux/slices/jobSlice";

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
  ];

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    router.push(`/browse`);
  };

  return (
    <section>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category?.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <button
                onClick={() => searchJobHandler(cat)}
                className="rounded-full py-2 px-3 hover:bg-gray-100 border"
              >
                {cat}
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
export default CategoryCarousel;
