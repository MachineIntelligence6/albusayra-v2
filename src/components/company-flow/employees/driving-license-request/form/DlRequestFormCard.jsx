"use client";
import { Box, Typography } from "@mui/material";
import { Check, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import CurrencyType from "@/components/shared-components/CurrencyType";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomTextField from "@/components/shared-components/CustomTextField";
import DeductionType from "./DeductionType";
import CustomButton from "@/components/shared-components/CustomButton";

const DlRequestFormCard = () => {
  const router = useRouter();

  // const handleClick = () => {
  //   router.push("/employees/driving-license-request?table=true");
  // };

  const months = ["Month 1", "Month 2", "Month 3"];

  const [deductionType, setDeductionType] = useState("");

  const inputFields = useMemo(() => {
    return [
      {
        label: "Date",
        name: "date",
        type: "CustomDateField",
      },
      {
        label: "Reason For Driving License",
        name: "reasonForDL",
        type: "simple-input",
        placeholder: "e.g",
      },
      {
        label: "Driving License Amount Charged to Rider",
        name: "dlAmount",
        type: "input",
        placeholder: "e.g 900",
      },
      {
        label: "Driving License Purchase Cost(Actual License cost)",
        name: "dlPurchaseCost",
        type: "input",
        placeholder: "e.g 600",
      },
      {
        label: "Advance Received",
        name: "advanceReceived",
        type: "input",
        placeholder: "e.g 300",
      },
      {
        label: "Remaining Balance",
        name: "remainingBalance",
        type: "input",
        placeholder: "e.g 600",
        isDisable: true,
      },
      {
        label: "Installment Plan",
        name: "installmentPlan",
        type: "dropdown",
        placeholder: "3 Months",
        options: [
          { label: "Up Front", value: "upFront" },
          { label: "3 Months", value: "3months" },
          { label: "6 Months", value: "6months" },
        ],
        showDropdown: true,
      },
      {
        label: "Deduction Type",
        name: "deductionType",
        type: "dropdown",
        placeholder: "Please Select",
        options: [
          { label: "Fixed", value: "fixed" },
          { label: "Variable", value: "variable" },
        ],
        onChange: (event) => setDeductionType(event.target.value),
        showDropdown: true,
      },
    ];
  }, []);

  return (
    <Box>
      <Typography sx={{ color: "#4B465C", fontSize: "18px", fontWeight: 500 }}>
        Driving License Request Form
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
                    endAdornment={<CurrencyType />}
                    placeholder={field.placeholder}
                    disabled={field.isDisable}
                  />
                )}
                {field.type === "simple-input" && (
                  <CustomTextField
                    label={field.label}
                    required={true}
                    placeholder={field.placeholder}
                  />
                )}

                {field.type === "dropdown" && field.showDropdown && (
                  <CustomDropdown
                    label={field.label}
                    required={true}
                    options={field.options}
                    onChange={field.onChange}
                  />
                )}

                {field.type === "CustomDateField" && (
                  <CustomDateField
                    label={field.label}
                    required={true}
                    borderRadius={1.5}
                    height={37.5}
                    textProps={{ fontSize: "13px", marginBottom: 0.5 }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      <DeductionType deductionType={deductionType} months={months} />

      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}
      >
        <CustomButton
          bgColor="secondary"
          sx={buttonStyle}
          startIcon={<MoveLeft />}
          onClick={() =>
            router.push("/employees/driving-license-request?table=false")
          }
        >
          Back
        </CustomButton>
        <CustomButton
          endIcon={<Check />}
          sx={buttonStyle}
          onClick={() =>
            router.push("/employees/driving-license-request?table=true")
          }
        >
          Request
        </CustomButton>
      </Box>
    </Box>
  );
};

const buttonStyle = {
  padding: "8px 20px",
  borderRadius: "6px",
  fontSize: "15px",
  fontWeight: 500,
  boxShadow: "0px 2px 6px 0px rgba(115, 103, 240, 0.30)",
};

export default DlRequestFormCard;
