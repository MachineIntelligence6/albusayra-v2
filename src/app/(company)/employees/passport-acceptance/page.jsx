import React from "react";
import { Box } from "@mui/material";
import PassportAcceptance from "@/components/company-flow/passport-acceptance";

const Page = ({searchParams}) => {
  return (
    <Box>
      <PassportAcceptance  params={searchParams} />
    </Box>
  );
};

export default Page;
