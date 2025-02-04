import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CurrencyType from "@/components/shared-components/CurrencyType";

const DeductionType = ({ deductionType, months }) => {
  if (!deductionType) return null;

  const fixedValue = 200;

  return (
    <Box
      sx={{
        marginTop: 4,
        borderRadius: "6px",
        border: "1px solid rgba(128, 131, 144, 0.16)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#80839014",
          p: 2,
          borderRadius: "6px",
        }}
      >
        <Typography
          sx={{
            flexGrow: 1,
            fontSize: "13px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          MONTHS
        </Typography>
        <Typography
          sx={{
            textAlign: "start",
            flexGrow: 1,
            fontSize: "13px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          AMOUNT
        </Typography>
      </Box>

      {months.map((month, index) => (
        <Box key={month}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderRadius: "6px",
            }}
          >
            <Typography
              sx={{ flexGrow: 1, fontSize: "15px", lineHeight: "24px" }}
            >
              {month}
            </Typography>

            <CustomTextField
              required={true}
              endAdornment={<CurrencyType />}
              fullWidth={false}
              placeholder={deductionType === "fixed" ? `${fixedValue}` : "200"}
              value={deductionType === "fixed" ? fixedValue : ""}
              sx={{
                flexGrow: 1,
                maxWidth: "515px",
                bgcolor: deductionType === "fixed" ? "#80839014" : "",
              }}
              disabled={deductionType === "fixed"}
            />
          </Box>

          {index < months.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
};

export default DeductionType;
