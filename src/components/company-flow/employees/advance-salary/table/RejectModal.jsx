"use client";

import { useRef, useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
import CustomButton from "@/components/shared-components/CustomButton";
import { useRouter } from "next/navigation";

const RejectModal = ({ onClose }) => {
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  const PopUpRef = useRef(null);

  const closePopUp = (e) => {
    if (PopUpRef.current === e.target) {
      onClose();
    }
  };
  //   const router = useRouter();

  const handleSave = () => {
    const formData = {
      status,
      remarks,
    };
    console.log("Form data submitted: ", formData);
    // router.push("/employees/advance-salary");
  };


  return (
    <Box
      ref={PopUpRef}
      onClick={closePopUp}
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(17,17,17,0.80)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "white",
          padding: 4,
          borderRadius: "10px",
          minWidth: "865px",
        }}
      >
        <Typography
          sx={{
            color: "#104774",
            fontWeight: "500",
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          Rejected Remarks
        </Typography>

        <Box sx={{ borderTop: "1px solid rgba(47,43,61,0.25)" }} />

        <TextField
          name="remarks"
          id="remarks"
          placeholder="Type your remarks here ..."
          multiline
          rows={5}
          variant="outlined"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          sx={{
            backgroundColor: "#FCFCFC",
            borderRadius: "6px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(47,43,61,0.25)",
              },
            },
          }}
        />

        <Box sx={{ borderTop: "2px solid rgba(47,43,61,0.25)" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CustomButton
            variant="outlined"
            bgColor="danger"
            startIcon={<HighlightOffIcon />}
            onClick={onClose} // Assuming you want this to close the modal
          >
            Cancel
          </CustomButton>

          <CustomButton
            variant="contained"
            endIcon={<DoneIcon />}
            onClick={handleSave}
          >
            Confirm
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default RejectModal;
