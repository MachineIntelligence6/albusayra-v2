"use client";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { Box, Typography } from "@mui/material";
import { Check, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";

const bikeOptions = [
  { label: "Asset is cleared ", value: "assetIscleared" },
  { label: "Asset is lost", value: "assetIslost" },
];

const PassportReturnForm = () => {
  const router = useRouter();

  const inputFields = useMemo(() => {
    return [
      {
        label: "Reason",
        name: "reason",
        type: "input",
        placeholder: "e.g any",
      },
      {
        label: "Document Attachment",
        name: "documentAttachment",
        type: "file-upload",
        placeholder: "Upload Picture",
      },
      {
        label: "Passport Return Date",
        name: "passportReturnDate",
        type: "datefield",
      },
    ];
  }, []);

  return (
    <Box>
      <Typography sx={{ color: "#4B465C", fontSize: "18px", fontWeight: 500 }}>
        Passport Temp Return Request Form
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

                {field.type === "datefield" && (
                  <CustomDateField label={field.label} required={true} />
                )}
                {field.type === "file-upload" && (
                  <CustomFileUploadField
                    label={field.label}
                    required={true}
                    options={bikeOptions}
                    placeholder={field.placeholder}
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
          onClick={() => router.push("/employees/passport-return?table=false")}
        >
          Back
        </CustomButton>
        <CustomButton
          endIcon={<Check size={16} />}
          sx={buttonStyle}
          onClick={() => router.push("/employees/passport-return?table=true")}
        >
          Done
        </CustomButton>
      </Box>
    </Box>
  );
};

export default PassportReturnForm;

const buttonStyle = {
  padding: "8px 20px",
  borderRadius: "6px",
  fontSize: "15px",
  fontWeight: 500,
  boxShadow: "0px 2px 6px 0px rgba(115, 103, 240, 0.30)",
};
