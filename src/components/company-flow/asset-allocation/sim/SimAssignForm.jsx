"use client";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { Box, InputAdornment, Typography } from "@mui/material";
import { Check, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import SimAssignedModal from "./SimAssignedModal";
import { LockOutlined } from "@mui/icons-material";
import Image from "next/image";

const SimAssignForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [timeOfSimIssue, setTimeOfSimIssue] = useState(new Date());
  const [amPm, setAmPm] = useState("AM");

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setTimeOfSimIssue(new Date(newTime));
  };

  const toggleAmPm = (newPeriod) => {
    setAmPm(newPeriod);
  };

  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const period = amPm;

    let formattedHours = hours % 12 || 12;
    let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const onClose = () => {
    setShowPopup(false);
  };
  const router = useRouter();

  const inputFields = useMemo(() => {
    return [
      {
        label: "Asset Type",
        name: "assetType",
        type: "dropdown",
      },

      {
        label: "Number",
        name: "simNumber",
        type: "dropdown",
      },
      {
        label: "Sim Operator",
        name: "simOperator",
        type: "dropdown",
      },

      {
        label: "Date Of Sim Issue",
        name: "dateOfSimIssue",
        type: "CustomDateField",
      },
      {
        label: "Time Of Sim Issue",
        name: "timeOfSimIssue",
        type: "time",
      },
    ];
  }, []);

  return (
    <Box>
      <Typography sx={{ color: "#4B465C", fontSize: "18px", fontWeight: 500 }}>
        Allocate Asset
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
                    placeholder={field.name}
                    label={field.label}
                    required={true}
                  />
                )}
                {field.type === "dropdown" && (
                  <CustomDropdown label={field.label} required={true} />
                )}
                {field.type === "CustomDateField" && (
                  <CustomDateField
                    label={field.label}
                    required={true}
                    borderRadius={1.5}
                    height={37.5}
                    bgcolor="#FFF"
                    textProps={{
                      fontSize: "13px",
                      marginBottom: 0.5,
                    }}
                  />
                )}
                {field.type === "time" && (
                  <Box sx={{ display: "flex", alignItems: "self-end", gap: 2 }}>
                    <CustomTextField
                      value={formatTime(timeOfSimIssue)}
                      onChange={handleTimeChange}
                      fullWidth
                      required={true}
                      label={field.label}
                      disabled
                    />
                    <CustomButton
                      variant="contained"
                      onClick={() => toggleAmPm("AM")}
                      sx={{
                        padding: "6px 10px",
                        borderRadius: "8px",
                        backgroundColor:
                          amPm === "AM" ? "#104774" : "transparent",
                        color: amPm === "AM" ? "#FFF" : "#333",
                      }}
                    >
                      AM
                    </CustomButton>
                    <CustomButton
                      variant="outlined"
                      onClick={() => toggleAmPm("PM")}
                      sx={{
                        padding: "6px 10px",
                        borderRadius: "8px",
                        borderColor: amPm === "PM" ? "#2F2B3D" : "#E6E6E9",
                        color: amPm === "PM" ? "#2F2B3D" : "#333",
                      }}
                    >
                      PM
                    </CustomButton>
                  </Box>
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
          // onClick={() => router.push("/admin/corporate")}
        >
          Back
        </CustomButton>
        <CustomButton
          endIcon={<Check />}
          sx={buttonStyle}
          onClick={() => setShowPopup(true)}
        >
          Allocate
        </CustomButton>
      </Box>
      {showPopup && <SimAssignedModal onClose={onClose} />}
    </Box>
  );
};

export default SimAssignForm;

const buttonStyle = {
  padding: "8px 20px",
  borderRadius: "6px",
  fontSize: "15px",
  fontWeight: 500,
  boxShadow: "0px 2px 6px 0px rgba(115, 103, 240, 0.30)",
};
