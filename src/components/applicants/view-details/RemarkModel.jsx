"use client";
import { useState } from "react";
import { TextField, Box, Divider } from "@mui/material";
import CustomButton from "@/components/shared-components/CustomButton";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
const RemarksModal = ({ onSave, setIsModalRemarkOpen }) => {
  const [remarks, setRemarks] = useState("");

  return (
    <Box
      sx={{
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "white",
      }}
    >
      <Box color="#104774">Remarks</Box>
      <Divider sx={{ my: 1 }} />
      <Box>
        <Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Type your remarks here ..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            sx={{
              marginY: "10px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        </Box>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "15px",
        }}
      >
        <CustomButton
          variant="outlined"
          bgColor="danger"
          onClick={() => setIsModalRemarkOpen(false)}
          startIcon={<CancelIcon />}
        >
          Cancel
        </CustomButton>
        <CustomButton
          type="submit"
          variant="contained"
          onClick={() => {
            onSave(remarks);
          }}
          endIcon={<DoneIcon sx={{ width: "15px" }} />}
        >
          Save
        </CustomButton>
      </Box>
    </Box>
  );
};

export default RemarksModal;
