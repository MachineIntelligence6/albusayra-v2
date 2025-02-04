"use client";
import { useCallback, useEffect, useState } from "react";
import EmptyScreen from "@/components/shared-components/EmptyScreen";
import { Box, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import PlatformModal from "./PlatformModal";
import { yupResolver } from "@hookform/resolvers/yup";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import CustomButton from "@/components/shared-components/CustomButton";
import { Plus } from "lucide-react";
import PlatformTableWrapper from "./PlatformTableWrapper";
import * as Yup from "yup";
import { UserData } from "@/configs/UseApi";
import {
  PlatformCreate,
  PlatformGetById,
  PlatformGetByStatus,
  PlatformUpdate,
} from "@/redux/reducers/platform/platformThunk";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
const PlatForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const editMode = searchParams.get("id");
  const [appliedFilters, setAppliedFilters] = useState([]); //Advance filters
  useEffect(() => {
    if (editMode) {
      const param = { id: editMode };
      dispatch(PlatformGetById(param));
    }
  }, [editMode, dispatch]);
  const editData = useSelector((state) => state?.platformSlice?.getById);
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

    platform_id: Yup.string().required("Platform ID is required"),
    platform_name: Yup.string().required("Platform Name is required"),
    platform: Yup.string().required("Platform Type is required"),
    email_address: Yup.string()
      .email("Invalid email format")
      .required("Email Address is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
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
      form.setValue("platform_id", editData?.platformId || "");
      form.setValue("platform_name", editData?.platformName || "");
      form.setValue("platform", editData?.platformType || "");
      form.setValue("email_address", editData?.email || "");
      form.setValue("address", editData?.address || "");
      form.setValue("poc_name", editData?.pocName || "");
      form.setValue("poc_phone_number", editData?.pocContactNumber || "");
      form.setValue("status", editData?.status === 1 ? "active" : "non_active");
    }
  }, [editData, editMode, form]);

  const onSubmit = (data) => {
    // console.log("Submitted Data:", data);
    const payload = {
      PlatformId: data.platform_id,
      PlatformName: data.platform_name,
      PlatformType: data.platform,
      Email: data.email_address,
      CountryId: data.country,
      StateId: data.state,
      CityId: data.city,
      Address: data.address,
      POCName: data.poc_name,
      POCContactNumber: data.poc_phone_number,
      Image: data.profileImage,
      CreatedBy: UserData?.Id,
      Status: data.status == "active" ? 1 : 2,
    };
    const editPayload = {
      Id: editMode,
      PlatformId: data.platform_id,
      PlatformName: data.platform_name,
      PlatformType: data.platform,
      Email: data.email_address,
      CountryId: data.country,
      StateId: data.state,
      CityId: data.city,
      Address: data.address,
      POCName: data.poc_name,
      POCContactNumber: data.poc_phone_number,
      Image: data.profileImage,
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
      dispatch(PlatformUpdate(editPayload)).then((res) => {
        if (res.payload.code === 200) {
          // Fetch updated data after successful update
          dispatch(PlatformGetByStatus(newParams));
          handleReset();
          setIsOpenModal(false);
          router.push("/admin/corporate/platforms");
        }
      });
    } else {
      dispatch(PlatformCreate(payload)).then((res) => {
        if (res.payload.code === 200) {
          // Fetch updated data after successful update
          dispatch(PlatformGetByStatus(newParams));
          handleReset();
          setIsOpenModal(false);
          router.push("/admin/corporate/platforms");
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
      if (filter.filterName === "Platform ID") {
        acc.filter2 = filter.value;
      } else if (filter.filterName === "Platform Type") {
        acc.filter = filter.value;
      } else if (filter.filterName === "Country") {
        acc.SubParentId = filter.value;
      } else if (filter.filterName === "State") {
        acc.SubParentId1 = filter.value;
      } else if (filter.filterName === "City") {
        acc.SubParentId2 = filter.value;
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
    // console.log("API Request Params:", param);
    dispatch(PlatformGetByStatus(param));
  }, [dispatch, currentPage, pageSize, search, appliedFilters]);
  const platformData = useSelector(
    (state) => state?.platformSlice?.getByStatus
  );

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
          Add Platform
        </CustomButton>
      </Box>
      <Divider sx={{ mt: 2 }} />

      <Box component="section">
        {platformData?.data?.length < 0 ? (
          <EmptyScreen
            viewObject={{
              image: "/icons/paltform-empty-screen.svg",
              altText: "campaign",
              title: "No Platforms Added",
              description:
                "Please click the button below to add a new Platform.",
              buttonText: "Add Platform",
              onButtonClick: () => setIsOpenModal(true),
            }}
          />
        ) : (
          <PlatformTableWrapper
            tableData={platformData}
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
          <PlatformModal
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

export default PlatForm;
