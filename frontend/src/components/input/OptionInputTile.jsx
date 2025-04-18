import React from "react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

const OptionInputTile = ({ isSelected, label, onSelect }) => {
  const getColors = () => {
    if (isSelected) {
      return "text-white bg-primary border-sky-400";
    }
    return "text-black bg-slate-200 border-slate-200";
  };

  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-2 px-3 py-1 mb-4 border rounded-md ${getColors()}`}
    >
      {isSelected ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
      <span className="text-[13px]">{label}</span>
    </button>
  );
};

export default OptionInputTile;
