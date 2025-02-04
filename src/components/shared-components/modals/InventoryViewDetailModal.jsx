import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomFileUploadField from "../CustomFIleUploadField";
import CustomDateField from "../CustomDateField";
import CustomTextField from "../CustomTextField";
import CustomButton from "../CustomButton";
import { Check, CircleX, Download, Image, RefreshCcwIcon } from "lucide-react";
import CustomTable from "../Table-components/CustomTable";
import { FoodPermitTable } from "@/utils/hard-data/inventory-data";
import { uuid } from "@/utils/cmmon";
import { Close } from "@mui/icons-material";
import BikeMulkiyaFormPopUp from "@/components/inventory/inventory-list/add-inventory/popUpForms/BikeMulkiyaForm";
import BikeFoodPermitFormPopUp from "@/components/inventory/inventory-list/add-inventory/popUpForms/BikeFoodPermitForm";
import BikeInsuranceFormPopUp from "@/components/inventory/inventory-list/add-inventory/popUpForms/BikeInsuranceForm";
import BikeContractPopUp from "@/components/inventory/inventory-list/add-inventory/popUpForms/BikeContract";
import {
  GenericGetVendorContractDropdownVendorWise,
  GenericGetVendorDropdown,
} from "@/redux/reducers/dataBank/dataBankThunk";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-hot-toast";
import ActionMenu from "@/components/shared-components/ActionMenu";
import {
  InventoryDeleteContract,
  InventoryDeleteFoodPermit,
  InventoryDeleteInsurance,
  InventoryDeleteMulkiya,
  InventoryGetById,
} from "@/redux/reducers/inventory/inventoryThunk";
import swal from "sweetalert";
import { UserData } from "@/configs/UseApi";

