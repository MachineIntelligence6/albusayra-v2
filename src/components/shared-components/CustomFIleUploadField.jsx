"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { CircleX } from "lucide-react";
import InputLabelTop from "./InputLabel";
import { FIleIcon } from "@/utils/Icons";

const CustomFileUploadField = (props) => {
  const {
    value, // Can be a File object or a URL string
    onChange,
    placeholder,
    label,
    height = 38,
    borderRadius = 0,
    textSize = "body1",
    buttonText = "Upload",
    bgColor,
    required = false,
    accept = "*",
    error,
  } = props;

  const [fileValue, setFileValue] = useState(value);
  const [isError, setIsError] = useState(error);

  // Update fileValue if a new URL or file is passed
  useEffect(() => {
    if (value) {
      setFileValue(value);
      setIsError(false); // Reset error if value is provided
    }
  }, [value]);

  const handleChange = (file) => {
    if (file) {
      setFileValue(file);
      onChange?.(file);
      setIsError(false); // Reset error on file selection
    }
  };

  const handleClear = () => {
    setFileValue(null);
    onChange?.(null);
    setIsError(true); // Show error when cleared
  };

  // Extract file name from the URL or File object
  const getFileName = () => {
    if (fileValue instanceof File) {
      return fileValue.name;
    }
    if (typeof fileValue === "string") {
      return fileValue.split("/").pop(); // Extract file name from URL
    }
    return "";
  };

  const handleValidation = () => {
    if (!fileValue) {
      setIsError(true); // Show error if no file is selected
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "start", flexDirection: "column" }}>
      {label && <InputLabelTop text={label} required={required} />}
      <Box
        sx={{
          flex: "1",
          width: "100%",
          display: "flex",
          alignItems: "center",
          border: isError ? "1px solid #d32f2f" : "1px solid #D5D4D7",
          borderRadius: 1.5,
        }}
      >
        <CustomTextField
          value={getFileName()} // Display file name
          startAdornment={
            getFileName() ? <FIleIcon size={22} color="#E6483D" /> : null
          }
          placeholder={placeholder || "PDF Scanned"}
          disabled
          error={isError}
          removeRightBorder={true}
          sx={{
            height: height,
            "& .MuiInputBase-root": {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: borderRadius,
              borderBottomLeftRadius: borderRadius,
              backgroundColor: bgColor,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />
        {!getFileName() ? (
          <Button
            variant="outlined"
            component="label"
            sx={{
              pt: 0.5,
              mx: 0,
              color: "#2F2B3DE5",
              backgroundColor: "#E6E6E9",
              textTransform: "capitalize",
              border: isError ? "1px solid #d32f2f" : "1px solid #bcbcbce4",
              "&:hover": {
                border: isError ? "1px solid #d32f2f" : "1px solid #bcbcbce4",
              },
            }}
          >
            {buttonText}
            <input
              type="file"
              accept={accept}
              style={{ height: height }}
              hidden
              onChange={(e) => handleChange(e.target.files?.[0])}
              onBlur={handleValidation} // Validate when losing focus
            />
          </Button>
        ) : (
          <Box
            component="button"
            sx={{
              px: 1,
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onClick={handleClear}
          >
            <CircleX
              size={22}
              style={{
                backgroundColor: "#2F2B3DE5",
                borderRadius: "50%",
                color: "white",
              }}
            />
          </Box>
        )}
      </Box>
      {isError && (
        <Typography
          variant="caption"
          color="error"
          sx={{ mt: 0.5, fontSize: 15 }}
        >
          Please upload a valid file.
        </Typography>
      )}
    </Box>
  );
};

export default CustomFileUploadField;
