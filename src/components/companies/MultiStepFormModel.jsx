"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box, Button, Divider, Paper } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";

import { CompanyInfo } from "./form-steps/CompanyInfo";

import { formSchema } from "@/utils/schemas/companies-schema";
import CustomTabs from "../shared-components/CustomTabs";
import { CustomTabPanel } from "../shared-components/CustomTabPanel";
import CustomButton from "@/components/shared-components/CustomButton";
import { useRouter } from "next/navigation";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

export default function MultiStepFormModel({ handleCloseModal }) {
  const [activeTab, setActiveTab] = useState(0);
  const route = useRouter();
  const methods = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      profileImage: "",
      abbreviation: "",
      companyName: "",
      industry: "",
      website: "",
      phone: "",
      address: "",
      country: "",
      state: "",
      city: "",
    },
  });

  const { trigger, watch } = methods;
  // const watchedResidency = watch("residency");

  // useEffect(() => {
  //   setIsUaeResident(watchedResidency === "resident");
  // }, [watchedResidency]);

  const tabs = ["General Info", "Contact & Residence"];

  const stepFields = {
    0: [
      "abbreviation",
      "companyName",
      "industry",
      "website",
      "phone",
      "address",
      "country",
      "state",
      "city",
    ],
    1: [
      "email",
      "phoneNumber",
      "whatsappNumber",
      "currentCountry",
      "nationality",
    ],
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleNext = async () => {
    console.log("Validating fields:", stepFields[activeTab]);

    const isValid = await trigger(stepFields[activeTab]);
    if (!isValid) {
      console.log("Validation Errors:", methods.formState.errors);
    }

    if (isValid) {
      setActiveTab((prev) => Math.min(tabs.length - 1, prev + 1));
    }
  };

  const onSubmit = (data) => {
    console.log("data", data);
    // route.push("/admin/applicants/final-review");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper sx={{ maxWidth: 800, margin: "auto", p: 3 }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CustomTabs
              tabs={tabs}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />

            <CustomTabPanel value={activeTab} index={0}>
              <CompanyInfo
                control={methods.control}
                errors={methods?.formState?.errors}
              />
            </CustomTabPanel>

            <Divider
              sx={{
                borderColor: "lightgray",
              }}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <CustomButton
                variant="outlined"
                bgColor="danger"
                onClick={handleCloseModal}
                startIcon={<CancelIcon />}
              >
                Cancel
              </CustomButton>
              <Box component="div" display="flex" gap="10px">
                {activeTab > 0 && (
                  <CustomButton
                    variant="contained"
                    startIcon={<ArrowBackOutlinedIcon />}
                    sx={{
                      bgcolor: "#737682",
                    }}
                    onClick={() =>
                      setActiveTab((prev) => Math.max(0, prev - 1))
                    }
                  >
                    Back
                  </CustomButton>
                )}
                {activeTab === tabs.length - 1 ? (
                  <CustomButton
                    type="submit"
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<DoneIcon sx={{ width: "15px" }} />}
                  >
                    Save
                  </CustomButton>
                ) : (
                  <CustomButton
                    type="button"
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<DoneIcon sx={{ width: "15px" }} />}
                  >
                    Next
                  </CustomButton>
                )}
              </Box>
            </Box>
          </form>
        </FormProvider>
      </Paper>
    </LocalizationProvider>
  );
}
