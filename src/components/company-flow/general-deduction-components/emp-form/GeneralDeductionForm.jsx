"use client";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { Box, Typography } from "@mui/material";
import { Check, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import CurrencyType from "@/components/shared-components/CurrencyType";

const bikeOptions = [
  { label: "Asset is cleared ", value: "assetIscleared" },
  { label: "Asset is lost", value: "assetIslost" },
];

const GeneralDeductionForm = () => {
  const router = useRouter();

  const inputFields = useMemo(() => {
    return [
      {
        label: "Reason of Deduction",
        name: "reasonOfDeduction",
        type: "dropdown",
      },

      {
        label: "Amount",
        name: "amount",
        type: "input",
        placeholder: "e.g 1500",
        endAdornment: <CurrencyType />,
      },
      {
        label: "Comments/Remarks",
        name: "commentsRemarks",
        type: "input",
        placeholder: "e.g",
      },
    ];
  }, []);

  return (
    <Box>
      <Typography sx={{ color: "#4B465C", fontSize: "18px", fontWeight: 500 }}>
        EMP General Deduction Form
      </Typography>

      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 2 }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, flex: 1 }}>
          {inputFields?.map((field, index) => {
            return (
              <Box
                key={field.name}
                sx={{
                  width:
                    field.name === "commentsRemarks"
                      ? "100%"
                      : "calc(50% - 8px)",
                  height: field.name === "commentsRemarks" ? "80px" : "",
                  fontSize: "13px",
                }}
              >
                {field.type === "input" && (
                  <CustomTextField
                    label={field.label}
                    required={true}
                    endAdornment={field.endAdornment}
                    placeholder={field.placeholder}
                    sx={{ height: "50px" }}
                  />
                )}

                {field.type === "dropdown" && (
                  <CustomDropdown
                    label={field.label}
                    required={true}
                    options={bikeOptions}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}
      >
        <CustomButton
          bgColor="secondary"
          sx={buttonStyle}
          startIcon={<MoveLeft size={16} />}
          onClick={() => router.push("/employees/general-deduction?table=false")}
        >
          Back
        </CustomButton>
        <CustomButton
          endIcon={<Check size={16} />}
          sx={buttonStyle}
          onClick={() => router.push("/employees/general-deduction?table=true")}
        >
          Done
        </CustomButton>
      </Box>
    </Box>
  );
};

export default GeneralDeductionForm;

const buttonStyle = {
  padding: "8px 20px",
  borderRadius: "6px",
  fontSize: "15px",
  fontWeight: 500,
  boxShadow: "0px 2px 6px 0px rgba(115, 103, 240, 0.30)",
};
