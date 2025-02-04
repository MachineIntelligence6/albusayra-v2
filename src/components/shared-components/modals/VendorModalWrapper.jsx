import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Divider, Modal, Typography, useMediaQuery } from "@mui/material";
import CustomButton from "../CustomButton";
import DoneIcon from "@mui/icons-material/Done";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useTheme } from "@emotion/react";
import DescriptiveText from "../DescriptiveText";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const VendorModal = ({
  open,
  onClose,
  title,
  children,
  hideActions = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "90%" : "80%",
    maxWidth: 800,
    maxHeight: "90vh",
    boxShadow: 24,
    borderRadius: 2,
    overflow: "auto",
    px: 5,
    pb: 2,
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle, bgcolor: "white" }}>
        <Box sx={{ borderBottom: "1px solid #2F2B3D40", my: 2, py: 1 }}>
          <DescriptiveText text={title} fontSize={18} />
        </Box>
        {children}
        {!hideActions && (
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mt: 2,
              pt: 2,
              borderTop: "1px solid #2F2B3D40",
            }}
          >
            <CustomButton
              onClick={onClose}
              variant="outlined"
              bgColor="danger"
              startIcon={<HighlightOffIcon />}
            >
              Cancel
            </CustomButton>
            <CustomButton onClick={onClose} endIcon={<DoneIcon />}>
              Save
            </CustomButton>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default VendorModal;
