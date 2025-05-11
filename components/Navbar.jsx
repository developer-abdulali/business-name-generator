"use client";
import { useQueryContext } from "@/context/BusinessNameContext";
import { Menu, MoveRight, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const { sidebarOpen, setSidebarOpen } = useQueryContext();
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#202020] flex items-center justify-between px-4 sm:px-10 md:px-16 lg:px-20 py-6 md:py-6 gap-3 md:gap-0 z-50">
      <div className="flex items-center gap-1">
        <div className="lg:hidden">
          {sidebarOpen ? (
            <X onClick={() => setSidebarOpen(false)} className="text-white" />
          ) : (
            <Menu onClick={() => setSidebarOpen(true)} className="text-white" />
          )}
        </div>
        <Link href="/">
          <h1 className="uppercase text-2xl md:text-4xl text-primary font-semibold">
            Business
          </h1>
        </Link>
      </div>
      <a
        href="https://github.com/developer-abdulali"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:underline hover:text-primary flex items-center gap-2 text-sm md:text-base"
      >
        By Developer Abdul Ali
        <MoveRight className="w-4 h-4 md:w-5 md:h-5" />
      </a>
    </nav>
  );
};

export default Navbar;
