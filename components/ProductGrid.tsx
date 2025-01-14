"use client";
import { useState } from "react";
import HomeTabs from "./HomeTabs";
import { productTypes } from "@/constants";

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState(productTypes[0]?.title || "");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="mt-10 flex flex-col items-center">
      <HomeTabs selectedTab={selectedTab} onTabSelect={setSelectedTab} />
    </div>
  );
};
export default ProductGrid;
