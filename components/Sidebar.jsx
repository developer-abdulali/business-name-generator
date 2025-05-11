"use client";
import { Card, CardContent } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { nameStyle, Randomness } from "@/helpers/constant";
import { Label } from "./ui/label";
import { useQueryContext } from "@/context/BusinessNameContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import Link from "next/link";

const Sidebar = ({ refresh, setRefresh }) => {
  const { query, updateQuery, sidebarOpen, setSidebarOpen } = useQueryContext();

  const handleNameStyle = (nameStyle) => {
    updateQuery({ nameStyle });
  };

  const handleRandomness = (randomness) => {
    updateQuery({ randomness });
  };

  const handleFormField = (e) => {
    updateQuery({ [e.target.name]: e.target.value });
  };

  const generateBusinessName = () => {
    setRefresh(!refresh);
  };

  return (
    <div
      className={`
        fixed top-0 left-0 h-full w-64 sm:w-72 lg:w-full z-50 bg-[#202020]
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:block
      `}
    >
      {/* Close Icon for Mobile */}
      <div
        className="absolute top-4 right-4 lg:hidden cursor-pointer"
        onClick={() => setSidebarOpen(false)}
      >
        <X className="text-white w-6 h-6" />
      </div>

      <Card className="bg-transparent rounded-md pt-3 border border-gray-600 w-full h-full overflow-y-auto">
        <CardContent className="space-y-6">
          <Link href="/" className="lg:hidden">
            <h1 className="uppercase text-2xl md:text-4xl text-primary font-semibold">
              Business
            </h1>
          </Link>
          <div className="mt-5">
            <h4 className="text-white text-xl font-semibold mb-3">
              Name Style
            </h4>
            <RadioGroup
              value={query?.nameStyle || "Auto"}
              onValueChange={handleNameStyle}
            >
              {nameStyle?.map((style) => (
                <Label
                  key={`nameStyle-${style.id}`}
                  htmlFor={`nameStyle${style.id}`}
                  className="flex items-center gap-5"
                >
                  <RadioGroupItem
                    value={style.name}
                    id={`nameStyle${style.id}`}
                  />
                  <p className="text-white text-md font-semibold mb-1">
                    {style.name}
                  </p>
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h4 className="text-white text-xl font-semibold mb-3">
              Randomness
            </h4>
            <RadioGroup
              value={query?.randomness || "Medium"}
              onValueChange={handleRandomness}
            >
              {Randomness?.map((level) => (
                <Label
                  key={`randomness-${level.id}`}
                  htmlFor={`randomness${level.id}`}
                  className="flex items-center gap-5"
                >
                  <RadioGroupItem
                    value={level.name}
                    id={`randomness${level.id}`}
                  />
                  <p className="text-white text-md font-semibold mb-1">
                    {level.name}
                  </p>
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div>
            <div className="mb-3">
              <Label className="mb-2 text-white">Keyword</Label>
              <Input
                name="keyword"
                placeholder="Keyword"
                value={query?.keyword || ""}
                onChange={handleFormField}
                className="w-full text-white"
              />
            </div>
            <div className="mb-3">
              <Label className="mb-2 text-white">Description</Label>
              <Input
                name="description"
                placeholder="Description"
                value={query?.description || ""}
                onChange={handleFormField}
                className="w-full text-white"
              />
            </div>
            <Button className="w-full" onClick={generateBusinessName}>
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
