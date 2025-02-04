"use client";
import { Box, Typography } from "@mui/material";
import { Check, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import CurrencyType from "@/components/shared-components/CurrencyType";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomTextField from "@/components/shared-components/CustomTextField";

const bikeOptions = [
  { label: "Asset is cleared ", value: "assetIscleared" },
  { label: "Asset is lost", value: "assetIslost" },
];

const AssetVerificationForm = () => {
  const router = useRouter();

  // const handleClick = () => {
  //   router.push("/employees/employee-clearance");
  // };

  const inputFields = useMemo(() => {
    return [
      {
        label: "Bike",
        name: "reasonForAdvanceSalary",
        type: "dropdown",
      },
      {
        label: "Sim",
        name: "sim",
        type: "input",
        placeholder: "Please Select",
      },
      {
        label: "Deduction Amount",
        name: "deductionAmount",
        type: "input",
        placeholder: "e.g 5000",
        endAdornment: <CurrencyType />,
      },
      {
        label: "Clearance Form Upload",
        name: "clearanceFormCopy",
        type: "fileUpload",
        placeholder: "PDF Scanned",
      },
      {
        label: "Deduction Reason",
        name: "deductionReason",
        type: "input",
        placeholder: "e.g",
      },
    ];
  }, []);

  return (
    <Box>
      <Typography sx={{ color: "#4B465C", fontSize: "18px", fontWeight: 500 }}>
        Asset Verification
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
                    field.name === "assetType" ? "100%" : "calc(50% - 8px)",
                  fontSize: "13px",
                }}
              >
                {field.type === "input" && (
                  <CustomTextField
                    label={field.label}
                    required={true}
                    endAdornment={field.endAdornment}
                    placeholder={field.placeholder}
                  />
                )}

                {field.type === "dropdown" && (
                  <CustomDropdown
                    label={field.label}
                    required={true}
                    options={bikeOptions}
                  />
                )}
                {field.type === "fileUpload" && (
                  <CustomFileUploadField
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
          startIcon={<MoveLeft />}
          onClick={() =>
            router.push("/employees/employee-clearance?table=false")
          }
        >
          Back
        </CustomButton>
        <CustomButton
          endIcon={<Check />}
          sx={buttonStyle}
          onClick={() =>
            router.push("/employees/employee-clearance?table=true")
          }
        >
          Done
        </CustomButton>
      </Box>
    </Box>
  );
};

export default AssetVerificationForm;

const buttonStyle = {
  padding: "8px 20px",
  borderRadius: "6px",
  fontSize: "15px",
  fontWeight: 500,
  boxShadow: "0px 2px 6px 0px rgba(115, 103, 240, 0.30)",
};
