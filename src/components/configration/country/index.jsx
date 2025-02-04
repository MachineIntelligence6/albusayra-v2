import React, { createElement, useEffect, useState } from "react";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CustomSelect from "@/components/shared-components/CustomSelect";
import { Box } from "@mui/material";
import CaptionText from "@/components/shared-components/CaptionText";
import { Controller } from "react-hook-form";
import CustomButton from "@/components/shared-components/CustomButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
import ConfigurationModal from "@/components/shared-components/modals/ConfigurationModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const CountryForm = (props) => {
  const { isOpenModal, onClose, onReset, editData, editMode } = props;
  const formSchema = Yup.object().shape({
    countryName: Yup.string().required("Country Nameis required"),
    countryCode: Yup.string().required("Country Code is required"),
    currency: Yup.string().required("Currencyis required"),
    status: Yup.string().required("Status is required"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    // const payload = {
    //   PlatformId: data.platform_id,
    //   PlatformName: data.platform_name,
    //   PlatformType: data.platform,
    //   Email: data.email_address,
    //   CountryId: data.country,
    //   StateId: data.state,
    //   CityId: data.city,
    //   Address: data.address,
    //   POCName: data.poc_name,
    //   POCContactNumber: data.poc_phone_number,
    //   Image: data.profileImage,
    //   CreatedBy: UserData?.Id,
    //   Status: data.status == "active" ? 1 : 2,
    // };
    // const editPayload = {
    //   Id: editMode,
    //   PlatformId: data.platform_id,
    //   PlatformName: data.platform_name,
    //   PlatformType: data.platform,
    //   Email: data.email_address,
    //   CountryId: data.country,
    //   StateId: data.state,
    //   CityId: data.city,
    //   Address: data.address,
    //   POCName: data.poc_name,
    //   POCContactNumber: data.poc_phone_number,
    //   Image: data.profileImage,
    //   UpdatedBy: UserData?.Id,
    //   Status: data.status == "active" ? 1 : 2,
    // };

    // const newParams = {
    //   page: currentPage,
    //   pageLength: pageSize,
    //   statuses: [1, 2],
    //   filter: search,
    //   filter2: "",
    //   filter3: "",
    //   desc: false,
    //   orderBy: "",
    //   parentId: "",
    // };
    // if (editMode) {
    //   dispatch(PlatformUpdate(editPayload)).then((res) => {
    //     if (res.payload.code === 200) {
    //       // Fetch updated data after successful update
    //       dispatch(PlatformGetByStatus(newParams));
    //       handleReset();
    //       setIsOpenModal(false);
    //       router.push("/admin/corporate/platforms");
    //     }
    //   });
    // } else {
    //   dispatch(PlatformCreate(payload)).then((res) => {
    //     if (res.payload.code === 200) {
    //       // Fetch updated data after successful update
    //       dispatch(PlatformGetByStatus(newParams));
    //       handleReset();
    //       setIsOpenModal(false);
    //       router.push("/admin/corporate/platforms");
    //     }
    //   });
    // }
  };
  const fields = [
    {
      label: "Country Name",
      name: "countryName",
      required: true,
      placeholder: "Enter Country Name",
      component: CustomTextField,
    },
    {
      label: "Country Code",
      name: "countryCode",
      required: true,
      placeholder: "Enter Country Code",
      component: CustomTextField,
    },
    {
      label: "Currency",
      name: "currency",
      placeholder: "Select Currency",
      required: true,
      component: CustomSelect,
      //   options: countryOptions,
      //   onChange: (e) => handleCountryChange(e.target.value),
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
  ];
  return (
    <ConfigurationModal
      open={isOpenModal}
      onClose={() => {
        onClose();
        // onReset();
        // setCountryOptions([]);
        // setStateOptions([]);
        // setCityOptions([]);
        // router.push("/admin/corporate/platforms");
      }}
      title="Add Country"
      hideActions={true}
    >
      <Box
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
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
                  textAlign: "left",
                  paddingRight: "1rem",
                }}
              >
                <CaptionText text={label} required={required} />
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
              //   onReset();
              onClose();
              //   router.push("/admin/corporate/platforms");
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
    </ConfigurationModal>
  );
};

export default CountryForm;
