"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import { Box, Divider, Typography } from "@mui/material";
import { FileDown, Upload } from "lucide-react";
import AddInventorForm from "./forms";
import { inventoryFormTab } from "@/utils/hard-data/inventoryFormTab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addInventoryFormSchema } from "@/utils/schemas/inventory-schema/addInventoryForm.schema";
import * as Yup from "yup";
import { UserData } from "@/configs/UseApi";
import { useDispatch, useSelector } from "react-redux";
import {
  InventoryCreateBikeInfo,
  InventoryCreateInventoryContract,
  InventoryCreateInventoryFoodPermit,
  InventoryCreateInventoryInsurance,
  InventoryCreateInventoryMulkiya,
  InventoryDownloadBikeInfoTemplate,
  InventoryGetById,
  InventoryUpdateBikeInfo,
  InventoryUpdateOtherDetails,
  InventoryUploadBulkBikeInfo,
} from "@/redux/reducers/inventory/inventoryThunk";
import { GenericGetProductCategoryDropdown } from "@/redux/reducers/dataBank/dataBankThunk";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import toast from "react-hot-toast";
import { UploadOutlined } from "@mui/icons-material";

const defaultStates = {
  bikeInfo: {
    vendorName: "",
    acquiredDate: "",
    regCountry: "",
    regState: "",
    regCity: "",
    regDate: "",
    plateNo: "",
    healthCheck: "",
    type: "",
    chassesNumber: "",
    manufactureer: "",
    modal: "",
    number: "",
    cost: "",
    picture: "",
  },
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
  otherDetails: {
    branding: "",
    brandPlatform: "",
    box: "",
    brandCost: "",
    vat: "",
  },
};

