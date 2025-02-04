import React from "react";
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
  const fileInputRef = React.useRef(null); // Create a reference to the file input

  const handleFileSelect = () => {
    fileInputRef.current.click(); // Programmatically click the file input
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
          pointerEvents: "none", // Disable interaction with IconButton
          width: "100px",
          height: "100px",
          margin: "10px 0 0 0",
        }}
        aria-label="upload picture"
        variant="outlined"
      >
        {uploadedImage ? (
          <Image
            src={URL.createObjectURL(uploadedImage)}
            alt="Uploaded preview"
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
        onChange={(e) => {
          const file = e.target.files[0];
          onFileChange(file); // Callback to pass the selected file to the parent
        }}
      />
      <CustomButton
        variant="contained"
        endIcon={<WhiteUploadIcon sx={{ width: "15px" }} />}
        sx={{ mt: 2 }}
        type="button"
        onClick={handleFileSelect} // Trigger file selection dialog
      >
        {buttonText}
      </CustomButton>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  );
};

export default ImageUpload;
