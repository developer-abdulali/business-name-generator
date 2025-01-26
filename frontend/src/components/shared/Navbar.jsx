import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
// import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@nextui-org/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between container mx-auto px-4 xl:px-0 h-16">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </Link>

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
              ? "bg-red-300 sm:w-2/4 md:w-3/4 translate-x-0"
              : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:static lg:flex lg:flex-row lg:gap-5 lg:translate-x-0 lg:py-0 lg:bg-transparent lg:top-0`}
        >
          <li>
            <Link
              to="/"
              className={`hover:text-[#F83002] cursor-pointer ${
                isActive("/") ? "border-b-2 border-[#F83002]" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/jobs"
              className={`hover:text-[#F83002] cursor-pointer ${
                isActive("/jobs") ? "border-b-2 border-[#F83002]" : ""
              }`}
            >
              Jobs
            </Link>
          </li>
          <li>
            <Link
              to="/browse"
              className={`hover:text-[#F83002] cursor-pointer ${
                isActive("/browse") ? "border-b-2 border-[#F83002]" : ""
              }`}
            >
              Browse
            </Link>
          </li>

          {/* Mobile Login & Signup Buttons */}
          {!user && (
            <div className="flex flex-col items-center gap-3 mt-5 lg:hidden">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full text-white bg-customColor rounded-md hover:bg-[#5b30a6]">
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
              <Link to="/login">
                <Button>Login</Button>
                {/* <Button variant="outline" className="lg:w-auto">
                  Login
                </Button> */}
              </Link>
              <Link to="/signup">
                <Button className="text-white bg-customColor rounded-md hover:bg-[#5b30a6] lg:w-auto">
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
                    <Button variant="link">
                      <Link to="/profile">Profile</Link>
                    </Button>
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