const AddInventory = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState({
    value: "",
    label: "",
  });
  const [productType, setProductType] = useState("");
  const [formtabs, setFormTabs] = useState(inventoryFormTab);
  const [selectedTab, setSelectedTab] = useState(inventoryFormTab[0]);
  const [formData, setFormData] = useState(defaultStates); // State to store data for all steps
  const [vendorId, setVendorId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const { productCategoryData: productData } = useSelector(
    (state) => state.dataBankSlice
  );
  const searchParams = useSearchParams();
  // tab param
  const tabParam = searchParams.get("tab");
  useEffect(() => {
    if (tabParam) {
      const activeTab = inventoryFormTab.find((tab) => tab.id === tabParam);
      if (activeTab) {
        handleActiveFormTab(activeTab);
      }
    }
  }, [tabParam]);
  const editMode = searchParams.get("id");
  useEffect(() => {
    if (editMode) {
      const param = { id: editMode };
      dispatch(InventoryGetById(param));
    }
  }, [editMode, dispatch]);
  const editData = useSelector((state) => state?.inventorySlice?.getById);
  // console.log("editDataInventory", editData);
  useEffect(() => {
    dispatch(GenericGetProductCategoryDropdown({ statuses: 1 }));
  }, [dispatch]);
  useEffect(() => {
    if (productData?.length > 0) {
      const formattedOptions = productData.map((platform) => ({
        value: platform.id,
        label: platform.name,
        code: platform.code,
      }));
      setProductType(formattedOptions);
      // Preselect the specific product
      const preselectedProduct = formattedOptions.find(
        (option) => option.code === "001"
      );
      if (preselectedProduct) {
        setSelectedProduct(preselectedProduct);
      }
    }
    if (editData?.productCategory) {
      setSelectedProduct({
        value: editData.productCategory.id,
        label: editData.productCategory.name,
      });
    }
  }, [productData, editData]);

  const formSchema = Yup.object({
    bikeInfo: Yup.object({
      vendorName: Yup.string().required("Vendor name is required"),
      acquiredDate: Yup.string().required("Acquired date is required"),
      regCountry: Yup.string().required("Registration country is required"),
      regState: Yup.string().required("Registration State is required"),
      regCity: Yup.string().required("Registration city is required"),
      regDate: Yup.string().required("Registration date is required"),
      plateNo: Yup.string().required("Plate number is required"),
      healthCheck: Yup.string().required("Health check status is required"),
      type: Yup.string().required("Type is required"),
      chassesNumber: Yup.string().required("Chassis number is required"),
      manufactureer: Yup.string().required("Manufacturer is required"),
      modal: Yup.string().required("Model is required"),
      number: Yup.string().required("Number is required"),
      cost: Yup.number()
        .required("Cost is required")
        .typeError("Cost must be a number"),
      picture: Yup.string().required("Picture is required"),
    }),
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
    otherDetails: Yup.object({
      branding: Yup.string().required("Branding is required"),
      brandPlatform: Yup.string().required("Branding platform is required"),
      box: Yup.string().required("Box information is required"),
      brandCost: Yup.number()
        .required("Brand cost is required")
        .typeError("Brand cost must be a number"),
      vat: Yup.number()
        .required("VAT is required")
        .typeError("VAT must be a number"),
    }),
  });

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: formData,
    mode: "onChange",
  });

  useEffect(() => {
    if (editData && editMode) {
      const mappedData = {
        bikeInfo: {
          vendorName: editData.vendorId || "",
          acquiredDate: editData.bikePurchasedDate
            ? moment(editData.bikePurchasedDate).format("YYYY-MM-DD")
            : "",
          regCountry: editData.countryId || "",
          regState: editData.stateId || "",
          regCity: editData.cityId || "",
          regDate: editData.registrationStartDate
            ? moment(editData.registrationStartDate).format("YYYY-MM-DD")
            : "",
          plateNo: editData.bikePlateNo || "",
          healthCheck: editData.isHealthCheck ? "true" : "false",
          type: editData.bikeType || "",
          chassesNumber: editData.chasisNo || "",
          manufactureer: editData.manufacturer || "",
          modal: editData.model || "",
          number: editData.batchNo || "",
          cost: editData.cost || 0,
          picture: editData.bikeImage || "",
        },
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
          vendor: editData.vendorId || "",
          contact: "",
        },
        bikeFoodPermit: {
          picture: "",
          expiryDate: "",
          cost: 0,
        },
        otherDetails: {
          branding: editData.isBranding ? "true" : "false",
          brandPlatform: editData.platformId || "",
          box: editData.isBox ? "true" : "false",
          brandCost: editData.brandCost || 0,
          vat: editData.vat || 0,
        },
      };

      setFormData(mappedData);

      // Set values in react-hook-form
      Object.keys(mappedData).forEach((sectionKey) => {
        Object.keys(mappedData[sectionKey]).forEach((fieldKey) => {
          const fieldValue = mappedData[sectionKey][fieldKey];
          methods.setValue(`${sectionKey}.${fieldKey}`, fieldValue);
        });
      });
    }
  }, [editData, editMode, methods]);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const getFormSection = (tabText) => {
    const sectionMap = {
      "Bike Info": "bikeInfo",
      "Bike Mulikya": "bikeMulikya",
      "Bike Insurance": "bikeInsurance",
      "Bike Contract": "bikeContact",
      "Bike Food Permit": "bikeFoodPermit",
      "Other Details": "otherDetails",
    };
    return sectionMap[tabText] || "";
  };
  const validateCurrentTab = async () => {
    const currentSection = getFormSection(selectedTab.text);
    const isValid = await methods.trigger(currentSection);

    if (isValid) {
      const updatedSectionData = methods.getValues(currentSection);
      setFormData((prev) => ({
        ...prev,
        [currentSection]: updatedSectionData,
      }));
    }

    return isValid;
  };
  const handleNextClick = async () => {
    const isValid = await validateCurrentTab();
    if (!isValid) return;
    const updatedFormData = methods.getValues();
    const index = formtabs.findLastIndex((item) => item.isActive);
    const nextTab = formtabs.at(index + 1);
    if (nextTab) handleActiveFormTab(nextTab);
    const bikeInfoPayload = {
      ProductCategoryId: selectedProduct.value,
      VendorId: updatedFormData.bikeInfo.vendorName,
      BikePurchasedDate: updatedFormData.bikeInfo.acquiredDate,
      CountryId: updatedFormData.bikeInfo.regCountry,
      StateId: updatedFormData.bikeInfo.regState,
      CityId: updatedFormData.bikeInfo.regCity,
      RegistrationStartDate: updatedFormData.bikeInfo.regDate,
      BikePlateNo: updatedFormData.bikeInfo.plateNo,
      IsHealthCheck: updatedFormData.bikeInfo.healthCheck,
      BikeType: updatedFormData.bikeInfo.type,
      ChasisNo: updatedFormData.bikeInfo.chassesNumber,
      Manufacturer: updatedFormData.bikeInfo.manufactureer,
      Model: updatedFormData.bikeInfo.modal,
      BatchNo: updatedFormData.bikeInfo.number,
      Cost: updatedFormData.bikeInfo.cost,
      BikeImage: updatedFormData.bikeInfo.picture,
      EntityId: UserData?.EntityId,
      CreatedBy: UserData?.Id,
      Status: 12,
    };
    const editbikeInfoPayload = {
      Id: editMode,
      ProductCategoryId: selectedProduct.value,
      VendorId: updatedFormData.bikeInfo.vendorName,
      BikePurchasedDate: updatedFormData.bikeInfo.acquiredDate,
      CountryId: updatedFormData.bikeInfo.regCountry,
      StateId: updatedFormData.bikeInfo.regState,
      CityId: updatedFormData.bikeInfo.regCity,
      RegistrationStartDate: updatedFormData.bikeInfo.regDate,
      BikePlateNo: updatedFormData.bikeInfo.plateNo,
      IsHealthCheck: updatedFormData.bikeInfo.healthCheck,
      BikeType: updatedFormData.bikeInfo.type,
      ChasisNo: updatedFormData.bikeInfo.chassesNumber,
      Manufacturer: updatedFormData.bikeInfo.manufactureer,
      Model: updatedFormData.bikeInfo.modal,
      BatchNo: updatedFormData.bikeInfo.number,
      Cost: updatedFormData.bikeInfo.cost,
      BikeImage: updatedFormData.bikeInfo.picture,
      UpdatedBy: UserData?.Id,
      Status: editData.status,
    };
    const bikeMulikyaPayload = {
      InventoryId: vendorId,
      Image: updatedFormData.bikeMulikya.picture,
      ExpiryDate: updatedFormData.bikeMulikya.expiryDate,
      CreatedBy: UserData?.Id,
      Status: 1,
    };
    const bikeInsurancePayload = {
      InventoryId: vendorId,
      isInsurance: updatedFormData.bikeInsurance.insurance,
      startDate: updatedFormData.bikeInsurance.startDate,
      endDate: updatedFormData.bikeInsurance.endDate,
      CreatedBy: UserData?.Id,
      Status: 1,
    };
    const bikeContactPayload = {
      InventoryId: vendorId,
      vendorId: updatedFormData.bikeInfo.vendorName,
      contractId: updatedFormData.bikeContact.contact,
      CreatedBy: UserData?.Id,
      Status: 1,
    };
    const bikeFoodPermitPayload = {
      InventoryId: vendorId,
      Image: updatedFormData.bikeFoodPermit.picture,
      ExpiryDate: updatedFormData.bikeFoodPermit.expiryDate,
      Cost: updatedFormData.bikeFoodPermit.cost,
      CreatedBy: UserData?.Id,
      Status: 1,
    };
    const otherDetailsPayload = {
      Id: editMode ?? vendorId,
      IsBranding: updatedFormData.otherDetails.branding,
      PlatformId: updatedFormData.otherDetails.brandPlatform,
      IsBox: updatedFormData.otherDetails.box,
      BrandCost: updatedFormData.otherDetails.brandCost,
      VAT: updatedFormData.otherDetails.vat,
      UpdatedBy: UserData?.Id,
      Status: editMode ? editData.status : 12,
    };

    if (selectedTab.id === "1") {
      if (editMode) {
        dispatch(InventoryUpdateBikeInfo(editbikeInfoPayload)).then((res) => {
          if (res.payload.code === 200) {
            // Fetch updated data after successful update
            router.back();
          }
        });
      } else {
        dispatch(InventoryCreateBikeInfo(bikeInfoPayload)).then((res) => {
          if (res.payload.code === 200) {
            // Fetch updated data after successful update
            const responceVendorId = res.payload.result.id;
            setVendorId(responceVendorId);
          }
        });
      }
    } else if (selectedTab.id === "2") {
      dispatch(InventoryCreateInventoryMulkiya(bikeMulikyaPayload)).then(
        (res) => {
          if (res.payload.code === 200) {
            // Fetch updated data after successful update
          }
        }
      );
    } else if (selectedTab.id === "3") {
      dispatch(InventoryCreateInventoryInsurance(bikeInsurancePayload)).then(
        (res) => {
          if (res.payload.code === 200) {
            // Fetch updated data after successful update
          }
        }
      );
    } else if (selectedTab.id === "4") {
      dispatch(InventoryCreateInventoryContract(bikeContactPayload)).then(
        (res) => {
          if (res.payload.code === 200) {
            // Fetch updated data after successful update
          }
        }
      );
    } else if (selectedTab.id === "5") {
      dispatch(InventoryCreateInventoryFoodPermit(bikeFoodPermitPayload)).then(
        (res) => {
          if (res.payload.code === 200) {
            // Fetch updated data after successful update
          }
        }
      );
    } else if (selectedTab.id === "6") {
      dispatch(InventoryUpdateOtherDetails(otherDetailsPayload)).then((res) => {
        if (res.payload.code === 200) {
          // Fetch updated data after successful update
          router.back();
        }
      });
    }
  };

  const handleBackClick = () => {
    const index = formtabs.findLastIndex((item) => item.isActive);
    const prevTab = formtabs.at(index - 1);
    if (prevTab) handleActiveFormTab(prevTab);
  };

  const handleActiveFormTab = (activeTab) => {
    if (typeof activeTab === "object") {
      setSelectedTab(activeTab);
      setFormTabs((prev) => {
        return prev.map((item) => ({
          ...item,
          isActive: item.id === activeTab.id,
        }));
      });
    }
  };
  const onSubmit = (data) => {
    // console.log("Submitted Data:", data);
  };
  const handleDownload = () => {
    dispatch(InventoryDownloadBikeInfoTemplate()).then((action) => {
      if (action.payload) {
        // Ensure Blob is handled correctly
        const blob = new Blob([action.payload], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel MIME type
        });

        // Create a temporary link element for downloading
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Bike_info_List.xlsx_${Date.now()}.xlsx`; // Set file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Failed to export data:", action.error);
      }
    });
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    } else {
      const payload = {
        formFile: selectedFile,
        ProductCategoryId: selectedProduct.value,
        EntityId: UserData?.EntityId,
        CreatedBy: UserData?.Id,
        Status: 12,
      };
      dispatch(InventoryUploadBulkBikeInfo(payload)).then((res) => {
        if (res.payload.code === 200) {
          toast.success("File uploaded successfully.");
          // Reset the selected file after successful upload
          setSelectedFile(null);
          document.getElementById("picture-upload-input").value = ""; // Reset input field
        } else {
          toast.error("File upload failed.");
        }
      });
    }
  };
  return (
    <Box>
      <Box
        sx={{
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DynamicBreadcrumb />
      </Box>
      <Divider sx={{ mt: 2 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography
          variant="h6"
          component="h6"
          sx={{ fontSize: 18, fontWeight: 500 }}
        >
          Add Detail
        </Typography>

        <Box
          component="div"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <CustomButton
            variant="outlined"
            startIcon={<FileDown size={20} />}
            onClick={handleDownload}
          >
            Download Template
          </CustomButton>
          <CustomButton
            startIcon={<UploadOutlined size={20} />}
            onClick={handleUpload}
          >
            Upload in Bulk
          </CustomButton>
          <Box>
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              style={{ display: "none" }}
              id="picture-upload-input"
              onChange={handleFileChange}
            />
            <CustomButton
              startIcon={<Upload size={20} />}
              onClick={() =>
                document.getElementById("picture-upload-input").click()
              }
            >
              {/* Upload Picture */}
              Select File
            </CustomButton>
          </Box>
        </Box>
      </Box>
      {productType?.length > 0 && (
        <Box component="div" sx={{ width: "100%" }}>
          <CustomDropdown
            disabled={true}
            label="Select Product"
            placeholder="Select Product"
            options={productType}
            value={selectedProduct?.value}
            onChange={handleProductChange}
            textProps={{ variant: "body2" }}
            sx={{ height: 36 }}
          />
        </Box>
      )}
      <Box>
        <AddInventorForm
          formtabs={formtabs}
          selectedTab={selectedTab}
          onClickTab={handleActiveFormTab}
          formMethods={methods}
          formData={formData} // Pass formData down
          setFormData={setFormData} // Pass setFormData down
          onSubmit={onSubmit}
          handleNextClick={handleNextClick}
          handleBackClick={handleBackClick}
          editData={editData}
          editMode={editMode}
        />
      </Box>
    </Box>
  );
};

export default AddInventory;
