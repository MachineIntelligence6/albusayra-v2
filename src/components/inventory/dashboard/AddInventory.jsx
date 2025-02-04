"use client";
import React, { useEffect, useState } from "react";
import FormTab from "@/components/inventory/inventory-list/add-inventory/forms/FormTab";
import OtherDetailsForm from "@/components/inventory/inventory-list/add-inventory/forms/OtherDetailsForm";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import { UploadOutlined } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import { Check, CircleX, FileDownIcon, Info, Upload } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addSimDetailSchema } from "@/utils/schemas/inventory-schema/dashboard.schema";
import AddSimDetailsForm from "./AddSimDetailsForm";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  GenericGetProductCategoryDropdown,
  GenericGetVendorContractDropdownVendorWise,
  GenericGetVendorDropdown,
  getByHeaderAndSectionAndKey,
} from "@/redux/reducers/dataBank/dataBankThunk";
import { UserData } from "@/configs/UseApi";
import {
  InventoryCreateSimInfo,
  InventoryDownloadSimInfoTemplate,
  InventoryGetByIdSim,
  InventoryUpdateSimInfo,
  InventoryUploadBulkSimInfo,
} from "@/redux/reducers/inventory/inventoryThunk";
import toast from "react-hot-toast";

const tab = {
  id: "1",
  text: "Add SIM Details",
  isActive: true,
  getIcon: (isActive) => (
    <>
      {isActive ? (
        <Info
          color="white"
          style={{ background: "#104774", padding: 10, borderRadius: 6 }}
          size={40}
        />
      ) : (
        <Info
          color="#104774"
          style={{ background: "#1047741A", padding: 10, borderRadius: 6 }}
          size={40}
        />
      )}
    </>
  ),
};
const AddInventory = () => {
  const addSimDetailSchema = Yup.object().shape({
    // simNumber: Yup.string().required("Sim number is required"),
    simNumber: Yup.string()
      .required("Sim number is required") // Field is required
      .matches(/^\d+$/, "Sim number must contain only digits") // Allow only numeric characters
      .min(10, "Sim number must be at least 10 digits") // Minimum length
      .max(15, "Sim number cannot exceed 15 digits"),
    simVendorName: Yup.string().required("Sim vendor name is required"),
    simOwnership: Yup.string().required("Sim ownership is required"),
    simContract: Yup.string().required("Sim contract is required"),
    vat: Yup.number()
      .min(0, "VAT cannot be negative")
      .max(100, "VAT cannot exceed 100%")
      .required("VAT is required"),
  });

  const methods = useForm({
    resolver: yupResolver(addSimDetailSchema),
    defaultValues: {
      simNumber: "",
      simVendorName: "",
      simOwnership: "",
      simContract: "",
      vat: 0,
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState({
    value: "",
    label: "",
  });
  const [productType, setProductType] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(""); // Track the selected vendor
  const [vendorOptions, setVendorOptions] = useState([]);
  const [contractOptions, setContractOptions] = useState([]);
  const [simOwnershipOptions, setSimOwnershipOptions] = useState([]);
  const editMode = searchParams.get("id");
  const { productCategoryData: productData } = useSelector(
    (state) => state.dataBankSlice
  );
  const [selectedFile, setSelectedFile] = useState(null);
  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  useEffect(() => {
    if (editMode) {
      const param = { id: editMode };
      dispatch(InventoryGetByIdSim(param));
    }
  }, [editMode, dispatch]);
  const editData = useSelector((state) => state?.inventorySlice?.getByIdSim);
  useEffect(() => {
    if (editData && editMode) {
      methods.setValue("simNumber", editData?.simNo || "");
      methods.setValue("simVendorName", editData?.vendorId || "");
      methods.setValue("simOwnership", editData?.simOwnership || "");
      methods.setValue("simContract", editData?.simContractId || "");
      methods.setValue("vat", editData?.vat || "");
    }
  }, [editData, editMode]);
  useEffect(() => {
    dispatch(GenericGetProductCategoryDropdown({ statuses: 1 }));
  }, [dispatch]);
  // console.log("editData", editData);
  const {
    vendorOptionsData: venderData,
    getGenericDropdowns: simOwnerData,
    contractOptionsData: contractData,
  } = useSelector((state) => state?.dataBankSlice);
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
        (option) => option.code === "002"
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
  // Populate vendor dropdown
  useEffect(() => {
    if (venderData?.length > 0) {
      const formattedOptions = venderData?.map((platform) => ({
        value: platform.id,
        label: platform.vendorName,
      }));
      setVendorOptions(formattedOptions);
    }
  }, [venderData]);
  // sim type options
  useEffect(() => {
    if (simOwnerData?.length > 0) {
      const formattedOptions = simOwnerData.map((platform) => ({
        value: platform.value,
        label: platform.value,
      }));
      setSimOwnershipOptions(formattedOptions);
    }
  }, [simOwnerData]);

  // Fetch contracts when a vendor is selected
  useEffect(() => {
    if (selectedVendor) {
      const params = { parentId: selectedVendor, statuses: 1 };
      dispatch(GenericGetVendorContractDropdownVendorWise(params));
    }
  }, [dispatch, selectedVendor]);
  // Update SIM Contractoptions
  useEffect(() => {
    if (contractData?.length > 0) {
      const formattedOptions = contractData?.map((platform) => ({
        value: platform.id,
        label: platform.contractName,
      }));
      setContractOptions(formattedOptions);
    }
  }, [contractData]);

  // Fetch vendor data on component mount
  useEffect(() => {
    const params = { page: 1, pageLength: 1000, statuses: 1 };
    dispatch(GenericGetVendorDropdown(params));
  }, [dispatch]);
  // Fetch sim ownership data on component mount
  useEffect(() => {
    const sectionName = "Inventory";
    const sectionValue = "SimOwnership";
    dispatch(
      getByHeaderAndSectionAndKey({
        sectionName: sectionName, // Section name for filter2
        sectionValue: sectionValue, // Section value for filter3
      })
    );
  }, [dispatch]);

  const onSubmit = (data) => {
    // console.log("Submitted Data:", data);
    const payload = {
      ProductCategoryId: selectedProduct.value,
      SimNo: data.simNumber,
      VendorId: data.simVendorName,
      SimOwnership: data.simOwnership,
      SimContractId: data.simContract,
      VAT: data.vat,
      EntityId: UserData?.EntityId,
      CreatedBy: UserData?.Id,
      Status: 12,
    };
    const editPayload = {
      Id: editMode,
      ProductCategoryId: selectedProduct.value,
      SimNo: data.simNumber,
      VendorId: data.simVendorName,
      SimOwnership: data.simOwnership,
      SimContractId: data.simContract,
      VAT: data.vat,
      EntityId: UserData?.EntityId,
      UpdatedBy: UserData?.Id,
      Status: editData.status,
    };

    if (editMode) {
      dispatch(InventoryUpdateSimInfo(editPayload)).then((res) => {
        if (res.payload.code === 200) {
          // Fetch updated data after successful update
          router.back();
        }
      });
    } else {
      dispatch(InventoryCreateSimInfo(payload)).then((res) => {
        if (res.payload.code === 200) {
          // Fetch updated data after successful update
          router.back();
        }
      });
    }
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };
  const handleVendorChange = (value) => {
    setSelectedVendor(value); // Update selected vendor
  };
  const handleDownload = () => {
    dispatch(InventoryDownloadSimInfoTemplate()).then((action) => {
      if (action.payload) {
        // Ensure Blob is handled correctly
        const blob = new Blob([action.payload], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel MIME type
        });

        // Create a temporary link element for downloading
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Sim_info_List.xlsx_${Date.now()}.xlsx`; // Set file name
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
      dispatch(InventoryUploadBulkSimInfo(payload)).then((res) => {
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
    <Box component="div">
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

      <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" sx={{ fontSize: 16, fontWeight: 500 }}>
            Add Details
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CustomButton
              variant="outlined"
              startIcon={<FileDownIcon size={18} />}
              onClick={handleDownload}
            >
              Download Template
            </CustomButton>
            <CustomButton startIcon={<UploadOutlined />} onClick={handleUpload}>
              Upload In Bulk
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
        <Box component="div" sx={{ width: "100%", my: 2 }}>
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
        </Box>
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Box
            component="div"
            sx={{
              display: "flex",
              gap: 2,
              borderBottom: "1px solid #2F2B3D40",
              pb: 2,
              pt: 4,
            }}
          >
            <FormTab tab={tab} />
          </Box>
          <Box sx={{ width: "100%", my: 5 }}>
            <AddSimDetailsForm
              control={methods.control}
              options={{
                vendorOptions,
                contractOptions,
                simOwnershipOptions,
              }}
              onVendorChange={handleVendorChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #2F2B3D40",
              pt: 2,
              pb: 4,
            }}
          >
            <CustomButton
              variant="outlined"
              bgColor="danger"
              startIcon={<CircleX size={20} />}
              // onClick={() => router.push("/admin/inventory")}
              onClick={() => router.back()}
            >
              Cancel
            </CustomButton>
            <Box
              component="div"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <CustomButton type="submit" endIcon={<Check size={20} />}>
                Save
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddInventory;
