// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { LogOut, User2, Menu } from "lucide-react";
// import { Button } from "../ui/button";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const user = false;

//   return (
//     <div className="bg-white shadow-sm">
//       <div className="flex items-center justify-between px-4 mx-auto max-w-7xl h-16">
//         {/* Logo */}
//         <div>
//           <h1 className="text-2xl font-bold">
//             Job<span className="text-[#F83002]">Portal</span>
//           </h1>

//           {/* Menu icon for mobile */}
//           <button
//             className="block lg:hidden"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <Menu className="w-6 h-6 text-gray-800" />
//           </button>
//         </div>

//         {/* Links - Hidden on mobile and shown on large screens */}
//         <div>
//           <ul className="flex flex-col p-4 gap-3 lg:flex-row lg:p-0 lg:gap-5 lg:font-medium">
//             <li className="hover:text-[#F83002] cursor-pointer">Home</li>
//             <li className="hover:text-[#F83002] cursor-pointer">Jobs</li>
//             <li className="hover:text-[#F83002] cursor-pointer">Browse</li>
//           </ul>
//         </div>

//         {/* Login & Signup Btns */}
//         <div>
//           {!user ? (
//             <div className="flex flex-col gap-2 px-4 lg:flex-row lg:gap-2">
//               <Link to={"/login"}>
//                 <Button variant="outline" className="w-full lg:w-auto">
//                   Login
//                 </Button>
//               </Link>
//               <Link to={"/signup"}>
//                 <Button className="w-full text-white bg-[#6A38C2] rounded-md hover:bg-[#5b30a6] lg:w-auto">
//                   Signup
//                 </Button>
//               </Link>
//             </div>
//           ) : (
//             <Popover>
//               <PopoverTrigger>
//                 <Avatar className="cursor-pointer">
//                   <AvatarImage src="https://github.com/shadcn.png" />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//               </PopoverTrigger>
//               <PopoverContent className="w-80">
//                 <div className="flex gap-4">
//                   <Avatar className="cursor-pointer">
//                     <AvatarImage src="https://github.com/shadcn.png" />
//                   </Avatar>
//                   <div>
//                     <h4 className="font-medium">Ali</h4>
//                     <p className="text-sm text-muted-foreground">
//                       Lorem ipsum dolor sit amet.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex flex-col my-2 text-gray-600">
//                   <div className="flex w-fit items-center gap-2 cursor-pointer">
//                     <User2 />
//                     <Button variant="link">Profile</Button>
//                   </div>
//                   <div className="flex w-fit items-center gap-2 cursor-pointer">
//                     <LogOut />
//                     <Button variant="link">Logout</Button>
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Navbar;

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = false;

  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 mx-auto max-w-7xl h-16">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        {/* Menu icon for mobile */}
        <button
          className="block lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-800" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800" />
          )}
        </button>

        {/* Links - Hidden on mobile and shown on large screens */}
        <ul
          className={`fixed inset-0 top-16 z-40 bg-white flex flex-col items-center gap-5 py-10 text-lg font-medium transform ${
            isMenuOpen
              ? " bg-red-300 sm:w-2/4 md:w-3/4 translate-x-0"
              : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:static lg:flex lg:flex-row lg:gap-5 lg:translate-x-0 lg:py-0 lg:bg-transparent lg:top-0`}
        >
          <li className="hover:text-[#F83002] cursor-pointer">Home</li>
          <li className="hover:text-[#F83002] cursor-pointer">Jobs</li>
          <li className="hover:text-[#F83002] cursor-pointer">Browse</li>

          {/* Mobile Login & Signup Buttons */}
          {!user && (
            <div className="flex flex-col items-center gap-3 mt-5 lg:hidden">
              <Link to={"/login"}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="w-full text-white bg-[#6A38C2] rounded-md hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </ul>

        {/* Login & Signup Buttons for large screens */}
        <div className="hidden lg:flex gap-2">
          {!user ? (
            <>
              <Link to={"/login"}>
                <Button variant="outline" className="lg:w-auto">
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="text-white bg-[#6A38C2] rounded-md hover:bg-[#5b30a6] lg:w-auto">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Ali</h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">Profile</Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
