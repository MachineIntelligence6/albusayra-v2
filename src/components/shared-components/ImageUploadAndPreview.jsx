import React, { useState, useEffect } from "react";
import { Box, FormHelperText, IconButton } from "@mui/material";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { CameraIcon, WhiteUploadIcon, CloseIcon } from "@/utils/Icons";
import { X } from "lucide-react";

const ImageUploadAndPreview = ({
  onFileChange,
  error,
  uploadedImage,
  buttonText = "Upload Picture",
  maxSizeInMB = 5,
  allowedTypes = ["image/jpeg", "image/png", "image/jpg"],
  aspectRatio,
  width = "22%",
}) => {
  const fileInputRef = React.useRef(null);
  const [previewError, setPreviewError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  // console.log("uploadedImage", uploadedImage);

  // useEffect(() => {
  //   if (uploadedImage) {
  //     const newPreviewUrl = URL.createObjectURL(uploadedImage);
  //     setPreviewUrl(newPreviewUrl);
  //     return () => {
  //       if (newPreviewUrl) {
  //         URL.revokeObjectURL(newPreviewUrl);
  //       }
  //     };
  //   } else {
  //     setPreviewUrl(null);
  //   }
  // }, [uploadedImage]);

  // Generate preview URL when `uploadedImage` changes
  useEffect(() => {
    if (uploadedImage && uploadedImage instanceof File) {
      const newPreviewUrl = URL.createObjectURL(uploadedImage);
      setPreviewUrl(newPreviewUrl);

      // Cleanup the URL when component unmounts or dependency changes
      return () => {
        URL.revokeObjectURL(newPreviewUrl);
      };
    } else if (typeof uploadedImage === "string") {
      // If `uploadedImage` is a string (e.g., preloaded URL), use it directly
      setPreviewUrl(uploadedImage);
    } else {
      setPreviewUrl(null);
    }
  }, [uploadedImage]);

  const validateFile = (file) => {
    setPreviewError("");

    if (!file) return false;

    if (!allowedTypes.includes(file.type)) {
      setPreviewError(
        `Allowed file types: ${allowedTypes
          .map((type) => type.split("/")[1])
          .join(", ")}`
      );
      return false;
    }

    if (file.size > maxSizeInMB * 1024 * 1024) {
      setPreviewError(`File size must be less than ${maxSizeInMB}MB`);
      return false;
    }

    return true;
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      onFileChange(file);
    } else if (!previewError) {
      onFileChange(null);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    onFileChange(null);
    setPreviewError("");
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box
      mb={3}
      textAlign="center"
      display="flex"
      flexDirection="column"
      width={width}
    >
      <Box position="relative" width="100px">
        <Box
          component={previewUrl ? "figure" : "button"}
          sx={{
            background: "#E9EAEC",
            border: "1px solid #C9C8CC",
            borderRadius: "10px",
            position: "relative",
            pointerEvents: "none",
            width: "150px",
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          aria-label="upload picture"
          variant="outlined"
        >
          {previewUrl ? (
            <Box
              position="relative"
              width="100%"
              height="100%"
              borderRadius="10px"
              overflow="hidden"
            >
              <Image
                src={previewUrl}
                alt="Uploaded preview"
                fill
                style={{
                  objectFit: aspectRatio ? "contain" : "cover",
                }}
              />
            </Box>
          ) : (
            <CameraIcon />
          )}
        </Box>
        {previewUrl && (
          <IconButton
            onClick={handleRemoveImage}
            sx={{
              position: "absolute",
              top: 2,
              right: "-47px",
              backgroundColor: "#fff",
              border: "1px solid #C9C8CC",
              padding: "2px",
              "&:hover": { backgroundColor: "#f5f5f5" },
              zIndex: 1,
            }}
            size="small"
          >
            <X size={16} />
          </IconButton>
        )}
      </Box>

      <input
        ref={fileInputRef}
        hidden
        accept={allowedTypes.join(",")}
        type="file"
        onChange={handleFileChange}
      />

      {(error || previewError) && (
        <FormHelperText
          error
          sx={{
            textAlign: "left",
            margin: "8px 0",
          }}
        >
          {error || previewError}
        </FormHelperText>
      )}
      <CustomButton
        variant="contained"
        endIcon={<WhiteUploadIcon sx={{ width: "15px" }} />}
        sx={{ mt: 2 }}
        type="button"
        onClick={handleFileSelect}
      >
        {buttonText}
      </CustomButton>
    </Box>
  );
};

export default ImageUploadAndPreview;
