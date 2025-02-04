"use client";
import React from "react";
import { useTheme } from "@emotion/react";
import {
    Box,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { CircleX, X } from "lucide-react";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import { useRouter } from "next/navigation";

const SuccessModal = ({ open, onClose, title, }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
    const router = useRouter();

    const addMoreEmployees = () => {
        onClose()
    }
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            aria-labelledby="responsive-dialog-title"
            closeAfterTransition
        >
            <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <Box
                    component="button"
                    sx={{ width: "fit-content", p: 1 }}
                    onClick={() => router.push("/employees?table=true")}
                >
                    <X size={18} />
                </Box>
            </Box>
            <DialogContent sx={{ width: 600, mb: 5 }}>
                <EmptyScreenView
                    image="/company/employee-add-success.png"
                    title="Employee Added Successfully"
                    descriptionTag={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Typography variant="body1" sx={{ color: "#20A4D5" }}>
                                ID:AB00001
                            </Typography>{" "}
                            <Typography>added successfully.</Typography>
                        </Box>
                    }
                    buttonText="Add More"
                    onButtonClick={addMoreEmployees}
                />
            </DialogContent>
        </Dialog>
    );
};

export default SuccessModal;
