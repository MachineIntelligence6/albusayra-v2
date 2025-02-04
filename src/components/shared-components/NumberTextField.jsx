import React from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment, MenuItem, Box } from "@mui/material";

const PhoneNumberTextField = ({
    value,
    onChange,
    placeholder = "",
    error,
    helperText,
    fullWidth = true,
    sx,
    countries = ["+92", "+91", "+971", "+966"], // Array of country codes
    selectedCountry = "+971", // Default selected country code
    onCountryChange, // Function to handle country change
    ...rest
}) => {
    return (
        <TextField
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            error={!!error}
            helperText={error ? error.message || helperText : helperText}
            fullWidth={fullWidth}
            type="tel"
            variant="outlined"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Box
                            component="select"
                            value={selectedCountry}
                            onChange={onCountryChange}
                            sx={{
                                minWidth: "80px",
                                ".MuiSelect-select": { padding: "0 8px" },
                            }}
                        >
                            {countries.map((code) => (
                                <Box component="option" key={code} value={code}>
                                    {code}
                                </Box>
                            ))}
                        </Box>
                    </InputAdornment>
                ),
            }}
            sx={{
                "& .MuiInputBase-input": {
                    padding: "10px 12px",
                },
                "& .MuiOutlinedInput-root": {
                    borderRadius: "7px",
                },
                ...sx,
            }}
            {...rest}
        />
    );
};

PhoneNumberTextField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    helperText: PropTypes.string,
    fullWidth: PropTypes.bool,
    sx: PropTypes.object,
    countries: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of country codes
    selectedCountry: PropTypes.string, // Selected country code
    onCountryChange: PropTypes.func.isRequired, // Function for changing country code
};

export default PhoneNumberTextField;
