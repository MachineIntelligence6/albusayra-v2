import React from "react";
import AssetAllocation from "@/components/company-flow/asset-allocation";

const page = ({ searchParams }) => {
  return (
    <div>
      <AssetAllocation params={searchParams} />
    </div>
  );
};

export default page;
