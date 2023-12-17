import Wrapper from "@/Components/Wrapper/Wrapper";
import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";

const ProductDetails = () => {
  return (
    <div className="w-full md:py-2">
      <Wrapper>
        {/* left section div start */}
        <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
          left
        </div>
        {/* left section div end */}

        {/* right section div start */}
        <div className="flex-[1] py-3">right</div>
        {/* right section div end*/}
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
