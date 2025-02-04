import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Styled TextField to customize the appearance
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#FCFCFC',
    borderRadius: "7px",
    '& fieldset': {
      borderColor: 'lightgray',
    },
    '&:hover fieldset': {
      borderColor: 'lightgray',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'lightgray',
    },
    '& input': {
      padding: '12px 14px',
    },
  },
  '& .MuiInputLabel-root': {
    transform: 'translate(14px, 16px) scale(1)',
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(14px, -6px) scale(0.75)',
  },
}));

const CustomDatePicker = ({ value, onChange, label, error, helperText, ...props }) => {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      {...props}
      slots={{
        textField: (params) => (
          <StyledTextField
            {...params}
            fullWidth
            label={label}
            error={!!error}
            helperText={error?.message}
            InputProps={{
              ...params.InputProps,
              // endAdornment: (
              //       <InputAdornment position="end">
              // <CalendarIcon/>
              //   </InputAdornment>
              // ),
            }}
          />
        ),
      }}
    />
  );
};

export default CustomDatePicker;


// // usage Example
// {/* <CustomDatePicker
// value={field.value}
// onChange={field.onChange}
// label="License Issue Date"
// error={error}
// /> */}
