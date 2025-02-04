import React from "react";
import PropTypes from "prop-types";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";

const UploadInputField = ({
  file,
  onUpload,
  onRemove,
  placeholder = "Upload file",
  error,
  helperText,
  fullWidth = true,
  sx,
  disabled = false,
  url,
  isEditMode,
  ...rest
}) => {
  const handleUrlClick = () => {
    if (url && typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const fileName = file?.name || (isEditMode && url?.split("/").pop()) || "";

  return (
    <TextField
      disabled={disabled}
      // value={file?.name || (isEditMode && url) || ""}
      value={fileName}
      placeholder={placeholder}
      error={!!error}
      helperText={error ? error.message || helperText : helperText}
      fullWidth={fullWidth}
      variant="outlined"
      InputProps={{
        startAdornment: file ? (
          <InputAdornment position="start">
            <InsertDriveFileIcon sx={{ color: "#F44336" }} />
          </InputAdornment>
        ) : null,
        endAdornment: file ? (
          <InputAdornment position="end">
            <IconButton
              onClick={onRemove}
              sx={{
                padding: 0,
                color: "#333",
              }}
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ) : (
          <InputAdornment position="end">
            <Button
              variant="contained"
              color="primary"
              component="label"
              sx={{
                textTransform: "none",
                // borderRadius: "7px",
                backgroundColor: "#2F2B3D99",
                color: "#f6f6f6",
                // mr: 0.2,

                "&:hover": {
                  backgroundColor: "#3c3b3f99",
                },
              }}
            >
              Upload
              <input
                type="file"
                hidden
                onChange={(e) => onUpload(e.target.files[0])}
              />
            </Button>
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiInputBase-input": {
          padding: "8px 10px",
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: "7px",
        },
        "& .MuiInputBase-root": {
          paddingRight: 0,
        },
        ...sx,
      }}
      {...rest}
    />
  );
};

UploadInputField.propTypes = {
  file: PropTypes.object, // File object to display
  onUpload: PropTypes.func.isRequired, // Function called on file upload
  onRemove: PropTypes.func.isRequired, // Function to remove the file
  url: PropTypes.string, // URL to display and preview
  isEditMode: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  sx: PropTypes.object,
};

export default UploadInputField;
