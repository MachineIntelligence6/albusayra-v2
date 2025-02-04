"use client";
import { useCallback, useEffect, useState } from "react";
import EmptyScreen from "@/components/shared-components/EmptyScreen";
import { Box, Divider, Typography } from "@mui/material";
import ImageUpload from "@/components/applicants/ImageUpload";
import { Controller, useForm, useFormContext } from "react-hook-form";
import VendorModal from "./VendorModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "@/utils/schemas/applicants-schema";
import VendorTableWrapper from "./VendorTableWrapper";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import CustomButton from "@/components/shared-components/CustomButton";
import { Plus } from "lucide-react";
import * as Yup from "yup";
import { UserData } from "@/configs/UseApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  VendorCreate,
  VendorGetById,
  VendorGetByStatus,
  VendorUpdate,
} from "@/redux/reducers/vendor/vendorThunk";
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
const Vendors = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const editMode = searchParams.get("id");
  const [appliedFilters, setAppliedFilters] = useState([]); //Advance filters
  useEffect(() => {
    if (editMode) {
      const param = { id: editMode };
      dispatch(VendorGetById(param));
    }
  }, [editMode, dispatch]);
  const editData = useSelector((state) => state?.vendorSlice?.getById);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [pageSize, setPageSize] = useState(10); // Page size state
  const [search, setSearch] = useState(""); // Search state
  const formSchema = Yup.object().shape({
    profileImage: Yup.mixed()
      .required("Profile image is required")
      .test("fileOrUrl", "Profile image is required", (value) => {
        if (editMode) {
          // In edit mode, accept existing URLs or files
          return typeof value === "string" || (value && value instanceof File);
        }
        // Otherwise, require a file
        return value && value instanceof File;
      }),

    vendor_agreement: Yup.mixed()
      .required("Vendor agreement is required")
      .test("fileType", "Only PDF files are allowed", (value) => {
        if (editMode) {
          // In edit mode, accept existing URLs or files
          return (
            typeof value === "string" ||
            (value && value instanceof File && value.type === "application/pdf")
          );
        }
        // Otherwise, require a file and check its type
        return (
          value && value instanceof File && value.type === "application/pdf"
        );
      }),
    venrdor_name: Yup.string().required("Vendor Name is required"),
    tax_registered: Yup.string().required("This  is required"),
    vendor_type: Yup.string().required("Vendor Type is required"),
    email_address: Yup.string()
      .email("Invalid email format")
      .required("Email Address is required"),
    phone_number: Yup.string().required("Phone Number is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    trn_no: Yup.string().required("TRN No is required"),
    poc_name: Yup.string().required("POC Name is required"),
    poc_phone_number: Yup.string().required("POC Phone Number is required"),
    status: Yup.string().required("Status is required"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });
  useEffect(() => {
    if (editData && editMode) {
      form.setValue("venrdor_name", editData?.vendorName || "");
      form.setValue("tax_registered", editData?.taxRegistered || "");
      form.setValue("vendor_type", editData?.vendorType || "");
      form.setValue("email_address", editData?.email || "");
      form.setValue("phone_number", editData?.contactNumber || "");
      form.setValue("address", editData?.address || "");
      form.setValue("trn_no", editData?.trnNo || "");
      form.setValue("poc_name", editData?.pocName || "");
      form.setValue("poc_phone_number", editData?.pocContactNumber || "");
      form.setValue("status", editData?.status === 1 ? "active" : "non_active");
    }
  }, [editData, editMode, form]);

  const onSubmit = (data) => {
    const payload = {
      VendorName: data.venrdor_name,
      TaxRegistered: data.tax_registered,
      VendorType: data.vendor_type,
      Email: data.email_address,
      ContactNumber: data.phone_number,
      CountryId: data.country,
      StateId: data.state,
      CityId: data.city,
      Address: data.address,
      TRNNo: data.trn_no,
      POCName: data.poc_name,
      POCContactNumber: data.poc_phone_number,
      Image: data.profileImage,
      VendorAgreement: data.vendor_agreement,
      CreatedBy: UserData?.Id,
      Status: data.status == "active" ? 1 : 2,
    };
    const editPayload = {
      Id: editMode,
      VendorName: data.venrdor_name,
      TaxRegistered: data.tax_registered,
      VendorType: data.vendor_type,
      Email: data.email_address,
      ContactNumber: data.phone_number,
      CountryId: data.country,
      StateId: data.state,
      CityId: data.city,
      Address: data.address,
      TRNNo: data.trn_no,
      POCName: data.poc_name,
      POCContactNumber: data.poc_phone_number,
      Image: data.profileImage,
      VendorAgreement: data.vendor_agreement,
      UpdatedBy: UserData?.Id,
      Status: data.status == "active" ? 1 : 2,
    };

    const newParams = {
      page: currentPage,
      pageLength: pageSize,
      statuses: [1, 2],
      filter: search,
      filter2: "",
      filter3: "",
      desc: false,
      orderBy: "",
      parentId: "",
    };
    if (editMode) {
      dispatch(VendorUpdate(editPayload)).then((res) => {
        if (res.payload.code === 200) {
          // Fetch updated data after successful update
          dispatch(VendorGetByStatus(newParams));
          handleReset();
          setIsOpenModal(false);
          router.push("/admin/corporate");
        }
      });
    } else {
      dispatch(VendorCreate(payload)).then((res) => {
        if (res.payload.code === 200) {
          // Fetch updated data after successful update
          dispatch(VendorGetByStatus(newParams));
          handleReset();
          setIsOpenModal(false);
          router.push("/admin/corporate");
        }
      });
    }
  };

  const handleReset = () => {
    form.reset(); // Reset the form fields
    form.setValue("country", "");
    form.setValue("state", "");
    form.setValue("city", "");
    // setIsOpenModal(false); // Close the modal
  };

  useEffect(() => {
    // Transform filters to API format
    const filtersToApi = appliedFilters.reduce((acc, filter, index) => {
      if (filter.filterName === "Vendor ID") {
        acc.filter2 = filter.value;
      } else if (filter.filterName === "Vendor Type") {
        acc.filter = filter.value;
      } else if (filter.filterName === "Country") {
        acc.SubParentId = filter.value;
      } else if (filter.filterName === "City") {
        acc.SubParentId2 = filter.value;
      } else if (filter.filterName === "State") {
        acc.SubParentId1 = filter.value;
      }
      return acc;
    }, {});

    // Construct API request params
    const param = {
      page: currentPage,
      pageLength: pageSize,
      statuses: [1, 2],
      filter: filtersToApi.filter || "",
      filter2: filtersToApi.filter2 || "",
      filter3: search,
      desc: true,
      orderBy: "CreatedDate",
      parentId: "",
      SubParentId: filtersToApi.SubParentId || "",
      SubParentId1: filtersToApi.SubParentId1 || "",
      SubParentId2: filtersToApi.SubParentId2 || "",
    };
    dispatch(VendorGetByStatus(param));
  }, [dispatch, currentPage, pageSize, search, appliedFilters]);
  const vendorData = useSelector((state) => state?.vendorSlice?.getByStatus);
  const handlePageChange = (page) => setCurrentPage(page);
  const handlePageSizeChange = (size) => setPageSize(size);
  const handleSearchChange = useCallback(
    debounce((value) => setSearch(value), 500),
    []
  );

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
        <CustomButton
          startIcon={<Plus />}
          sx={{ px: 4 }}
          onClick={() => {
            setIsOpenModal(true);
            handleReset();
          }}
        >
          Add Vendor
        </CustomButton>
      </Box>
      <Divider sx={{ mt: 2 }} />

      <Box component="section">
        {vendorData?.data?.length < 0 ? (
          <EmptyScreen
            viewObject={{
              image: "/icons/vendor-empty-screen.svg",
              altText: "icons",
              title: "No Vendors Added",
              description:
                "Please click the button below to add your new Vendor.",
              buttonText: "Add Vendor",
              onButtonClick: () => setIsOpenModal(true),
            }}
          />
        ) : (
          <VendorTableWrapper
            tableData={vendorData}
            setIsOpenModal={setIsOpenModal}
            pageSize={pageSize}
            currentPage={currentPage}
            setPageSize={setPageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onSearch={handleSearchChange}
            search={search}
            setAppliedFilters={setAppliedFilters}
          />
        )}

        {isOpenModal && (
          <VendorModal
            isOpenModal={isOpenModal}
            onClose={() => setIsOpenModal(false)}
            form={form}
            onSubmit={onSubmit}
            onReset={handleReset}
            editData={editData}
            editMode={editMode}
          />
        )}
      </Box>
    </>
  );
};

export default Vendors;
