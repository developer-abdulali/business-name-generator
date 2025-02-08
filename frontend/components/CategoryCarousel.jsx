// "use client";
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
import React from "react";
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
import {
  Code,
  Palette,
  Database,
  Layout,
  Layers,
  ChevronRight,
  Briefcase,
} from "lucide-react";

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const categories = [
    {
      name: "Frontend Developer",
      icon: <Layout className="w-4 h-4" />,
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200",
    },
    {
      name: "Backend Developer",
      icon: <Database className="w-4 h-4" />,
      color: "bg-green-50 text-green-600 hover:bg-green-100 border-green-200",
    },
    {
      name: "Data Science",
      icon: <Code className="w-4 h-4" />,
      color:
        "bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200",
    },
    {
      name: "Graphic Designer",
      icon: <Palette className="w-4 h-4" />,
      color: "bg-pink-50 text-pink-600 hover:bg-pink-100 border-pink-200",
    },
    {
      name: "FullStack Developer",
      icon: <Layers className="w-4 h-4" />,
      color:
        "bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-200",
    },
  ];

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    router.push(`/browse`);
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Briefcase className="w-5 h-5 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Popular Categories
            </h2>
          </div>
          <p className="text-gray-600">Explore jobs by category</p>
        </div>

        {/* Carousel */}
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((category, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <button
                  onClick={() => searchJobHandler(category.name)}
                  className={`w-full group flex items-center justify-between rounded-xl py-3 px-4 border transition-all duration-300 ${category.color}`}
                >
                  <div className="flex items-center gap-3">
                    {category.icon}
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 border border-gray-200 hover:bg-gray-100" />
          <CarouselNext className="hidden md:flex -right-12 border border-gray-200 hover:bg-gray-100" />
        </Carousel>

        {/* Mobile Category Grid */}
        <div className="md:hidden grid grid-cols-1 gap-3 mt-6">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => searchJobHandler(category.name)}
              className={`w-full group flex items-center justify-between rounded-xl py-3 px-4 border transition-all duration-300 ${category.color}`}
            >
              <div className="flex items-center gap-3">
                {category.icon}
                <span className="font-medium">{category.name}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/browse")}
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            View All Categories
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
