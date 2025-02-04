import ViewEmployeeHeader from '@/components/shared-components/ViewEmployeeHeader';
import { Box } from '@mui/material';
import React, { useRef, useState } from 'react'
import ViewDetailCard from '../employees/driving-license-request/view-detail/ViewDetailCard';


const DetailsModal = ({ onClose }) => {
    const PopUpRef = useRef(null);
    const [activeComponent, setActiveComponent] = useState("card");

    const closePopUp = (e) => {
        if (PopUpRef.current === e.target) {
            onClose();
        }
    };
    return (
        <Box
            ref={PopUpRef}
            onClick={closePopUp}
            sx={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: "rgba(17,17,17,0.80)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                padding: "1rem",
            }}
        >
            <Box sx={{ backgroundColor: "#FFF", borderRadius: "15px" }}>
                <Box>
                    <ViewEmployeeHeader
                        fullName="Saleem Akhtar Muhammad Miskeen"
                        description="saleemakhtar1234@gmail.com"
                        profileImage={"/company/picc.png"}
                        onBackClick={() => { }}
                        onEditClick={() => { }}
                        isClose={true}
                        handleCloseClick={onClose}
                        sx={{
                            borderRadius: "15px",
                            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                        }}
                    />
                </Box>
                <Box>

                    <Box sx={{ width: "1188px" }}>
                        <ViewDetailCard />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default DetailsModal
