import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton, FormHelperText } from "@mui/material";
import Image from "next/image";
import CustomButton from "../shared-components/CustomButton";
import { CameraIcon, WhiteUploadIcon } from "@/utils/Icons";

const ImageUpload = ({
  onFileChange,
  error,
  uploadedImage,
  buttonText = "Upload Picture",
}) => {
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef(null); // Reference to the file input

  useEffect(() => {
    if (uploadedImage) {
      if (typeof uploadedImage === "string") {
        setPreviewImage(uploadedImage);
      } else if (uploadedImage instanceof File) {
        const objectUrl = URL.createObjectURL(uploadedImage);
        setPreviewImage(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }
    } else {
      setPreviewImage(""); // Reset preview when no uploadedImage
    }
  }, [uploadedImage]);

  const handleFileSelect = () => {
    fileInputRef.current.click(); // Open file input dialog
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileChange(file); // Pass selected file to parent component
    }
  };
  return (
    <Box
      mb={3}
      textAlign="center"
      display="flex"
      flexDirection="column"
      width="22%"
    >
      <IconButton
        sx={{
          background: "#E9EAEC",
          border: "1px solid #C9C8CC",
          borderRadius: "10px",
          position: "relative",
          width: "100px",
          height: "100px",
          margin: "10px 0 0 0",
        }}
        aria-label="upload picture"
        onClick={handleFileSelect} // Open file dialog when clicked
      >
        {previewImage ? (
          <Image
            src={previewImage}
            alt="Logo"
            width={100}
            height={100}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        ) : (
          <CameraIcon />
        )}
      </IconButton>
      <input
        ref={fileInputRef}
        hidden
        accept="image/*"
        type="file"
        onChange={handleFileChange} // Handle file change
      />
      <CustomButton
        variant="contained"
        endIcon={<WhiteUploadIcon sx={{ width: "15px" }} />}
        sx={{ mt: 2 }}
        type="button"
        onClick={handleFileSelect}
      >
        {buttonText}
      </CustomButton>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  );
};

export default ImageUpload;
