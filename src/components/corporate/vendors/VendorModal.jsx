"use Client";
import React, { createElement, useEffect, useState } from "react";
import VendorModalWrapper from "@/components/shared-components/modals/VendorModalWrapper";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import ImageUpload from "@/components/applicants/ImageUpload";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CustomSelect from "@/components/shared-components/CustomSelect";
import PhoneNumberTextField from "@/components/shared-components/NumberTextField";
import UploadInputField from "@/components/shared-components/UploadInputField";
import CaptionText from "@/components/shared-components/CaptionText";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "@/components/shared-components/CustomButton";
import {
  getByHeaderAndSectionAndKey,
  getCitiesByStatus,
  getCountriesByStatus,
  getStatesByStatus,
} from "@/redux/reducers/dataBank/dataBankThunk";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
const renderLabel = (label, required = false) => (
  <Typography variant="subtitle1" sx={{ fontSize: 14 }} component="p">
    {label}
    {required && (
      <Typography component="span" color="error">
        {" "}
        *
      </Typography>
    )}
  </Typography>
);

const VendorModal = (props) => {
  const { isOpenModal, onClose, form, onSubmit, onReset, editData, editMode } =
    props;
  const router = useRouter();
  const dispatch = useDispatch();
  // State for options
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [vendorTypeOptions, setVendorTypeOptions] = useState([]);
  const {
    getCountryByStatuses: countryData,
    getStateByStatuses: stateData,
    getCityByStatuses: cityData,
    getGenericDropdowns: platformTypeData,
  } = useSelector((state) => state.dataBankSlice);
  useEffect(() => {
    if (editMode && editData?.image) {
      form.setValue("profileImage", editData.image);
    } else {
      form.setValue("profileImage", null); // Reset if not in edit mode
    }
  }, [editMode, editData, form]);

  // edit data country,state,city
  useEffect(() => {
    if (editData && editMode) {
      form.setValue("country", editData?.countryId || "");
      form.setValue("state", editData?.stateId || "");
      form.setValue("city", editData?.city?.id || "");

      if (editData?.countryId) {
        dispatch(
          getStatesByStatus({
            statuses: 1,
            parentId: editData?.countryId,
          })
        );
      }
      if (editData?.stateId) {
        dispatch(
          getCitiesByStatus({ statuses: 1, parentId: editData.stateId })
        );
      }
    }
  }, [editData, form, editMode, dispatch]);

  useEffect(() => {
    dispatch(getCountriesByStatus({ page: 1, pageLength: 1000, statuses: 1 }));
    const sectionName = "Vendor";
    const sectionValue = "VendorType";
    dispatch(
      getByHeaderAndSectionAndKey({
        sectionName: sectionName, // Section name for filter2
        sectionValue: sectionValue, // Section value for filter3
      })
    );
  }, [dispatch]);
  // Update country options
  useEffect(() => {
    if (countryData?.length > 0) {
      const formattedOptions = countryData.map((country) => ({
        value: country.id,
        label: country.countryName,
      }));
      setCountryOptions(formattedOptions);
    }
  }, [countryData]);
  // Platform type options
  useEffect(() => {
    if (platformTypeData?.length > 0) {
      const formattedOptions = platformTypeData.map((platform) => ({
        value: platform.value,
        label: platform.value,
      }));
      setVendorTypeOptions(formattedOptions);
    }
  }, [platformTypeData]);
  // Fetch states based on selected country
  const handleCountryChange = (countryId) => {
    dispatch(
      getStatesByStatus({
        statuses: 1,
        parentId: countryId,
      })
    );
    form.setValue("state", ""); // Reset state selection
    form.setValue("city", ""); // Reset city selection
  };
  // Update state options
  useEffect(() => {
    if (stateData?.length > 0) {
      const formattedOptions = stateData.map((state) => ({
        value: state.id,
        label: state.stateName,
      }));
      setStateOptions(formattedOptions);
    }
  }, [stateData]);
  // Update city options
  useEffect(() => {
    if (cityData?.length > 0) {
      const formattedOptions = cityData.map((city) => ({
        value: city.id,
        label: city.cityName,
      }));
      setCityOptions(formattedOptions);
    }
  }, [cityData]);
  // Fetch cities based on selected state
  const handleStateChange = (stateId) => {
    dispatch(getCitiesByStatus({ statuses: 1, parentId: stateId }));
    form.setValue("city", ""); // Reset city selection
  };

  const fields = [
    {
      label: "Vendor Name",
      name: "venrdor_name",
      required: true,
      placeholder: "Vendor Name",
      component: CustomTextField,
    },
    {
      label: "Vendor Type",
      name: "vendor_type",
      required: true,
      component: CustomSelect,
      options: vendorTypeOptions,
    },
    {
      label: "Email Address",
      name: "email_address",
      required: true,
      placeholder: "example@example.com",
      component: CustomTextField,
    },
    {
      label: "Phone",
      name: "phone_number",
      required: true,
      placeholder: "123 456 7890",
      component: PhoneNumberTextField,
    },
    {
      label: "Country",
      name: "country",
      placeholder: "Select Country",
      required: true,
      options: countryOptions,
      onChange: (e) => handleCountryChange(e.target.value),
    },
    {
      label: "State",
      name: "state",
      placeholder: "Select State",
      required: true,
      component: CustomSelect,
      options: stateOptions,
      onChange: (e) => handleStateChange(e.target.value),
    },
    {
      label: "City",
      name: "city",
      required: true,
      placeholder: "Select City",
      options: cityOptions,
    },
    {
      label: "Address",
      name: "address",
      required: true,
      placeholder: "street 08, Al Jamal Resident, UAE",
      component: CustomTextField,
    },
    {
      label: "Tax Registered",
      name: "tax_registered",
      placeholder: "Yes/No",
      required: true,
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      label: "TRN No",
      name: "trn_no",
      required: true,
      placeholder: "2143243",
      component: CustomTextField,
    },
    {
      label: "POC Name",
      name: "poc_name",
      required: true,
      placeholder: "POC Name",
      component: CustomTextField,
    },
    {
      label: "POC Phone Number",
      name: "poc_phone_number",
      required: true,
      placeholder: "123 456 7890",
      component: PhoneNumberTextField,
    },

    {
      label: "Status",
      name: "status",
      placeholder: "Active/Non active",
      required: true,
      options: [
        { value: "active", label: "Active" },
        { value: "non_active", label: "Non active" },
      ],
    },
    {
      label: "Vendor Agreement",
      name: "vendor_agreement",
      required: true,
      placeholder: "PDF Scanned",
      // component: UploadInputField,
      component: (props) => (
        <UploadInputField
          file={props.value} // Display the uploaded file's name
          onUpload={(file) => props.onChange(file)} // Update form state with uploaded file
          onRemove={() => props.onChange(null)} // Clear the file from form state
          error={props.error}
          helperText="Only PDF files are allowed"
          disabled={true}
          url={editData?.vendorAgreement}
          isEditMode={editMode != null && editMode !== ""}
        />
      ),
    },
  ];
  return (
    <VendorModalWrapper
      open={isOpenModal}
      onClose={() => {
        onClose();
        onReset();
        setCountryOptions([]);
        setStateOptions([]);
        setCityOptions([]);
        router.push("/admin/corporate");
      }}
      title="Vendor Information"
      hideActions={true}
    >
      <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Controller
            name="profileImage"
            control={form.control}
            render={({ field, fieldState: { error } }) => (
              <ImageUpload
                uploadedImage={field.value} // Always use field.value
                onFileChange={(file) => field.onChange(file)}
                error={error?.message || null}
              />
            )}
          />
        </Box>

        {fields?.map(
          (
            {
              label,
              name,
              required,
              placeholder,
              options,
              component = CustomSelect,
              onChange,
            },
            index
          ) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Box
                sx={{
                  flex: "0 0 40%",
                  textalign: "left",
                  paddingRight: "1rem",
                }}
              >
                <CaptionText text={label} required />
              </Box>
              <Box sx={{ flex: "1", width: "80%" }}>
                <Controller
                  name={name}
                  control={form.control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) =>
                    createElement(component, {
                      ...field,
                      placeholder,
                      options,
                      error,
                      onChange: (e) => {
                        field.onChange(e);
                        if (onChange) onChange(e);
                      },
                    })
                  }
                />
              </Box>
            </Box>
          )
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            pt: 2,
            borderTop: "1px solid #2F2B3D40",
          }}
        >
          <CustomButton
            onClick={() => {
              onReset();
              onClose();
              router.push("/admin/corporate");
            }}
            variant="outlined"
            bgColor="danger"
            startIcon={<HighlightOffIcon />}
          >
            Cancel
          </CustomButton>
          <CustomButton
            type="submit"
            variant="contained"
            endIcon={<DoneIcon />}
          >
            Save
          </CustomButton>
        </Box>
      </Box>
    </VendorModalWrapper>
  );
};

export default VendorModal;
