import { productTypes } from "@/constants";
import { Repeat } from "lucide-react";

interface ITabs {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabs = ({ selectedTab, onTabSelect }: ITabs) => {
  return (
    <div className="flex items-center gap-1.5 text-sm font-semibold">
      <div className="flex items-center gap-1.5">
        {productTypes?.map((type) => (
          <button
            key={type?.title}
            onClick={() => onTabSelect(type?.title)}
            className={`border border-darkColor px-4 py-1.5 md:px-6 dm:py-2 rounded-full hover:bg-darkColor hover:text-white hoverEffect ${selectedTab === type?.title && "bg-darkColor text-white"}`}
          >
            {type?.title}
          </button>
        ))}
      </div>
      <button className="border border-darkColor p-2 rounded-full hover:bg-darkColor hover:text-white hoverEffect">
        <Repeat className="w-5 h-5" />
      </button>
    </div>
  );
};
export default HomeTabs;
