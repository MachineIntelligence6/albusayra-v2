"use client";
import React, { useEffect, useState } from "react";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import CampaignCreateModal from "@/components/shared-components/CampaignCreateModal";
import CustomButton from "@/components/shared-components/CustomButton";
import CampaignCard from "@/components/shared-components/CampaignCard";
import { eventData } from "@/utils/campaigns.data";
import { Box, Divider } from "@mui/material";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import EmptyScreen from "@/components/shared-components/EmptyScreen";
import { getCampaignByStatus } from "@/redux/reducers/campaign/campaignThunk";
import Loader from "@/utils/reusable-functions/Loader";
import { updateSuccess } from "@/redux/reducers/campaign/campaignSlice";

const CampaignPage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { loading, getCampaignsByStatuses, submitSuccess } = useSelector(
    (state) => state.campaignSlice
  );

  useEffect(() => {
    const params = { page: 1, pageLength: 1000 };
    dispatch(getCampaignByStatus(params));
    dispatch(updateSuccess());
  }, [dispatch]);

  console.log("submitSuccess", submitSuccess);

  useEffect(() => {
    if (submitSuccess) {
      const params = { page: 1, pageLength: 1000 };
      dispatch(getCampaignByStatus(params));
      dispatch(updateSuccess());
    }
  }, [dispatch, submitSuccess]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const hasCampaigns =
    Array.isArray(getCampaignsByStatuses?.data) &&
    getCampaignsByStatuses?.data?.length > 0;

  return (
    <>
      <Box
        sx={{
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DynamicBreadcrumb />
        <CustomButton onClick={handleOpenModal} endIcon={<Plus size={18} />}>
          Add Campaign
        </CustomButton>
      </Box>
      <Divider sx={{ mt: 2 }} />

      {/* Show loader if data is being fetched */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <Loader size="large" overlay />
        </Box>
      ) : (
        <Box component="div">
          {/* Show campaigns if available */}
          {hasCampaigns ? (
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "start",
                gap: 4.5,
                alignItems: "center",
                flexWrap: "wrap",
                my: 2,
              }}
            >
              <CampaignCard
                open={handleOpenModal}
                cardData={getCampaignsByStatuses.data}
              />
            </Box>
          ) : (
            // Show EmptyScreen if no campaigns found
            <EmptyScreen
              viewObject={{
                image: "/empty-svg/campaign.svg",
                altText: "campaign",
                description:
                  "Please click the button below to add your new campaign.",
                buttonText: "Add Campaign",
                onButtonClick: () => setShowModal(true),
              }}
            />
          )}
        </Box>
      )}

      {/* <Box component="div">
        {Array.isArray(getCampaignsByStatuses?.data) &&
        getCampaignsByStatuses?.data?.length > 0 ? (
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "start",
              gap: 4.5,
              alignItems: "center",
              flexWrap: "wrap",
              my: 2,
            }}
          >
            <CampaignCard
              open={handleOpenModal}
              cardData={getCampaignsByStatuses.data}
            />
          </Box>
        ) : (
          <EmptyScreen
            viewObject={{
              image: "/empty-svg/campaign.svg",
              altText: "campaign",
              description:
                "Please click the button below to add your new campaign.",
              buttonText: "Add Campaign",
              onButtonClick: () => setShowModal(true),
            }}
          />
        )}
      </Box> */}

      {showModal && (
        <CampaignCreateModal open={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default CampaignPage;
