import ViewEmployeeHeader from "@/components/shared-components/ViewEmployeeHeader";
import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import PlatformDetailCard from "./PlatformDetailCard";
import { EditIcon } from "@/utils/Icons";
import { PlatformGetById } from "@/redux/reducers/platform/platformThunk";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const PlatformDetailModal = ({
  onClose,
  platformId,
  setIsOpenModal,
  setShowPopup,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const PopUpRef = useRef(null);
  useEffect(() => {
    const param = {
      id: platformId,
    };
    if (platformId) {
      dispatch(PlatformGetById(param));
    }
  }, [dispatch, platformId]);
  const platformModalData = useSelector(
    (state) => state?.platformSlice?.getById
  );

  const closePopUp = (e) => {
    if (PopUpRef.current === e.target) {
      onClose();
    }
  };

  const handleBackClick = () => {
    //view details modal
    setShowPopup(false);
  };

  const handleEditClick = () => {
    //view details modal
    setShowPopup(false);
    //platform modal
    setIsOpenModal(true);
    router.push(`/admin/corporate/platforms?id=${platformId}`);
  };

  const buttons = [
    {
      label: "Back",
      onClick: handleBackClick,
      startIcon: <KeyboardBackspaceIcon />,
    },
    {
      label: "Edit",
      onClick: handleEditClick,
      endIcon: <EditIcon />,
    },
  ];

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
        zIndex: 50,
        padding: "1rem",
      }}
    >
      <Box sx={{ backgroundColor: "#FFF", borderRadius: "15px" }}>
        <Box sx={{}}>
          <ViewEmployeeHeader
            fullName={platformModalData?.platformName}
            description="platform"
            buttons={buttons}
            isClose={true}
            isCamera={false}
            handleCloseClick={onClose}
            onBackClick={handleBackClick}
            onEditClick={handleEditClick}
            profileImage={platformModalData?.image}
            sx={{
              borderRadius: "14px",
              // border: "2px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Box>
        <Box>
          <Box sx={{ width: "1188px" }}>
            <PlatformDetailCard modalData={platformModalData} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlatformDetailModal;
