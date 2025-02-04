"use client";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { Box, Typography } from "@mui/material";
import { Check, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import BikeAssignedModal from "./BikeAssignedModal";
import { LockIcon } from "@/utils/icons2";
import Image from "next/image";

const AllocateAsset = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [timeOfBikeIssue, setTimeOfBikeIssue] = useState(new Date());
  const [amPm, setAmPm] = useState("AM");

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
        label: "Bike Plate No",
        name: "bikePlateNo",
        type: "dropdown",
      },
      {
        label: "Bike City",
        name: "bikeCity",
        type: "input",
        text: "Sharjah",
      },
      {
        label: "Bike Ownership",
        name: "BikeOwnership",
        type: "input",
        text: "ABDS",
      },
      {
        label: "Date Of Bike Issue",
        name: "dateOfBikeIssue",
        type: "CustomDateField",
      },
      {
        label: "Time Of Bike Issue",
        name: "timeOfBikeIssue",
        type: "time",
      },
      {
        label: "Food Permit provided to Rider",
        name: "foodPermit",
        type: "dropdown",
      },
      {
        label: "Mulkiya provided to Rider",
        name: "mulkiya",
        type: "dropdown",
      },
      {
        label: "Picture of physical allocation to Rider",
        name: "physicalAllocationCopy",
        type: "CustomFileUploadField",
      },
      {
        label: "Acceptance letter",
        name: "acceptanceLetter",
        type: "CustomFileUploadField",
      },
    ];
  }, []);

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setTimeOfBikeIssue(new Date(newTime));
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
                    label={field.label}
                    required={true}
                    value={field.text}
                    disabled
                    startAdornment={
                      field.name === "BikeOwnership" ? (
                        <Image
                          src="/company/ABDS.svg"
                          width={20}
                          height={20}
                          alt="Bike Ownership Icon"
                        />
                      ) : null
                    }
                    endAdornment={<LockIcon />}
                  />
                )}

                {field.type === "dropdown" && (
                  <CustomDropdown label={field.label} />
                )}

                {field.type === "CustomDateField" && (
                  <CustomDateField
                    label={field.label}
                    value={field.value}
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

                {field.type === "CustomFileUploadField" && (
                  <CustomFileUploadField
                    label={field.label}
                    height={36.5}
                    borderRadius={5}
                    bgColor="#FFFFFF"
                    textSize="13px"
                    marginBottom="4px"
                    required={true}
                  />
                )}

                {field.type === "time" && (
                  <Box sx={{ display: "flex", alignItems: "self-end", gap: 2 }}>
                    <CustomTextField
                      value={formatTime(timeOfBikeIssue)}
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

      {showPopup && <BikeAssignedModal onClose={onClose} />}
    </Box>
  );
};

export default AllocateAsset;

const buttonStyle = {
  padding: "8px 20px",
  borderRadius: "6px",
  fontSize: "15px",
  fontWeight: 500,
  boxShadow: "0px 2px 6px 0px rgba(115, 103, 240, 0.30)",
};
