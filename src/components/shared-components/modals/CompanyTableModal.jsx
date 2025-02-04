import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { X } from "lucide-react";
import React from "react";
import { custom } from "@/app/theme";
import DescriptiveText from "../DescriptiveText";

const CompanyTableModal = (props) => {
  const { open, onClose, title = "Select Employee", children } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      aria-labelledby="responsive-dialog-title"
      maxWidth={""}
      closeAfterTransition
    >
      <DialogTitle
        id="responsive-dialog-title"
        sx={{
          display: "flex",
          justifyContent: title ? "space-between" : "flex-end",
          alignItems: "center",
        }}
      >
        <DescriptiveText
          text={title}
          fontWeight={500}
          color={custom.primaryText}
        />
        <Box
          onClick={onClose}
          component="button"
          sx={{
            borderRadius: "100%",
            "& :hover": {
              bgcolor: "#dfdfdf",
              color: "#104774",
              p: 0.2,
              borderRadius: 4,
            },
          }}
        >
          <X size={18} />
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Box
          component="div"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          // minWidth={1200}
          // minHeight={500}
        >
          {children}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyTableModal;
