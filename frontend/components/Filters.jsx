"use client";
import { useState } from "react";
import { Label } from "./ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    options: [
      "Shikarpur",
      "Sukkur",
      "Hyderabad",
      "Karachi",
      "Islamabad",
      "Rawalpindi",
      "Lahore",
      "Multan",
      "Peshawar",
      "Bahawalpur",
      "Sargodha",
    ],
  },
  {
    filterType: "Job Type",
    options: ["Full Time", "Part Time", "Contractual", "Internship"],
  },
  {
    filterType: "Experience",
    options: ["0-1 years", "1-2 years", "2-3 years", "3+ years"],
  },
  {
    filterType: "Salary",
    options: ["10-20k", "20-30k", "30-40k", "40-50k", "50-60k", "60-80k"],
  },
];

const Filters = ({ onFilterChange }) => {
  const [openFilters, setOpenFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleFilter = (filterType) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  const handleSelection = (filterType, value) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[filterType] || [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      const updatedFilters = { ...prev, [filterType]: updatedValues };
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <section className="mb-6 lg:mb-0">
      {filterData.map((data) => (
        <div key={data.filterType} className="mb-4">
          <button
            onClick={() => toggleFilter(data.filterType)}
            className="flex justify-between items-center w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <Label className="text-gray-900 dark:text-gray-100">
              {data.filterType}
            </Label>
            {openFilters[data.filterType] ? <ChevronUp /> : <ChevronDown />}
          </button>
          {openFilters[data.filterType] && (
            <div className="mt-2 space-y-2">
              {data.options.map((item) => (
                <div key={item} className="flex items-center">
                  <input
                    type="checkbox"
                    id={item}
                    checked={selectedFilters[data.filterType]?.includes(item)}
                    onChange={() => handleSelection(data.filterType, item)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={item}
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Filters;
