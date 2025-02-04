"use client";
import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import InputLabelTop from "./InputLabel";
import { Eye, EyeOff } from "lucide-react";

function CustomInput({
  labelText,
  type = "text",
  error = false,
  helperText = "",
  register,
  name,
  ...props // Spread the rest of the props including ref and name from react-hook-form
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col py-2">
      <InputLabelTop text={labelText} required />
      <TextField
        size="small"
        type={type === "password" && !showPassword ? "password" : "text"}
        error={error}
        helperText={helperText}
        {...register(name)}
        {...props}
        InputProps={
          type === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </div>
  );
}

export default CustomInput;
