import React from "react";
import { Box } from "@mui/material";
import PassportReturn from "@/components/company-flow/passport-return";

const Page = ({searchParams}) => {
  return (
    <Box>
      <PassportReturn params={searchParams} />
    </Box>
  );
};

export default Page;
