import React from "react";
import { custom } from "../../app/theme";
import { Box, Typography, useTheme } from "@mui/material";

const InputLabelTop = (props) => {
  const { text, required = false, sx } = props;
  return (
    <Box component="span" sx={{ position: "relative", width: "fit-content" }}>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 500,
          color: custom.primaryText,
          lineHeight: 2,
          ...sx,
        }}
        {...props}
      >
        {text}
      </Typography>
      {required && (
        <Typography
          color={custom.errorDark}
          sx={{ position: "absolute", top: -3, right: -10 }}
        >
          *
        </Typography>
      )}
    </Box>
  );
};

export default InputLabelTop;
