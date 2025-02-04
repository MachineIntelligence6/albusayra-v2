"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  FormGroup,
  FormControlLabel,
  Link,
} from "@mui/material";
import Image from "next/image";
import IOSSwitch from "../ui/switch-button";
import FormattedDate from "@/utils/reusable-functions/FormattedDate ";
import { UserData } from "@/configs/UseApi";
import {
  deleteCampaignById,
  getCampaignById,
  getCampaignByStatus,
  getEditDetails,
  updateCampaignStatusOnly,
} from "@/redux/reducers/campaign/campaignThunk";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { updateSuccess } from "@/redux/reducers/campaign/campaignSlice";
import { generateRandomGradient } from "@/utils/reusable-functions/generateRandomGradient";
import { useRouter } from "next/navigation";
import ActionMenu from "./ActionMenu";
import toast from "react-hot-toast";

const CampaignCard = ({ open, cardData }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { getCampaignDataById, deleteSuccess, statusChangeSuccess } =
    useSelector((state) => state.campaignSlice);

  const handleSwitchChange = (checked, rowID) => {
    const params = {
      id: rowID,
      updatedBy: UserData?.Id,
      status: checked ? 1 : 2,
    };
    dispatch(updateCampaignStatusOnly(params));
  };

  const onDelete = (rowId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: false,
      closeOnEsc: false,
    }).then((willDelete) => {
      if (willDelete) {
        const params = {
          id: rowId,
          deletedBy: UserData?.Id,
          status: 3,
        };

        dispatch(deleteCampaignById(params));
        swal("Deleted!", "Your campaign has been deleted.", "success");
      } else {
        swal("Your campaign is safe!");
      }
    });
  };

  const onEdit = (rowData) => {
    dispatch(getEditDetails(rowData));
    open();
  };

  const onView = (rowData) => {
    if (rowData.formCount > 0) {
      router.push(`/admin/campaigns/campaign-users?id=${rowData?.id}`);
    } else {
      swal({
        title: "View Campaign.",
        text: "There is no user registered against this.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        closeOnClickOutside: true,
        closeOnEsc: true,
      });
    }
  };

  useEffect(() => {
    if (deleteSuccess) {
      const params = { page: 1, pageLength: 1000 };
      dispatch(getCampaignByStatus(params));
      dispatch(updateSuccess());
    }
  }, [dispatch, deleteSuccess]);

  useEffect(() => {
    if (statusChangeSuccess) {
      const params = { page: 1, pageLength: 1000 };
      dispatch(getCampaignByStatus(params));
      dispatch(updateSuccess());
    }
  }, [dispatch, statusChangeSuccess]);

  const actionMenu = [
    { label: "Edit", action: "edit" },
    { label: "View", action: "view" },
    { label: "Delete", action: "delete" },
  ];

  const handleMenuItem = (rowData, clickedItem) => {
    if (clickedItem.action === "view") onView(rowData);
    if (clickedItem.action === "edit") onEdit(rowData);
    if (clickedItem.action === "delete") onDelete(rowData?.id);
  };

  const registerUserByCampaign = (rowId) => {
    dispatch(getCampaignById(rowId));
  };

  useEffect(() => {
    if (getCampaignDataById && Object.keys(getCampaignDataById).length > 0) {
      const { startDateTime, endDateTime, id, status } = getCampaignDataById;
      const todaysDate = new Date();

      if (new Date(startDateTime) > todaysDate) {
        toast.error("Campaign has not started yet.");
      } else if (new Date(endDateTime) < todaysDate) {
        toast.error("Campaign has already ended.");
      } else if (status === 2) {
        toast.error("Campaign is Inactive.");
      } else if (status === 3) {
        toast.error("Campaign is Deleted.");
      } else {
        router.push(`/registration?id=${id}`);
        dispatch(updateSuccess());
      }
    }
  }, [getCampaignDataById, router]);

  return (
    <>
      {cardData.map((item, index) => (
        <Card
          key={index}
          component="div"
          sx={{
            background: generateRandomGradient(),
            // borderRadius: "20px",
            // py: "20px",
            // px: "10px",
            // color: "#FFF",
            // width: "100%",
            // maxWidth: "calc(25% - 16px)",
            // flex: "1 1 calc(25% - 16px)",

            maxWidth: 480,
            borderRadius: "20px",
            py: "20px",
            px: "10px",
            color: "#FFF",
            width: "100%",
            flex: "1 1 calc(33.33% - 16px)",
            cursor: "pointer",
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              border: 2,
              borderRadius: "100px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: "8px",
              px: "10px",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <img src="/icons/telicon.svg" alt="telicon" />
              <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                Total Applied
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "25px", fontWeight: 600 }}>
              {item?.formCount}
            </Typography>
          </Box>

          {/* Card Content */}
          <CardContent>
            <Box sx={{ borderTop: 2, borderStyle: "dotted" }}></Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
                mb: 2,
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                {item?.campaignName}
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>
                Created on: <FormattedDate isoDate={item?.createdDate} />
              </Typography>
            </Box>
            <Typography>{item?.description}</Typography>

            {/* Date Information */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "8px",
                mb: "10px",
                textDecoration: "underline",
              }}
            >
              <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
                From:{" "}
                <FormattedDate isoDate={item?.startDateTime} showTime={true} />
              </Typography>
              <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
                To:{" "}
                <FormattedDate isoDate={item?.endDateTime} showTime={true} />
              </Typography>
            </Box>

            {/* Link Section */}
            <Box sx={{ display: "flex", alignItems: "center", height: "37px" }}>
              <Box
                sx={{
                  backgroundColor: "#104774",
                  py: "7px",
                  px: "9px",
                  borderRadius: "34px 0px 0px 34px",
                  color: "#FFF",
                  fontSize: "15px",
                }}
              >
                Link
              </Box>
              <Link
                onClick={() => {
                  registerUserByCampaign(item.id);
                }}
                sx={{
                  color: "#104774",
                  backgroundColor: "#FFF",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "15px",
                  px: "6px",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                {`campaigns/registration-form`}
              </Link>
              <Box
                sx={{
                  backgroundColor: "#104774",
                  py: "10px",
                  px: "9px",
                  borderRadius: "0px 35px 35px 0px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/registration?id=${item.id}`
                  );
                  toast.success("Link copied to clipboard!");
                }}
              >
                <Image
                  src="/icons/copy.svg"
                  alt="copy"
                  width={18}
                  height={24}
                />
              </Box>
            </Box>

            <Box sx={{ borderTop: 2, borderStyle: "dotted", mt: 1 }}></Box>
          </CardContent>

          {/* Card Actions */}
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography>
                {item?.status === 1 ? "Active" : "Inactive"}
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={item?.status === 1}
                      onChange={(e) =>
                        handleSwitchChange(e.target.checked, item?.id)
                      }
                    />
                  }
                />
              </FormGroup>
            </Box>

            {/* <Box
              sx={{
                fontWeight: "normal",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {switchStates[index] ? "Active" : "Inactive"}
              <FormGroup>
                <FormControlLabel
                  control={
                    // <Switch
                    // />
                    <IOSSwitch
                      sx={{ m: 2 }}
                      checked={switchStates[index]}
                      onChange={(e) =>
                        handleSwitchChange(index, e.target.checked, item?.id)
                      }
                      // disabled
                      // checked
                      // onChange={() => handleStatusChange(index)}
                    />
                  }
                />
              </FormGroup>
            </Box> */}

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <ActionMenu
                menuItems={actionMenu}
                onMenuItemClick={(clickedItem) =>
                  handleMenuItem(item, clickedItem)
                }
                color="#ffff"
              />
            </Box>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default CampaignCard;
