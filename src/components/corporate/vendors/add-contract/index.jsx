"use client";

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { addContractData } from "@/utils/vendor-detail";
import ContractForm from "./ContractForm";
import OtherContracts from "./OtherContracts";
import SideCard from "@/components/shared-components/SideCard";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { VendorGetById } from "@/redux/reducers/vendor/vendorThunk";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { UserData } from "@/configs/UseApi";
import {
  VendorContractCreate,
  VendorContractGetById,
  VendorContractGetByStatus,
  VendorContractUpdate,
} from "@/redux/reducers/vendorContract/vendorContractThunk";
import moment from "moment";

const AddContract = () => {
  const [editMode, setEditMode] = useState("");
  const [view, setView] = useState("rider");
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const contractPreviewDetails = searchParams.get("id");

  useEffect(() => {
    if (contractPreviewDetails) {
      const param = { id: contractPreviewDetails };
      dispatch(VendorGetById(param));
    }
  }, [contractPreviewDetails, dispatch]);
  useEffect(() => {
    if (editMode) {
      const param = { id: editMode };
      dispatch(VendorContractGetById(param));
    }
  }, [editMode, dispatch]);
  const VendorData = useSelector((state) => state?.vendorSlice?.getById);
  const editData = useSelector((state) => state?.vendorContractSlice?.getById);
  const currencyType = VendorData.country?.currency ?? "";
  const addContractData = VendorData
    ? [
        { label: "Vendor ID", value: VendorData.vendorNo },
        { label: "Vendor Type", value: VendorData.vendorType },
        { label: "Phone Number", value: VendorData.contactNumber },
        { label: "Country", value: VendorData.country?.countryName },
        { label: "State", value: VendorData.state?.stateName },
        { label: "City", value: VendorData.city?.cityName },
        { label: "Address", value: VendorData.address },
        { label: "TRN No", value: VendorData.trnNo },
        { label: "POC Name", value: VendorData.pocName },
        { label: "POC Phone Number", value: VendorData.pocName },
        {
          label: "Status",
          value: VendorData.status === 1 ? "Active" : "Non active",
        },
      ]
    : [];

  const formSchema = Yup.object().shape({
    contractName: Yup.string().required("Contract Name is required"),
    contractSigningDate: Yup.string().required(
      "Contract Signing Date is required"
    ),
    contractStartDate: Yup.string().required("Contract Start Date is required"),
    contractEndDate: Yup.string().required("Contract End Date is required"),
    fixedAmount: Yup.string().when("contractType", {
      is: "rider",
      then: Yup.string().required("Fixed Amount is required"),
    }),
    commissionAmount: Yup.string().when("contractType", {
      is: "rider",
      then: Yup.string().required("Commission Amount is required"),
    }),
    charges: Yup.string().when("contractType", {
      is: "asset",
      then: Yup.string().required("Charges are required"),
    }),
    status: Yup.string().required("Status is required"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      fixedAmount: 0,
      commissionAmount: 0,
      charges: 0,
    },
  });

  useEffect(() => {
    if (editData && editMode) {
      form.setValue("contractName", editData?.contractName || "");
      form.setValue(
        "contractSigningDate",
        editData?.signingDate
          ? moment(editData?.signingDate).format("YYYY-MM-DD")
          : ""
      );
      form.setValue(
        "contractStartDate",
        editData?.startDate
          ? moment(editData?.startDate).format("YYYY-MM-DD")
          : ""
      );
      form.setValue(
        "contractEndDate",
        editData?.endDate ? moment(editData?.endDate).format("YYYY-MM-DD") : ""
      );
      form.setValue("contractType", editData?.contractType || "");
      form.setValue("fixedAmount", editData?.fixedAmount || "");
      form.setValue("commissionAmount", editData?.commissionAmount || "");
      form.setValue("charges", editData?.charges || 0);
      form.setValue("status", editData?.status === 1 ? "active" : "close");
    }
  }, [editData, editMode, form]);

  const onSubmit = (data) => {
    const sanitizeAmount = (amount) =>
      amount === "" || amount === undefined || amount === null
        ? 0
        : Number(amount);
    const payload = {
      vendorId: contractPreviewDetails,
      contractName: data.contractName,
      signingDate: data.contractSigningDate,
      startDate: data.contractStartDate,
      endDate: data.contractEndDate,
      contractType: data.contractType,
      fixedAmount: sanitizeAmount(data.fixedAmount),
      commissionAmount: sanitizeAmount(data.commissionAmount),
      charges: sanitizeAmount(data.charges),
      createdBy: UserData?.Id,
      status: data.status === "active" ? 1 : 2,
    };

    const editPayload = {
      id: editMode,
      vendorId: contractPreviewDetails,
      contractName: data.contractName,
      signingDate: data.contractSigningDate,
      startDate: data.contractStartDate,
      endDate: data.contractEndDate,
      contractType: data.contractType,
      fixedAmount: sanitizeAmount(data.fixedAmount),
      commissionAmount: sanitizeAmount(data.commissionAmount),
      charges: sanitizeAmount(data.charges),
      updatedBy: UserData?.Id,
      status: data.status === "active" ? 1 : 2,
    };

    const newParams = {
      page: 1,
      pageLength: "",
      statuses: [1, 2],
      filter: view === "rider" ? "Rider" : "Asset",
      filter2: "",
      filter3: "",
      desc: false,
      orderBy: "",
      parentId: contractPreviewDetails,
    };

    if (editMode) {
      dispatch(VendorContractUpdate(editPayload)).then((res) => {
        if (res.payload.code === 200) {
          // Fetch updated data after successful update
          dispatch(VendorContractGetByStatus(newParams));
          handleReset();
        }
      });
    } else {
      dispatch(VendorContractCreate(payload)).then((res) => {
        if (res.payload.code === 200) {
          // Fetch updated data after successful update
          dispatch(VendorContractGetByStatus(newParams));
          handleReset();
        }
      });
    }
  };

  const handleReset = () => {
    form.reset(); // Reset the form fields
    setEditMode("");
  };
  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", gap: 2, flex: "1 1 0" }}>
        <SideCard
          avatarSrc={VendorData?.image}
          name={VendorData?.vendorName}
          email={VendorData?.email}
          contractData={addContractData}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            gap: 2,
            // width: "100%",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FFF",
              boxShadow: "0px 2px 8px 0px rgba(47, 43, 61, 0.12)",
              borderRadius: "30px",
              p: 3,
            }}
          >
            <ContractForm
              form={form}
              onSubmit={onSubmit}
              onReset={handleReset}
              editId={editMode}
              ContractType={view == "rider" ? "Rider" : "Asset"}
              editDataCheck={editData && Object.keys(editData).length > 0}
              currencyType={currencyType}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: "#FFF",
              boxShadow: "0px 2px 8px 0px rgba(47, 43, 61, 0.12)",
              borderRadius: "30px",
            }}
          >
            <Box>
              <OtherContracts
                vendorId={contractPreviewDetails}
                view={view}
                setView={setView}
                editId={editMode}
                setEditId={setEditMode}
                currencyType={currencyType}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddContract;
