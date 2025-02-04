import React from "react";
import AppLogo from "../shared-components/AppLogo";
import HeadingText3 from "../shared-components/HeadingText3";
import DescriptiveText from "../shared-components/DescriptiveText";
import { Box } from "@mui/material";

const HeadingWrapper = (props) => {
  const { heading, subHeading } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: "column", gap: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <AppLogo />
      </Box>
      <Box>
        <HeadingText3 sx={{ width: "100%" }}>{heading}</HeadingText3>
        <DescriptiveText text={subHeading} fontSize={14} />
      </Box>
    </Box>
  );
};

export default HeadingWrapper;
