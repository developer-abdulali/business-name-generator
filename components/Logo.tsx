import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Logo = ({ children, className }: Props) => {
  return (
    <Link
      href={"/"}
      className={cn("text-2xl font-black tracking-wider uppercase" + className)}
    >
      {children}
    </Link>
  );
};
export default Logo;
