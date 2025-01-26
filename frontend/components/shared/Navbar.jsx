"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between container mx-auto px-4 xl:px-0 h-16">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold">
            Job<span className="text-[]">Portal</span>
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
              href="/"
              className={`hover:text-customRedColor cursor-pointer`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/jobs"
              className={`hover:text-customRedColor cursor-pointer`}
            >
              Jobs
            </Link>
          </li>
          <li>
            <Link
              href="/browse"
              className={`hover:text-customRedColor cursor-pointer`}
            >
              Browse
            </Link>
          </li>

          {/* Mobile Login & Signup Buttons */}
          {!user && (
            <div className="flex flex-col items-center gap-3 mt-5 lg:hidden">
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Signup</Button>
              </Link>
            </div>
          )}
        </ul>

        {/* Login & Signup Buttons for large screens */}
        <div className="hidden lg:flex gap-2">
          {!user ? (
            <>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/signup">
                <Button className={cn("bg-customColor")}>Signup</Button>
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
                      <Link href="/profile">Profile</Link>
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
