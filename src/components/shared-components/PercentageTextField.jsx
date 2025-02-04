import React from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment, Typography, FormControl, FormHelperText, Box } from "@mui/material";
import { Percent, PercentCircle, PercentDiamond, PercentSquare } from "lucide-react";

const PercentageTextField = ({
    label,
    placeholder = "",
    value,
    onChange,
    error,
    helperText,
    fullWidth = true,
    textProps,
    height = 38,
    sx,
    type = "text",
    required = false,
    ...props
}) => {
    return (
        <FormControl sx={{ ...sx, }} fullWidth={fullWidth} error={!!error}>
            {label && (
                <Typography component="label" {...textProps}>
                    {label}
                    {required && <span style={{ color: "red" }}> *</span>}
                </Typography>
            )}
            <TextField
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                size="small"
                variant="outlined"
                sx={{ "& .MuiInputBase-root": { pr: 0, height: height, borderRadius: 2, } }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Box component="div" sx={{ bgcolor: "#e0e0e0", py: 0.5, px: 1, mx: 0.3, border: "1px solid gray", borderTopRightRadius: 6, borderBottomRightRadius: 6 }}>
                                <Percent />
                            </Box>
                        </InputAdornment>
                    ),
                }}
                {...props}
            />
            {
                helperText && (
                    <FormHelperText sx={{ marginTop: "4px" }}>{helperText}</FormHelperText>
                )
            }
        </FormControl >
    );
};

PercentageTextField.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    helperText: PropTypes.string,
    fullWidth: PropTypes.bool,
    sx: PropTypes.object,
    type: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    textProps: PropTypes.object,
};

export default PercentageTextField;
