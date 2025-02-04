"use client";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { Box, Chip, Typography } from "@mui/material";
import { Check, MoveLeft, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import { custom } from "@/app/theme";

// const bikeOptions = [
//   { label: "Asset is cleared ", value: "assetIscleared" },
//   { label: "Asset is lost", value: "assetIslost" },
// ];

const PassportAcceptanceForm = () => {
  const [images, setImages] = useState(["Img-123.jpg", "Img-456.jpg"]);

  const router = useRouter();

  // Add a new placeholder image
  const handleAddImage = () => {
    const newImage = `Img-${Math.floor(Math.random() * 1000)}.jpg`;
    setImages((prev) => [...prev, newImage]);
  };

  // Remove an image
  const handleDeleteImage = (imageToDelete) => {
    setImages((prev) => prev.filter((image) => image !== imageToDelete));
  };

  const inputFields = useMemo(() => {
    return [
      {
        label: "Submission Date",
        name: "passportReturnDate",
        type: "datefield",
      },
      {
        label: "Passport Handed Over To",
        name: "passportHandOverTo",
        type: "dropdown",
        placeholder: "e.g any",
      },
      {
        label: "Upload Evidence",
        name: "uploadEvidence",
        type: "file-upload",
        placeholder: "Upload Picture",
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
                {field.type === "datefield" && (
                  <CustomDateField label={field.label} required={true} />
                )}
                {field.type === "dropdown" && (
                  <CustomDropdown
                    label={field.label}
                    required={true}
                    // options={bikeOptions}
                  />
                )}
                {field.type === "file-upload" && (
                  <Box sx={{ width: "100%", mb: 3 }}>
                    {/* Field Heading */}
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: "14px",
                        mb: 1,
                        color: "#333",
                      }}
                    >
                      Upload Evidence{" "}
                      <Box component="span" sx={{ color: "red" }}>
                        *
                      </Box>
                    </Typography>
                    {/* Chip Container */}

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        overflowX: "auto",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "4px",
                        width: "100%", // Ensure full width
                        boxSizing: "border-box",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* Uploaded Images as Chips */}
                      <Box>
                        {images.map((image, index) => (
                          <Chip
                            key={index}
                            label={image}
                            onDelete={() => handleDeleteImage(image)}
                            avatar={
                              <Box
                                component="img"
                                src="/icons/image-placeholder.svg" // Replace with a placeholder image path
                                alt="Image Placeholder"
                                sx={{
                                  width: 20,
                                  height: 20,
                                  padding: "2px",
                                  borderRadius: "50%",
                                }}
                              />
                            }
                            sx={{
                              background: "#F4F4F4",
                              color: custom.primaryText,
                              fontSize: "12px",
                              borderRadius: "16px",
                            }}
                          />
                        ))}
                      </Box>

                      {/* Add Button */}
                      <CustomButton
                        variant="contained"
                        sx={{
                          bgcolor: "#E6E6E9",
                          padding: "4px",
                          width: "20px",
                          borderRadius: "8px",
                          borderColor: "#2F2B3DE5",
                        }}
                        onClick={handleAddImage}
                      >
                        <PlusIcon sx={{ color: "#2F2B3DE5" }} />
                      </CustomButton>
                    </Box>
                  </Box>
                )}
                {/* {field.type === "file-upload" && (
                  <CustomFileUploadField
                    label={field.label}
                    required={true}
                    placeholder={field.placeholder}
                  />
                )} */}
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
          onClick={() =>
            router.push("/employees/passport-acceptance?table=false")
          }
        >
          Back
        </CustomButton>
        <CustomButton
          endIcon={<Check size={16} />}
          sx={buttonStyle}
          onClick={() =>
            router.push("/employees/passport-acceptance?table=true")
          }
        >
          Done
        </CustomButton>
      </Box>
    </Box>
  );
};

export default PassportAcceptanceForm;

const buttonStyle = {
  padding: "8px 20px",
  borderRadius: "6px",
  fontSize: "15px",
  fontWeight: 500,
  boxShadow: "0px 2px 6px 0px rgba(115, 103, 240, 0.30)",
};
