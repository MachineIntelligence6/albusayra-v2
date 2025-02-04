import ViewEmployeeHeader from "@/components/shared-components/ViewEmployeeHeader";
import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import VendorDetailCard from "./VendorDetailCard";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { EditIcon } from "@/utils/Icons";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { VendorGetById } from "@/redux/reducers/vendor/vendorThunk";

const VendorDetailModal = ({
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
      dispatch(VendorGetById(param));
    }
  }, [dispatch, platformId]);
  const vendorModalData = useSelector((state) => state?.vendorSlice?.getById);
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
    //vendor modal
    setIsOpenModal(true);
    router.push(`/admin/corporate?id=${platformId}`);
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
            fullName={vendorModalData?.vendorName}
            description="Vendor"
            buttons={buttons}
            handleCloseClick={onClose}
            isClose={true}
            isCamera={false}
            onBackClick={handleBackClick}
            onEditClick={handleEditClick}
            profileImage={vendorModalData?.image}
            sx={{
              borderRadius: "15px",
              // border: "2px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Box>
        <Box>
          <Box sx={{ width: "1188px" }}>
            <VendorDetailCard modalData={vendorModalData} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VendorDetailModal;
