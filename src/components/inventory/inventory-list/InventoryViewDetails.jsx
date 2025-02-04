import BasicInfo from "@/components/employees/view-employee/BasicInfo";
import MasonryGrid from "@/components/shared-components/masonry-grid";
import InventoryViewDetailModal from "@/components/shared-components/modals/InventoryViewDetailModal";
// import { inventoryViewDetails } from "@/utils/hard-data/inventory-data";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import TwoWheelerOutlinedIcon from "@mui/icons-material/TwoWheelerOutlined";
import {
  InventoryCreateInventoryContract,
  InventoryCreateInventoryFoodPermit,
  InventoryCreateInventoryInsurance,
  InventoryCreateInventoryMulkiya,
  InventoryGetById,
  InventoryGetByIdContract,
  InventoryGetByIdFoodPermit,
  InventoryGetByIdInsurance,
  InventoryGetByIdMulkiya,
  InventoryGetByIdSim,
  InventoryUpdateInventoryContract,
  InventoryUpdateInventoryFoodPermit,
  InventoryUpdateInventoryInsurance,
  InventoryUpdateInventoryMulkiya,
} from "@/redux/reducers/inventory/inventoryThunk";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserData } from "@/configs/UseApi";

const defaultStates = {
  bikeMulikya: {
    picture: "",
    expiryDate: "",
  },
  bikeInsurance: {
    insurance: "",
    startDate: "",
    endDate: "",
  },
  bikeContact: {
    vendor: "",
    contact: "",
  },
  bikeFoodPermit: {
    picture: "",
    expiryDate: "",
    cost: "",
  },
};
const InventoryViewDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const editMode = searchParams.get("id");
  const [viewDetails, setViewDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popUpData, setPopUpData] = useState("");
  const [formData, setFormData] = useState(defaultStates); // State to store
  const [selectedPlatformId, setSelectedPlatformId] = useState(null);
  const [pageType, setPageType] = useState("");
  useEffect(() => {
    if (pathname.includes("/sim")) {
      setPageType("sim");
    } else if (pathname.includes("/bike")) {
      setPageType("bike");
    }
  }, [pathname]);
  useEffect(() => {
    const param = { id: editMode };
    if (editMode && pageType === "bike") {
      dispatch(InventoryGetById(param));
    } else if (editMode && pageType === "sim") {
      dispatch(InventoryGetByIdSim(param));
    }
  }, [editMode, pageType, dispatch]);
  const editData = useSelector((state) => state?.inventorySlice?.getById);
  const editDataSim = useSelector((state) => state?.inventorySlice?.getByIdSim);
  useEffect(() => {
    if (selectedPlatformId) {
      const param = { id: selectedPlatformId };
      if (popUpData?.id === "002") {
        dispatch(InventoryGetByIdMulkiya(param));
      } else if (popUpData?.id === "003") {
        dispatch(InventoryGetByIdFoodPermit(param));
      } else if (popUpData?.id === "004") {
        dispatch(InventoryGetByIdInsurance(param));
      } else if (popUpData?.id === "005") {
        dispatch(InventoryGetByIdContract(param));
      }
    }
  }, [selectedPlatformId, dispatch]);

  useEffect(() => {
    if (editData && pageType === "bike") {
      const transformedDetails = [
        {
          id: "001",
          title: "BASIC INFORMATION",
          data: [
            {
              id: "1",
              icon: <Person3OutlinedIcon />,
              label: "Vendor Name",
              value: editData?.vendor?.vendorName || "N/A",
            },
            {
              id: "2",
              icon: <FemaleOutlinedIcon />,
              label: "Bike Purchased/Aqcuired Date",
              value: editData?.bikePurchasedDate
                ? moment(editData?.bikePurchasedDate).format("DD/MM/YYYY")
                : "N/A",
            },
            {
              id: "3",
              icon: <FemaleOutlinedIcon />,
              label: "Bike Registration Country",
              value: editData?.country?.countryName || "N/A",
            },
            {
              id: "4",
              icon: <FemaleOutlinedIcon />,
              label: "Bike Registration City",
              value: editData?.city?.cityName || "N/A",
            },
            {
              id: "5",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Bike Registration Date",
              value: editData?.registrationStartDate
                ? moment(editData?.registrationStartDate).format("DD/MM/YYYY")
                : "N/A",
            },
            {
              id: "6",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Bike Number Plate",
              value: editData?.bikePlateNo || "N/A",
            },
            {
              id: "7",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Bike Health Check",
              value: editData?.isHealthCheck ? "Yes" : "No" | "N/A",
            },
            {
              id: "8",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Bike Type",
              value: editData?.bikeType || "N/A",
            },
            {
              id: "9",
              icon: <AllInclusiveOutlinedIcon />,
              label: "Chasis Number",
              value: editData?.chasisNo || "N/A",
            },
            {
              id: "10",
              icon: <HomeOutlinedIcon />,
              label: "Bike Manufacturer",
              value: editData?.manufacturer || "N/A",
            },
            {
              id: "11",
              icon: <MyLocationOutlinedIcon />,
              label: "Bike Model",
              value: editData?.model || "N/A",
            },
            {
              id: "12",
              icon: <TwoWheelerOutlinedIcon />,
              label: "Batch Number",
              value: editData?.batchNo || "N/A",
            },
            {
              id: "13",
              icon: <TwoWheelerOutlinedIcon />,
              label: "Bike Cost",
              value: editData?.cost || "N/A",
            },
            {
              id: "14",
              icon: <TwoWheelerOutlinedIcon />,
              label: "Bike Picture",
              value: editData?.bikeImage?.split("/").pop() || "N/A",
            },
          ],
        },
        {
          id: "002",
          title: "Bike Mulkiya",
          data: [
            {
              id: "1",
              icon: <Person3OutlinedIcon />,
              label: "Bike Mulkiya Picture",
              value:
                editData?.inventoryMulkiya?.[0]?.image?.split("/").pop() ||
                "N/A",
            },
            {
              id: "2",
              icon: <FemaleOutlinedIcon />,
              label: "Bike Mulkiya Expiry Date",
              value: editData?.inventoryMulkiya?.[0]?.expiryDate
                ? moment(editData?.inventoryMulkiya?.[0]?.expiryDate).format(
                    "DD/MM/YYYY"
                  )
                : "N/A",
            },
          ],
        },
        {
          id: "003",
          title: "Bike Food Permit",
          data: [
            {
              id: "1",
              icon: <Person3OutlinedIcon />,
              label: "Bike Food Permit Picture",
              value:
                editData?.inventoryFoodPermit?.[0]?.image?.split("/").pop() ||
                "N/A",
            },
            {
              id: "2",
              icon: <FemaleOutlinedIcon />,
              label: "Bike Food Permit Expiry Date",
              value: editData?.inventoryFoodPermit?.[0]?.expiryDate
                ? moment(editData?.inventoryFoodPermit?.[0]?.expiryDate).format(
                    "DD/MM/YYYY"
                  )
                : "N/A",
            },
            {
              id: "3",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Bike Food Permit Cost",
              value: editData?.inventoryFoodPermit?.[0]?.cost || "N/A",
            },
          ],
        },
        {
          id: "004",
          title: "Bike Insurance",
          data: [
            {
              id: "1",
              icon: <Person3OutlinedIcon />,
              label: "Bike Insurance",
              value: editData?.inventoryInsurance?.[0]?.isInsurance
                ? "Yes"
                : "No" || "N/A",
            },
            {
              id: "2",
              icon: <FemaleOutlinedIcon />,
              label: "Bike Insurance Start Date",
              value: editData?.inventoryInsurance?.[0]?.startDate
                ? moment(editData?.inventoryInsurance?.[0]?.startDate).format(
                    "DD/MM/YYYY"
                  )
                : "N/A",
            },
            {
              id: "3",
              icon: <FemaleOutlinedIcon />,
              label: "Bike Insurance End Date",
              value: editData?.inventoryInsurance?.[0]?.endDate
                ? moment(editData?.inventoryInsurance?.[0]?.endDate).format(
                    "DD/MM/YYYY"
                  )
                : "N/A",
            },
          ],
        },
        {
          id: "005",
          title: "Bike Contract",
          data: [
            {
              id: "1",
              icon: <FemaleOutlinedIcon />,
              label: "Bike Purchased/Aqcuired Date",
              value: editData?.inventoryContract?.[0]?.contract?.createdDate
                ? moment(
                    editData?.inventoryContract?.[0]?.contract?.createdDate
                  ).format("DD/MM/YYYY")
                : "N/A",
            },
            {
              id: "2",
              icon: <FemaleOutlinedIcon />,
              label: "Contract",
              value:
                editData?.inventoryContract?.[0]?.contract?.contractName ||
                "N/A",
            },
            {
              id: "3",
              icon: <FemaleOutlinedIcon />,
              label: "Vendor",
              value:
                editData?.inventoryContract?.[0]?.vendor?.vendorName || "N/A",
            },
          ],
        },
        {
          id: "006",
          title: "Other Details",
          data: [
            {
              id: "1",
              icon: <Person3OutlinedIcon />,
              label: "Branding",
              value: editData?.isBranding ? "Yes" : "No" || "N/A",
            },
            {
              id: "2",
              icon: <Person3OutlinedIcon />,
              label: "Brand Platform",
              value: editData?.platform?.platformName || "N/A",
            },
            {
              id: "3",
              icon: <FemaleOutlinedIcon />,
              label: "Box",
              value: editData?.isBox ? "Yes" : "No" || "N/A",
            },
            {
              id: "4",
              icon: <CalendarMonthOutlinedIcon />,
              label: "Brand Cost",
              value: editData?.brandCost || "N/A",
            },
            {
              id: "5",
              icon: <CalendarMonthOutlinedIcon />,
              label: "VAT",
              value: editData?.vat ? `${editData.vat}%` : "N/A",
            },
          ],
        },
      ];
      setViewDetails(transformedDetails);
    } else if (editDataSim && pageType === "sim") {
      const transformedDetails = [
        {
          id: "001",
          title: "BASIC INFORMATION",
          data: [
            {
              id: "1",
              icon: <Person3OutlinedIcon />,
              label: "Sim Number",
              value: editDataSim?.simNo || "N/A",
            },
            {
              id: "2",
              icon: <Person3OutlinedIcon />,
              label: "SIM Vendor Name",
              value: editDataSim?.vendor?.vendorName || "N/A",
            },
            {
              id: "3",
              icon: <Person3OutlinedIcon />,
              label: "Ownership",
              value: editDataSim?.simOwnership || "N/A",
            },
            {
              id: "4",
              icon: <Person3OutlinedIcon />,
              label: "SIM Contract",
              value: editDataSim?.simContract?.contractName || "N/A",
            },
            {
              id: "5",
              icon: <Person3OutlinedIcon />,
              label: "VAT%",
              value: editDataSim?.vat ? `${editDataSim?.vat}%` : "N/A",
            },
          ],
        },
      ];
      setViewDetails(transformedDetails);
    }
  }, [editData, pageType, editDataSim]);
  // const handleEditDetails = (details) => {
  //   if (pageType === "sim" && details.id === "001") {
  //     router.push(`/admin/inventory/add-inventory?id=${editMode}`);
  //   } else if (pageType === "bike") {
  //     if (details.id === "001") {
  //       router.push(`/admin/inventory/inventory-list/add-inventory?id=${editMode}&tab=1`);
  //     } else if (details.id === "006") {
  //       router.push(`/admin/inventory/inventory-list/add-inventory?id=${editMode}&tab=6`);
  //     } else if (["002", "003", "004", "005"].includes(details.id)) {
  //       setIsModalOpen(true);
  //       setPopUpData(details);
  //     }
  //   }
  // };

  const handleEditDetails = (details) => {
    if (pageType === "sim" && details.id === "001") {
      router.push(`/admin/inventory/add-inventory?id=${editMode}`);
    }
    if (pageType === "bike" && details.id === "001") {
      router.push(
        `/admin/inventory/inventory-list/add-inventory?id=${editMode}&tab=1`
      );
    }
    if (pageType === "bike" && details.id === "002") {
      setIsModalOpen(true);
      setPopUpData(details);
    }
    if (pageType === "bike" && details.id === "003") {
      setIsModalOpen(true);
      setPopUpData(details);
    }
    if (pageType === "bike" && details.id === "004") {
      setIsModalOpen(true);
      setPopUpData(details);
    }
    if (pageType === "bike" && details.id === "005") {
      setIsModalOpen(true);
      setPopUpData(details);
    }
    if (pageType === "bike" && details.id === "006") {
      router.push(
        `/admin/inventory/inventory-list/add-inventory?id=${editMode}&tab=6`
      );
    }
  };

  const formSchema = Yup.object({
    bikeMulikya: Yup.object({
      picture: Yup.string().required("Picture is required"),
      expiryDate: Yup.string().required("Expiry date is required"),
    }),
    bikeInsurance: Yup.object({
      insurance: Yup.string().required("Insurance information is required"),
      startDate: Yup.string().required("Start date is required"),
      endDate: Yup.string().required("End date is required"),
    }),
    bikeContact: Yup.object({
      vendor: Yup.string().required("Vendor name is required"),
      contact: Yup.string().required("Contact information is required"),
    }),
    bikeFoodPermit: Yup.object({
      picture: Yup.string().required("Picture is required"),
      expiryDate: Yup.string().required("Expiry date is required"),
      cost: Yup.number()
        .required("Cost is required")
        .typeError("Cost must be a number"),
    }),
  });
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: defaultStates,
    mode: "onChange",
  });

  const {
    getByIdMulkiya: mulkiaEditValues,
    getByIdFoodPermit: foodPermitEditValues,
    getByIdInsurance: insuranceEditValues,
    getByIdContract: contractEditValues,
  } = useSelector((state) => state.inventorySlice);
  useEffect(() => {
    if (mulkiaEditValues) {
      methods.setValue("bikeMulikya.picture", mulkiaEditValues.image);
      methods.setValue(
        "bikeMulikya.expiryDate",
        mulkiaEditValues.expiryDate
          ? moment(mulkiaEditValues.expiryDate).format("YYYY-MM-DD")
          : ""
      );
    }
  }, [mulkiaEditValues, methods]);
  useEffect(() => {
    if (foodPermitEditValues) {
      methods.setValue("bikeFoodPermit.picture", foodPermitEditValues.image);
      methods.setValue(
        "bikeFoodPermit.expiryDate",
        foodPermitEditValues.expiryDate
          ? moment(foodPermitEditValues.expiryDate).format("YYYY-MM-DD")
          : ""
      );
      methods.setValue("bikeFoodPermit.cost", foodPermitEditValues.cost);
    }
  }, [foodPermitEditValues, methods]);
  useEffect(() => {
    if (insuranceEditValues) {
      methods.setValue(
        "bikeInsurance.insurance",
        insuranceEditValues.isInsurance ? "true" : "false"
      );
      methods.setValue(
        "bikeInsurance.startDate",
        insuranceEditValues.startDate
          ? moment(insuranceEditValues.startDate).format("YYYY-MM-DD")
          : ""
      );
      methods.setValue(
        "bikeInsurance.endDate",
        insuranceEditValues.endDate
          ? moment(insuranceEditValues.endDate).format("YYYY-MM-DD")
          : ""
      );
    }
  }, [insuranceEditValues, methods]);
  useEffect(() => {
    if (contractEditValues) {
      methods.setValue("bikeContact.vendor", contractEditValues.vendorId || "");
      methods.setValue(
        "bikeContact.insurance",
        contractEditValues.contractId || ""
      );
    }
  }, [contractEditValues, methods]);
  const formSectionKeys = {
    "002": "bikeMulikya",
    "003": "bikeFoodPermit",
    "004": "bikeInsurance",
    "005": "bikeContact",
  };

  const validateCurrentForm = async () => {
    const formSectionKey = formSectionKeys[popUpData.id];
    if (formSectionKey) {
      return await methods.trigger(formSectionKey);
    }
    return false;
  };
  const handleUpdate = async () => {
    const isValid = await validateCurrentForm(); // Validate the current form dynamically

    if (!isValid) {
      console.warn("Form validation failed for section:", popUpData.id);
      return;
    }

    const formSectionKey = formSectionKeys[popUpData.id];
    const updatedSectionData = methods.getValues(formSectionKey);

    // Update the formData state synchronously
    const updatedFormData = {
      ...formData,
      [formSectionKey]: updatedSectionData,
    };

    setFormData(updatedFormData);

    const bikeMulikyaPayload = {
      InventoryId: editMode,
      Image: updatedFormData.bikeMulikya.picture,
      ExpiryDate: updatedFormData.bikeMulikya.expiryDate,
      CreatedBy: UserData?.Id,
      Status: 1,
    };
    const editbikeMulikyaPayload = {
      Id: selectedPlatformId,
      InventoryId: editMode,
      Image: updatedFormData.bikeMulikya.picture,
      ExpiryDate: updatedFormData.bikeMulikya.expiryDate,
      UpdatedBy: UserData?.Id,
      Status: 1,
    };
    const bikeInsurancePayload = {
      InventoryId: editMode,
      isInsurance: updatedFormData.bikeInsurance.insurance,
      startDate: updatedFormData.bikeInsurance.startDate,
      endDate: updatedFormData.bikeInsurance.endDate,
      CreatedBy: UserData?.Id,
      Status: 1,
    };
    const editbikeInsurancePayload = {
      Id: selectedPlatformId,
      InventoryId: editMode,
      isInsurance: updatedFormData.bikeInsurance.insurance,
      startDate: updatedFormData.bikeInsurance.startDate,
      endDate: updatedFormData.bikeInsurance.endDate,
      UpdatedBy: UserData?.Id,
      Status: 1,
    };
    const bikeContactPayload = {
      InventoryId: editMode,
      vendorId: updatedFormData.bikeContact.vendor,
      contractId: updatedFormData.bikeContact.contact,
      CreatedBy: UserData?.Id,
      Status: 1,
    };
    const editbikeContactPayload = {
      Id: selectedPlatformId,
      InventoryId: editMode,
      vendorId: updatedFormData.bikeContact.vendor,
      contractId: updatedFormData.bikeContact.contact,
      UpdatedBy: UserData?.Id,
      Status: 1,
    };
    const bikeFoodPermitPayload = {
      InventoryId: editMode,
      Image: updatedFormData.bikeFoodPermit.picture,
      ExpiryDate: updatedFormData.bikeFoodPermit.expiryDate,
      Cost: updatedFormData.bikeFoodPermit.cost,
      CreatedBy: UserData?.Id,
      Status: 1,
    };
    const editbikeFoodPermitPayload = {
      Id: selectedPlatformId,
      InventoryId: editMode,
      Image: updatedFormData.bikeFoodPermit.picture,
      ExpiryDate: updatedFormData.bikeFoodPermit.expiryDate,
      Cost: updatedFormData.bikeFoodPermit.cost,
      UpdatedBy: UserData?.Id,
      Status: 1,
    };
    const param = {
      id: editMode,
    };
    if (popUpData.id === "002") {
      if (selectedPlatformId) {
        dispatch(InventoryUpdateInventoryMulkiya(editbikeMulikyaPayload)).then(
          (res) => {
            if (res.payload.code === 200) {
              // Fetch updated data after successful update
              dispatch(InventoryGetById(param));
              setTimeout(() => {
                methods.reset(defaultStates[formSectionKeys[popUpData.id]]);
                setSelectedPlatformId(null);
                setIsModalOpen(false);
              }, 2000);
            }
          }
        );
      } else {
        dispatch(InventoryCreateInventoryMulkiya(bikeMulikyaPayload)).then(
          (res) => {
            if (res.payload.code === 200) {
              // Fetch updated data after successful update
              dispatch(InventoryGetById(param));
              setTimeout(() => {
                methods.reset(defaultStates[formSectionKeys[popUpData.id]]);
                setSelectedPlatformId(null);
                setIsModalOpen(false);
              }, 2000);
            }
          }
        );
      }
    } else if (popUpData.id === "003") {
      if (selectedPlatformId) {
        dispatch(
          InventoryUpdateInventoryFoodPermit(editbikeFoodPermitPayload)
        ).then((res) => {
          if (res.payload.code === 200) {
            // Fetch updated data after successful update
            dispatch(InventoryGetById(param));
            setTimeout(() => {
              methods.reset(defaultStates[formSectionKeys[popUpData.id]]);
              setSelectedPlatformId(null);
              setIsModalOpen(false);
            }, 2000);
          }
        });
      } else {
        dispatch(
          InventoryCreateInventoryFoodPermit(bikeFoodPermitPayload)
        ).then((res) => {
          if (res.payload.code === 200) {
            // Fetch updated data after successful update
            dispatch(InventoryGetById(param));
            setTimeout(() => {
              methods.reset(defaultStates[formSectionKeys[popUpData.id]]);
              setSelectedPlatformId(null);
              setIsModalOpen(false);
            }, 2000);
          }
        });
      }
    } else if (popUpData.id === "004") {
      if (selectedPlatformId) {
        dispatch(
          InventoryUpdateInventoryInsurance(editbikeInsurancePayload)
        ).then((res) => {
          if (res.payload.code === 200) {
            // Fetch updated data after successful update
            dispatch(InventoryGetById(param));
            setTimeout(() => {
              methods.reset(defaultStates[formSectionKeys[popUpData.id]]);
              setSelectedPlatformId(null);
              setIsModalOpen(false);
            }, 2000);
          }
        });
      } else {
        dispatch(InventoryCreateInventoryInsurance(bikeInsurancePayload)).then(
          (res) => {
            if (res.payload.code === 200) {
              // Fetch updated data after successful update
              dispatch(InventoryGetById(param));
              setTimeout(() => {
                methods.reset(defaultStates[formSectionKeys[popUpData.id]]);
                setSelectedPlatformId(null);
                setIsModalOpen(false);
              }, 2000);
            }
          }
        );
      }
    } else if (popUpData.id === "005") {
      if (selectedPlatformId) {
        dispatch(InventoryUpdateInventoryContract(editbikeContactPayload)).then(
          (res) => {
            if (res.payload.code === 200) {
              // Fetch updated data after successful update
              dispatch(InventoryGetById(param));
              setTimeout(() => {
                methods.reset(defaultStates[formSectionKeys[popUpData.id]]);
                setSelectedPlatformId(null);
                setIsModalOpen(false);
              }, 2000);
            }
          }
        );
      }
      dispatch(InventoryCreateInventoryContract(bikeContactPayload)).then(
        (res) => {
          if (res.payload.code === 200) {
            // Fetch updated data after successful update
            dispatch(InventoryGetById(param));
            setTimeout(() => {
              methods.reset(defaultStates[formSectionKeys[popUpData.id]]);
              setSelectedPlatformId(null);
              setIsModalOpen(false);
            }, 2000);
          }
        }
      );
    }
  };

  const onSubmit = async (data) => {};

  return (
    <>
      <MasonryGrid>
        {viewDetails?.map((details) => {
          return (
            <Box key={details.id} sx={{ width: "100%", m: 2 }}>
              <BasicInfo
                profile={details}
                onEdit={() => handleEditDetails(details)}
              />
            </Box>
          );
        })}
      </MasonryGrid>

      {isModalOpen && (
        <InventoryViewDetailModal
          urlId={editMode}
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            methods.reset(defaultStates[formSectionKeys[popUpData.id]]);
            setSelectedPlatformId(null);
          }}
          title={popUpData.title}
          popUpHandling={popUpData.id}
          form={methods}
          onSubmit={onSubmit}
          handleUpdate={handleUpdate}
          tableData={editData}
          setSelectedPlatformId={setSelectedPlatformId}
          stateCheck={{
            mulkiaEditValues,
            foodPermitEditValues,
            insuranceEditValues,
            contractEditValues,
          }}
        />
      )}
    </>
  );
};

export default InventoryViewDetails;
