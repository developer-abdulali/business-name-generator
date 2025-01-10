import OutsideClickHandler from "react-outside-click-handler";
import { FC } from "react";
import { motion } from "motion/react";
import Logo from "./Logo";
import { X } from "lucide-react";
import { headerData } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        onClose();
      }}
    >
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-darkColor/50 shadow-xl hoverEffect w-full cursor-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="min-w-72 max-w-96 bg-darkColor text-white/70 h-full p-10 border-r border-r-white flex flex-col gap-6"
        >
          <div className="flex items-center justify-between">
            <button onClick={onClose}>
              <Logo className="text-white">Tulos</Logo>
            </button>
            <button
              onClick={onClose}
              className="hover:text-red-500 hoverEffect"
            >
              <X />
            </button>
          </div>

          <div className="flex flex-col gap-3.5 text-base font-semibold transition-shadow">
            {headerData?.map((item) => (
              <Link
                key={item?.title}
                onClick={onClose}
                href={item?.href}
                className={`hover:text-white hoverEffect w-24 ${
                  pathname === item?.href && "text-white"
                }`}
              >
                {item?.title}
              </Link>
            ))}
          </div>
          <SocialMedia />
        </motion.div>
      </div>
    </OutsideClickHandler>
  );
};
export default Sidebar;
