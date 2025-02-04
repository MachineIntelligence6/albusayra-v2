import React, { createElement, useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Divider, InputAdornment, Paper, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CustomCountryCodeInput from "@/components/shared-components/CustomCountryCodeInput";
// import { referralFormSchema } from "@/utils/schemas/ReferralFormSchema";
import CaptionText from "@/components/shared-components/CaptionText";

import { UpdateApplicantUpdateReferralInfo } from "@/redux/reducers/applicants/applicantThunk";
import { UserData } from "@/configs/UseApi";
import * as Yup from "yup";
import PhoneIcon from "@mui/icons-material/Phone";
import { useDispatch } from "react-redux";

export default function ReferralEditForm({
  handleCloseReferralInfoModal,
  EditingData,
}) {
  const referralFormSchema = Yup.object().shape({
    referralName: Yup.string().required("Referral name is required"),
    referralPhone: Yup.string().required("Referral phone is required"),
    referralAddress: Yup.string().required("Referral address is required"),
  });

  const methods = useForm({
    resolver: yupResolver(referralFormSchema),
    mode: "onChange",
    defaultValues: {
      referralName: "",
      referralPhone: {
        countryCode: "+971",
        number: "",
      },
      referralAddress: "",
    },
  });

  const dispatch = useDispatch();
  const { trigger, control, setValue } = methods;

  const countryCodes = [
    { code: "+971", country: "UAE" },
    { code: "+1", country: "USA" },
    { code: "+91", country: "India" },
    { code: "+44", country: "UK" },
  ];

  const fields = [
    {
      label: "Referred By Whom (UAE)",
      name: "referralName",
      required: true,
      placeholder: "e.g John",
      component: CustomTextField,
    },
    {
      label: "Referral Phone Number (UAE)",
      name: "referralPhone",
      required: true,
      placeholder: "123 456 7890",
      // component: CustomCountryCodeInput,
      // countryCodes,
      component: CustomTextField,
      adornment: <PhoneIcon />,
    },
    {
      label: "Referral Address (UAE)",
      name: "referralAddress",
      required: true,
      placeholder: "Street, 06 Jamal Resident, UAE",
      component: CustomTextField,
    },
  ];

  const handleSave = async () => {
    const isValid = await trigger();
    if (!isValid) {
      console.log("Validation Errors:", methods.formState.errors);
    }
  };

  const onSubmit = (data) => {
    console.log(data);

    const referralData = {
      referralBy: data?.referralName,
      referralContactNumber: data?.referralPhone,
      referralAddress: data?.referralAddress,
      updatedBy: UserData?.Id,
      id: EditingData?.id,
      status: 10,
    };

    dispatch(UpdateApplicantUpdateReferralInfo(referralData)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        handleCloseReferralInfoModal();
      }
    });
  };

  // Update Data
  useEffect(() => {
    if (EditingData) {
      setValue("referralName", EditingData?.referralBy || "");
      setValue("referralPhone", EditingData?.referralContactNumber || "");
      setValue("referralAddress", EditingData?.referralAddress || "");
    }
  }, [EditingData, setValue]);

  return (
    <Paper sx={{ maxWidth: 800, margin: "auto", p: 3 }}>
      <Typography variant="h6" mb="3em">
        REFERRAL
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {fields.map(
              (
                {
                  label,
                  name,
                  placeholder,
                  component,
                  countryCodes,
                  adornment,
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
                      control={control}
                      defaultValue={
                        component === CustomCountryCodeInput
                          ? { countryCode: "+971", number: "" }
                          : ""
                      }
                      render={({ field, fieldState: { error } }) =>
                        createElement(component, {
                          value: field.value,
                          onChange: field.onChange,
                          placeholder,
                          countryCodes,
                          error,
                          InputProps: adornment
                            ? {
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {adornment}
                                  </InputAdornment>
                                ),
                              }
                            : undefined,
                        })
                      }
                    />
                  </Box>
                </Box>
              )
            )}
          </Box>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <CustomButton
              variant="outlined"
              bgColor="danger"
              onClick={() => handleCloseReferralInfoModal()}
              startIcon={<CancelIcon />}
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              variant="contained"
              onClick={handleSave}
              endIcon={<DoneIcon sx={{ width: "15px" }} />}
            >
              Save
            </CustomButton>
          </Box>
        </form>
      </FormProvider>
    </Paper>
  );
}