const InventoryViewDetailModal = (props) => {
  const {
    title,
    onClose,
    open,
    form,
    onSubmit,
    popUpHandling,
    handleUpdate,
    tableData,
    setSelectedPlatformId,
    stateCheck,
    urlId,
  } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "90%" : "80%",
    maxWidth: "fit-content",
    maxHeight: "90vh",
    boxShadow: 24,
    borderRadius: 2,
    overflow: "auto",
    px: 5,
    pb: 2,
  };
  const MenuItems = useMemo(
    () => [
      { label: "Edit Details", action: "edit" },
      { label: "Delete Details", action: "delete" },
    ],
    []
  );
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: false,
      closeOnEsc: false,
    }).then((result) => {
      // debugger
      if (result) {
        const payload = {
          id: id,
          deletedBy: UserData?.Id,
          status: 3,
        };
        const param = {
          id: urlId,
        };
        if (popUpHandling === "002") {
          dispatch(InventoryDeleteMulkiya(payload)).then((res) => {
            if (res.payload.code === 200) {
              // Fetch updated data after successful update
              dispatch(InventoryGetById(param));
            }
          });
        } else if (popUpHandling === "003") {
          dispatch(InventoryDeleteFoodPermit(payload)).then((res) => {
            if (res.payload.code === 200) {
              // Fetch updated data after successful update
              dispatch(InventoryGetById(param));
            }
          });
        } else if (popUpHandling === "004") {
          dispatch(InventoryDeleteInsurance(payload)).then((res) => {
            if (res.payload.code === 200) {
              // Fetch updated data after successful update
              dispatch(InventoryGetById(param));
            }
          });
        } else if (popUpHandling === "005") {
          dispatch(InventoryDeleteContract(payload)).then((res) => {
            if (res.payload.code === 200) {
              // Fetch updated data after successful update
              dispatch(InventoryGetById(param));
            }
          });
        }
      }
    });
  };
  const handleMenuClick = (value, row) => {
    if (value.action === "edit") {
      setSelectedPlatformId(row.id);
    } else if (value.action === "delete") {
      handleDelete(row.id);
    } else {
      // setShowPopup(false);
    }
  };
  const mulikiyaColumns = useMemo(() => {
    return [
      {
        field: "image",
        headerName: "Bike Picture",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Image size={22} color="#EB5757" alt="pic" />
            <Typography>{row.image?.split("/").pop() || "-"}</Typography>
            <Download
              size={22}
              onClick={() => {
                if (row.image) {
                  window.open(row.image, "_blank");
                } else {
                  toast.error("No image available.");
                }
              }}
            />
          </Box>
        ),
      },
      {
        field: "expiryDate",
        headerName: "Bike Mulikya Expired Date",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>
              {row.expiryDate
                ? moment(row.expiryDate).format("DD/MM/YYYY")
                : "-"}
            </Typography>
          </Box>
        ),
      },

      {
        field: "status",
        headerName: "STATUS",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              backgroundColor: row.status === 1 ? "#D9F0FF" : "#FFE5E5",
              color:
                row.status === 1
                  ? "#007FFF"
                  : row.status === "expired"
                  ? "#FF0000"
                  : "#FF0000",
              padding: "4px 8px",
              borderRadius: "4px",
              textTransform: "capitalize",
              width: "fit-content",
              px: 4,
              textTransform: "capitalize",
            }}
          >
            {row.status === 1 ? "Active" : "Expired"}
          </Box>
        ),
      },
      {
        field: "action",
        headerName: "Action",
        align: "left",
        render: (row) => {
          // Filter menu items based on the status
          const filteredMenuItems =
            row.status === 1
              ? MenuItems
              : MenuItems.filter((item) => item.action !== "edit");

          return (
            <ActionMenu
              menuItems={filteredMenuItems}
              onMenuItemClick={(value) => handleMenuClick(value, row)}
            />
          );
        },
      },
    ];
  }, [MenuItems]);
  const foodPermitColumns = useMemo(() => {
    return [
      {
        field: "image",
        headerName: "Bike Food Perrmit",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Image size={22} color="#EB5757" alt="pic" />
            <Typography>{row.image?.split("/").pop() || "-"}</Typography>
            <Download
              size={22}
              onClick={() => {
                if (row.image) {
                  window.open(row.image, "_blank");
                } else {
                  toast.error("No image available.");
                }
              }}
            />
          </Box>
        ),
      },
      {
        field: "expiryDate",
        headerName: "Bike Food Permit Expiry Date",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>
              {row.expiryDate
                ? moment(row.expiryDate).format("DD/MM/YYYY")
                : "-"}
            </Typography>
          </Box>
        ),
      },
      {
        field: "cost",
        headerName: "Bike Food Permit Cost",
        align: "left",
      },
      {
        field: "status",
        headerName: "STATUS",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              backgroundColor: row.status === 1 ? "#D9F0FF" : "#FFE5E5",
              color:
                row.status === 1
                  ? "#007FFF"
                  : row.status === "expired"
                  ? "#FF0000"
                  : "#FF0000",
              padding: "4px 8px",
              borderRadius: "4px",
              textTransform: "capitalize",
              width: "fit-content",
              px: 4,
              textTransform: "capitalize",
            }}
          >
            {row.status === 1 ? "Active" : "Expired"}
          </Box>
        ),
      },
      {
        field: "action",
        headerName: "Action",
        align: "left",
        render: (row) => {
          // Filter menu items based on the status
          const filteredMenuItems =
            row.status === 1
              ? MenuItems
              : MenuItems.filter((item) => item.action !== "edit");

          return (
            <ActionMenu
              menuItems={filteredMenuItems}
              onMenuItemClick={(value) => handleMenuClick(value, row)}
            />
          );
        },
      },
    ];
  }, [MenuItems]);
  const insuranceColumns = useMemo(() => {
    return [
      {
        field: "isInsurance",
        headerName: "Bike Insurance",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>{row.isInsurance ? "Yes" : "No"}</Typography>
          </Box>
        ),
      },
      {
        field: "startDate",
        headerName: "Bike Insurance Start Date",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>
              {row.startDate ? moment(row.startDate).format("DD/MM/YYYY") : "-"}
            </Typography>
          </Box>
        ),
      },
      {
        field: "endDate",
        headerName: "Bike Insurance End Date",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>
              {row.endDate ? moment(row.endDate).format("DD/MM/YYYY") : "-"}
            </Typography>
          </Box>
        ),
      },
      {
        field: "status",
        headerName: "STATUS",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              backgroundColor: row.status === 1 ? "#D9F0FF" : "#FFE5E5",
              color:
                row.status === 1
                  ? "#007FFF"
                  : row.status === "expired"
                  ? "#FF0000"
                  : "#FF0000",
              padding: "4px 8px",
              borderRadius: "4px",
              textTransform: "capitalize",
              width: "fit-content",
              px: 4,
              textTransform: "capitalize",
            }}
          >
            {row.status === 1 ? "Active" : "Expired"}
          </Box>
        ),
      },
      {
        field: "action",
        headerName: "Action",
        align: "left",
        render: (row) => {
          // Filter menu items based on the status
          const filteredMenuItems =
            row.status === 1
              ? MenuItems
              : MenuItems.filter((item) => item.action !== "edit");

          return (
            <ActionMenu
              menuItems={filteredMenuItems}
              onMenuItemClick={(value) => handleMenuClick(value, row)}
            />
          );
        },
      },
    ];
  }, [MenuItems]);
  const contractColumns = useMemo(() => {
    return [
      {
        field: "vendor",
        headerName: "Vendor Name",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>{row?.vendor?.vendorName ?? "-"}</Typography>
          </Box>
        ),
      },
      {
        field: "contract",
        headerName: "Contract",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>{row?.contract?.contractName ?? "-"}</Typography>
          </Box>
        ),
      },
      {
        field: "status",
        headerName: "STATUS",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              backgroundColor: row.status === 1 ? "#D9F0FF" : "#FFE5E5",
              color:
                row.status === 1
                  ? "#007FFF"
                  : row.status === "expired"
                  ? "#FF0000"
                  : "#FF0000",
              padding: "4px 8px",
              borderRadius: "4px",
              textTransform: "capitalize",
              width: "fit-content",
              px: 4,
              textTransform: "capitalize",
            }}
          >
            {row.status === 1 ? "Active" : "Expired"}
          </Box>
        ),
      },
      {
        field: "action",
        headerName: "Action",
        align: "left",
        render: (row) => {
          // Filter menu items based on the status
          const filteredMenuItems =
            row.status === 1
              ? MenuItems
              : MenuItems.filter((item) => item.action !== "edit");

          return (
            <ActionMenu
              menuItems={filteredMenuItems}
              onMenuItemClick={(value) => handleMenuClick(value, row)}
            />
          );
        },
      },
    ];
  }, [MenuItems]);

  const [vendorOptions, setVendorOptions] = useState([]);
  const [contractOptions, setContractOptions] = useState([]);
  const [filteredVendorOptions, setFilteredVendorOptions] = useState([]);
  const selectedVendor = form.watch("bikeContact.vendor");
  // console.log("stateCheck?.mulkiaEditValues", stateCheck?.mulkiaEditValues);
  useEffect(() => {
    // Filter vendorOptions based on selectedVendor
    if (selectedVendor) {
      const filteredOptions = vendorOptions.filter(
        (vendor) => vendor.value === selectedVendor
      );
      setFilteredVendorOptions(filteredOptions);
    }
  }, [selectedVendor, vendorOptions]);
  useEffect(() => {
    const params = { page: 1, pageLength: 1000, statuses: 1 };
    dispatch(GenericGetVendorDropdown(params));
  }, [dispatch]);
  useEffect(() => {
    const params = { parentId: selectedVendor, statuses: 1 };
    if (selectedVendor) {
      dispatch(GenericGetVendorContractDropdownVendorWise(params));
    }
  }, [dispatch, selectedVendor]);

  const { vendorOptionsData: venderData, contractOptionsData: contractData } =
    useSelector((state) => state?.dataBankSlice);
  useEffect(() => {
    if (venderData?.length > 0) {
      const formattedOptions = venderData?.map((platform) => ({
        value: platform.id,
        label: platform.vendorName,
      }));
      setVendorOptions(formattedOptions);
    }
  }, [venderData]);
  useEffect(() => {
    if (contractData?.length > 0) {
      const formattedOptions = contractData?.map((platform) => ({
        value: platform.id,
        label: platform.contractName,
      }));
      setContractOptions(formattedOptions);
    }
  }, [contractData]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle, bgcolor: "white" }}>
        <Typography
          variant="h6"
          sx={{
            textTransform: "uppercase",
            fontWeight: 600,
            fontSize: 16,
            py: 4,
          }}
        >
          {title}
        </Typography>

        <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
          {popUpHandling === "002" ? (
            <>
              <BikeMulkiyaFormPopUp
                control={form.control}
                handleUpdate={handleUpdate}
                columns={mulikiyaColumns}
                data={tableData?.inventoryMulkiya}
                btnTxt={stateCheck?.mulkiaEditValues ? "Update" : "Add"}
              />
            </>
          ) : popUpHandling === "003" ? (
            <BikeFoodPermitFormPopUp
              control={form.control}
              handleUpdate={handleUpdate}
              columns={foodPermitColumns}
              data={tableData?.inventoryFoodPermit}
            />
          ) : popUpHandling === "004" ? (
            <BikeInsuranceFormPopUp
              control={form.control}
              handleUpdate={handleUpdate}
              columns={insuranceColumns}
              data={tableData?.inventoryInsurance}
            />
          ) : popUpHandling === "005" ? (
            <BikeContractPopUp
              control={form.control}
              options={{
                vendorOptions,
                contractOptions,
              }}
              handleUpdate={handleUpdate}
              columns={contractColumns}
              data={tableData?.inventoryContract}
            />
          ) : null}
        </Box>

        <Divider sx={{ my: 4 }} />
        <Box
          component="div"
          sx={{
            display: "flex",
            // justifyContent: "space-between",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: 2,
          }}
        >
          <CustomButton
            bgColor="danger"
            variant="outlined"
            startIcon={<CircleX size={16} />}
            onClick={onClose}
          >
            Close
          </CustomButton>
          {/* <CustomButton
            endIcon={<Check size={16} />}
            onClick={() => alert("Save changes")}
          >
            Save
          </CustomButton> */}
        </Box>
      </Box>
    </Modal>
  );
};

export default InventoryViewDetailModal;
