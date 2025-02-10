"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X, Bookmark } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/lib/constant";
import { setUser } from "@/redux/slices/authSlice";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import DarkModeToggle from "../DarkModeToggle";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        dispatch(clearAllAppliedJobs());
        dispatch(clearSavedJobs());

        router.push("/");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const links =
    user && user.role === "recruiter"
      ? [
          { href: "/recruiter/companies", label: "Companies" },
          { href: "/recruiter/jobs", label: "Jobs" },
        ]
      : [
          { href: "/", label: "Home" },
          { href: "/jobs", label: "Jobs" },
          { href: "/browse", label: "Browse" },
        ];

  return (
    <section className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto px-4 sm:px-6 2xl:px-0 h-16">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Job<span className="text-purple-600">Portal</span>
          </h1>
        </Link>

        {/* Menu icon for mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <DarkModeToggle />
          {user && (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profileImage} />
                  <AvatarFallback>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-fit bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <div className="flex items-center gap-4 p-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profileImage} />
                    <AvatarFallback>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {user?.fullname}
                    </h4>
                    <p className="-mt-1 text-sm text-muted-foreground dark:text-gray-300">
                      {user?.role}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col my-2 text-gray-600 dark:text-gray-300">
                  <Link
                    href="/saved-jobs"
                    className="flex w-full items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Bookmark className="text-gray-600 dark:text-gray-300" />
                    <span>Saved Job</span>
                  </Link>

                  <Link
                    href="/profile"
                    className="flex w-full items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User2 className="text-gray-600 dark:text-gray-300" />
                    <span>Profile</span>
                  </Link>

                  <div
                    onClick={logoutHandler}
                    className="flex w-full items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="text-gray-600 dark:text-gray-300" />
                    <span>Logout</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-800 dark:text-gray-100"
          >
            {isMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Links - Hidden on mobile and shown on large screens */}
        <ul
          className={`fixed inset-0 top-16 z-40 bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-5 py-10 text-lg font-medium transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:static lg:flex lg:flex-row lg:gap-5 lg:translate-x-0 lg:py-0 lg:bg-transparent lg:top-0`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "hover:text-purple-600 cursor-pointer p-2 lg:p-0 text-gray-900 dark:text-gray-100",
                pathname === link.href && "border-b-2 border-purple-600"
              )}
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile Login & Signup Buttons */}
          {!user && (
            <div className="flex flex-col items-center gap-3 mt-5 lg:hidden">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="hover:bg-purple-600 hover:text-white dark:hover:bg-gray-700 dark:hover:text-gray-100"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="outline"
                  className="hover:bg-purple-600 hover:text-white dark:hover:bg-gray-700 dark:hover:text-gray-100"
                >
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </ul>

        {/* Login & Signup Buttons for large screens */}
        <div className="hidden lg:flex gap-2 items-center">
          {!user ? (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="hover:bg-purple-600 hover:text-white dark:hover:bg-gray-700 dark:hover:text-gray-100"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="outline"
                  className="hover:bg-purple-600 hover:text-white dark:hover:bg-gray-700 dark:hover:text-gray-100"
                >
                  Signup
                </Button>
              </Link>
              <DarkModeToggle />
            </div>
          ) : (
            <>
              <DarkModeToggle />

              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profileImage} />
                    <AvatarFallback>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-fit bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <div className="flex items-center gap-4 p-4">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profileImage} />
                      <AvatarFallback>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {user?.fullname}
                      </h4>
                      <p className="-mt-1 text-sm text-muted-foreground dark:text-gray-300">
                        {user?.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col my-2 text-gray-600 dark:text-gray-300">
                    <Link
                      href="/saved-jobs"
                      className="flex w-full items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Bookmark className="text-gray-600 dark:text-gray-300" />
                      <span>Saved Job</span>
                    </Link>

                    <Link
                      href="/profile"
                      className="flex w-full items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <User2 className="text-gray-600 dark:text-gray-300" />
                      <span>Profile</span>
                    </Link>

                    <div
                      onClick={logoutHandler}
                      className="flex w-full items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="text-gray-600 dark:text-gray-300" />
                      <span>Logout</span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
