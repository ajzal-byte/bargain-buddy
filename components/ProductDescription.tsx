"use client";

import { useState } from "react";

type Props = {
  description: string;
};

const ProductDescription = ({ description }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => setIsExpanded(!isExpanded);
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-2xl text-secondary font-semibold">
        Product Description
      </h3>

      <div className="flex flex-col gap-4">
        {description?.length > 700 && (
          <>
            <p className="description-text">
              {isExpanded ? description : description.slice(0, 700)}{" "}
              <span
                className="text-primary font-medium cursor-pointer"
                onClick={() => toggleDescription()}
              >
                {isExpanded ? "Read Less" : "Read More..."}
              </span>
            </p>
            {/* <button
              className="text-primary font-medium mt-2"
              onClick={() => toggleDescription()}
            >
              {isExpanded ? "Read Less" : "Read More.."}
            </button> */}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
