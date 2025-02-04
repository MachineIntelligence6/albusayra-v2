"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box, Divider, Paper } from "@mui/material";
import { GeneralInfo } from "./form-steps/GeneralInfo";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import { ContactResidence } from "./form-steps/ContactResidence";
import { EmiratesID } from "./form-steps/EmiratesID";
import { DrivingLicense } from "./form-steps/DrivingLicense";
import { PassportDetails } from "./form-steps/PassportDetails";
import { Referral } from "./form-steps/Referral";
import { applicantFormSchema } from "@/utils/schemas/applicants-schema";
import CustomTabs from "../shared-components/CustomTabs";
import { CustomTabPanel } from "../shared-components/CustomTabPanel";
import CustomButton from "@/components/shared-components/CustomButton";
import { useRouter } from "next/navigation";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignByStatus } from "@/redux/reducers/campaign/campaignThunk";
import {
  ApplicantGetById,
  CreateApplicantGeneraInfo,
  ReferralInfoMultiPart,
  UpdateApplicantContactInfo,
  UpdateApplicantEmiratesInfo,
  UpdateApplicantGeneraInfo,
  UpdateApplicantLicenseInfo,
  UpdateApplicantPassportInfo,
  UpdateApplicantUpdateReferralInfo,
} from "@/redux/reducers/applicants/applicantThunk";
import { UserData } from "@/configs/UseApi";
import * as Yup from "yup";
import { updateEmployeeSuccess } from "@/redux/reducers/applicants/applicantSlice";

export default function MultiStepFormModel({
  handleCloseModal,
  applicantId,
  setSelectedApplicantId,
}) {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0); // for tabs
  const [isUaeResident, setIsUaeResident] = useState(false);
  const [isActive, setIsActive] = useState(false); // for Switch

  const applicantFormSchema = Yup.object().shape({
    // ============================================ General fields =================================
    profileImage: Yup.mixed().required("Profile image is required"),
    residency: Yup.string().required("Residency status is required"),
    fullName: Yup.string().required("Full Name is required"),
    gender: Yup.string().required("Gender is required"),
    employeeStatus: Yup.string().required("Employment Status is required"),
    workingCountry: Yup.string().required(
      "Preferred Working Country is required"
    ),
    workingState: Yup.string().required("Preferred Working State is required"),
    workingCity: Yup.string().required("Preferred Working City is required"),
    interestedplatform: Yup.string().when("residency", {
      is: "UAE Resident",
      then: (schema) =>
        schema.required("This field is required for UAE residents"),
      otherwise: (schema) => schema.notRequired(),
    }),
    learnedFrom: Yup.string().required(
      "Please specify how you learned about this form"
    ),
    companyprovideNOC: Yup.string().when("residency", {
      is: "UAE Resident",
      then: (schema) =>
        schema.required("This field is required for UAE residents"),
      otherwise: (schema) => schema.notRequired(),
    }),

    // ============================================ Contact & Residence fields =================================
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    // whatsappNumber: Yup.string().required("WhatsApp Number is required"),
    currentCountryResidence: Yup.string().when("residency", {
      is: "Non-UAE Resident",
      then: (schema) =>
        schema.required("Current country is required for non-UAE residents"),
      otherwise: (schema) => schema.notRequired(),
    }),
    nationality: Yup.string().when("residency", {
      is: "Non-UAE Resident",
      then: (schema) =>
        schema.required("Nationality is required for non-UAE residents"),
      otherwise: (schema) => schema.notRequired(),
    }),

    // ============================================ Emirates fields =================================

    emiratesIDNumber: Yup.string().when("residency", {
      is: "UAE Resident",
      then: (schema) =>
        schema.required("Emirates ID number is required for UAE residents"),
      otherwise: (schema) => schema.notRequired(),
    }),
    emiratesIDIssueDate: Yup.mixed().when("residency", {
      is: "UAE Resident",
      then: (schema) => schema.required("Emirates ID Issue Date is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    emiratesIDExpiryDate: Yup.mixed().when("residency", {
      is: "UAE Resident",
      then: (schema) => schema.required("Emirates ID Expiry Date is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    emiratesIDFront: Yup.mixed().when("residency", {
      is: "UAE Resident",
      then: (schema) => schema.required("Emirates ID front scan is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    emiratesIDBack: Yup.mixed().when("residency", {
      is: "UAE Resident",
      then: (schema) => schema.required("Emirates ID back scan is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    residencyIqama: Yup.mixed().when("residency", {
      is: "UAE Resident",
      then: (schema) => schema.required("Residency/Iqama scan is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    // ============================================ Driving License fields =================================
    isLicenseHolder: Yup.string().required(
      "Please specify if you hold a driving license"
    ),
    licenseNumber: Yup.string().when("isLicenseHolder", {
      is: "yes",
      then: (schema) =>
        schema.required("License number is required for license holders"),
      otherwise: (schema) => schema.notRequired(),
    }),
    LicenseImageFront: Yup.mixed().when("residency", {
      is: "UAE Resident",
      then: (schema) => schema.required("License image front scan is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    LicenseImageBack: Yup.mixed().when("residency", {
      is: "UAE Resident",
      then: (schema) => schema.required("License image back scan is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    licenseIssueDate: Yup.date()
      .nullable()
      .typeError("License Issue Date is not valid")
      .required("License Issue Date is required"),
    licenseExpiryDate: Yup.date()
      .nullable()
      .typeError("License Expiry Date is not valid")
      .min(
        Yup.ref("licenseIssueDate"),
        "License Expiry Date can't be before License Issue Date"
      )
      .required("License Expiry Date is required"),

    // ============================================ Passport Details fields =================================
    passportNumber: Yup.string().required("Passport number is required"),
    passportIssueDate: Yup.date()
      .nullable()
      .typeError("Passport Issue Date is not valid")
      .required("Passport Issue Date is required"),
    passportExpiryDate: Yup.date()
      .nullable()
      .typeError("Passport Expiry Date is not valid")
      .min(
        Yup.ref("passportIssueDate"),
        "Passport Expiry Date can't be before Passport Issue Date"
      )
      .required("Passport Expiry Date is required"),
    passportCopy: Yup.mixed().required("Passport copy is required"),

    // ============================================ Referral fields =================================
    referralName: Yup.string().required("Referral name is required"),
    referralPhone: Yup.string().required("Referral phone is required"),
    referralAddress: Yup.string().required("Referral address is required"),
  });

  const methods = useForm({
    resolver: yupResolver(applicantFormSchema),
    mode: "onChange",
    defaultValues: {
      // General fields
      profileImage: "",
      residency: "",
      fullName: "",
      gender: "",
      employeeStatus: "",
      workingCountry: "",
      workingState: "",
      workingCity: "",
      interestedplatform: "",
      learnedFrom: "",
      companyprovideNOC: "",

      // Contact & Residence fields
      email: "",
      phoneNumber: "",
      whatsappNumber: "",
      currentCountryResidence: "",
      nationality: "",

      // Emirates fields
      emiratesIDNumber: "",
      emiratesIDIssueDate: "",
      emiratesIDExpiryDate: "",
      emiratesIDFront: "",
      emiratesIDBack: "",
      residencyIqama: "",

      // Driving License fields
      isLicenseHolder: "",
      licenseNumber: "",
      LicenseImageFront: "",
      LicenseImageBack: "",
      licenseIssueDate: null,
      licenseExpiryDate: null,

      // Passport Details fields
      passportNumber: "",
      passportIssueDate: null,
      passportExpiryDate: null,
      passportCopy: "",

      // Referral fields
      referralName: "",
      referralPhone: "",
      referralAddress: "",
    },
  });
  const {
    trigger,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = methods;

  console.log("watch", watch()); // To monitor the form values
  console.log("errors", errors); // To check for validation errors

  const { proceedDetails, createGeneralInfo, submitApplicantSuccess } =
    useSelector((state) => state.applicantSlice);

  const watchedResidency = watch("residency");
  useEffect(() => {
    setIsUaeResident(watchedResidency === "UAE Resident");
  }, [watchedResidency]);

  console.log("proceedDetails", proceedDetails);
  console.log("createGeneralInfo", createGeneralInfo);

  useEffect(() => {
    setSelectedApplicantId(proceedDetails?.id || createGeneralInfo?.id || null);
  }, [proceedDetails, createGeneralInfo]);

  useEffect(() => {
    if (applicantId) {
      dispatch(ApplicantGetById({ id: applicantId }));
    }
  }, [dispatch, applicantId]);

  // console.log("submitApplicantSuccess", submitApplicantSuccess);

  // useEffect(() => {
  //   if (submitApplicantSuccess) {
  //     dispatch(ApplicantGetById({ id: applicantId }));
  //   }
  // }, [dispatch, applicantId, submitApplicantSuccess]);

  const tabs = [
    "General Info",
    "Contact & Residence",
    ...(isUaeResident ? ["Emirates ID"] : []),
    "Driving License",
    "Passport Details",
    "Referral",
  ];

  const stepFields = {
    0: [
      "campaignName",
      "residency",
      "fullName",
      "gender",
      "employeeStatus",
      "workingCountry",
      "workingState",
      "workingCity",
      "interestedplatform",
      "learnedFrom",
      "companyprovideNOC",
    ],
    1: [
      "email",
      "phoneNumber",
      "whatsappNumber",
      "currentCountryResidence",
      "nationality",
    ],
    ...(isUaeResident
      ? {
          2: [
            "nationality",
            "emiratesIDNumber",
            "emiratesIDIssueDate",
            "emiratesIDExpiryDate",
            "emiratesIDFront",
            "emiratesIDBack",
            "residencyIqama",
          ],
        }
      : {}),
    [isUaeResident ? 3 : 2]: [
      "isLicenseHolder",
      "licenseNumber",
      "LicenseImageFront",
      "LicenseImageBack",
      "licenseIssueDate",
      "licenseExpiryDate",
    ],
    [isUaeResident ? 4 : 3]: [
      "passportNumber",
      "passportIssueDate",
      "passportExpiryDate",
      "passportCopy",
      "visaApplied",
      "IsValidWorkVisa",
    ],
    [isUaeResident ? 5 : 4]: [
      "referralName",
      "referralPhone",
      "referralAddress",
    ],
  };

  const handleTabChange = async (event, newValue) => {
    if (newValue < activeTab) {
      setActiveTab(newValue);
      return;
    }

    if (newValue > activeTab + 1) {
      return;
    }

    const currentTabFields = stepFields[activeTab];
    const isValid = await trigger(currentTabFields);

    if (isValid) {
      setActiveTab(newValue);
    } else {
      alert("Please fill all required fields in current tab");
    }
  };

  // handleNext --- 0005
  const handleNext = async () => {
    const currentTabFields = stepFields[activeTab];
    const isValid = await trigger(currentTabFields);

    if (!isValid) {
      console.log("Validation errors:", methods.formState.errors);
      return;
    }

    // Prepare data for each tab
    const tabActions = {
      0: () => {
        console.log("TAB___ General Tab Data");

        const formData = new FormData();
        formData.append("Image", watch("profileImage"));

        // const profileImage = watch("profileImage");
        // if (profileImage instanceof File) {
        //   formData.append("Image", profileImage);
        // } else if (typeof profileImage === "string") {
        //   console.log(
        //     "Profile image is a URL, not a File. Ensure proper handling."
        //   );
        // }

        // if (typeof profileImage === "string") {
        //   formData.append("ImageURL", profileImage); // Use a separate key for URLs
        // } else if (profileImage instanceof File) {
        //   formData.append("Image", profileImage);
        // }

        formData.append("CampaignId", watch("campaignName"));
        formData.append("ResidentialStatus", watch("residency"));
        formData.append("FullName", watch("fullName"));
        formData.append("GenderId", watch("gender"));
        formData.append("EmploymentStatus", watch("employeeStatus"));
        formData.append("WorkingCountryId", watch("workingCountry"));
        formData.append("WorkingStateId", watch("workingState"));
        formData.append("WorkingCityId", watch("workingCity"));
        formData.append("InterestedPlatformId", watch("interestedplatform"));
        formData.append("LearnAboutForm", watch("learnedFrom"));
        formData.append(
          "IsNOC",
          watch("companyprovideNOC") === "Yes" ? true : false
        );
        formData.append("Status", 7);

        if (proceedDetails !== null) {
          formData.append("UpdatedBy", UserData?.Id);
          formData.append("Id", proceedDetails?.id);
          dispatch(UpdateApplicantGeneraInfo(formData));
        } else {
          formData.append("CreatedBy", UserData?.Id);
          dispatch(CreateApplicantGeneraInfo(formData));
        }
      },
      1: () => {
        console.log("TAB___ Contact Tab Data");

        const params = {
          email: watch("email"),
          contactNumber: watch("phoneNumber"),
          whatsAppNo: watch("whatsappNumber"),
          currentCountryId: isUaeResident
            ? watch("workingCountry")
            : watch("currentCountryResidence"),
          nationality: watch("nationality"),
          updatedBy: UserData?.Id,
          status: 7,

          id: createGeneralInfo?.id,
          residentialStatus: createGeneralInfo?.residentialStatus,
        };
        dispatch(UpdateApplicantContactInfo(params));
      },
      2: () => {
        if (isUaeResident) {
          console.log("TAB___ Emirates Tab Data");
          console.log("TAB___isUaeResident", isUaeResident);

          const formData = new FormData();
          formData.append("Nationality", watch("nationality"));
          formData.append("EmiratesId", watch("emiratesIDNumber"));
          formData.append("EmiratesIdIssueDate", watch("emiratesIDIssueDate"));
          formData.append(
            "EmiratesIdExpiryDate",
            watch("emiratesIDExpiryDate")
          );
          formData.append("EmiratesIdImageFront", watch("emiratesIDFront"));
          formData.append("EmiratesIdImageBack", watch("emiratesIDBack"));
          formData.append("IqamaDocImage", watch("residencyIqama"));
          formData.append("UpdatedBy", UserData?.Id);
          formData.append("Id", createGeneralInfo?.id);
          formData.append("Status", 7);
          dispatch(UpdateApplicantEmiratesInfo(formData));
          // .then((res) => {
          //   if (res?.meta?.requestStatus === "fulfilled") {
          // dispatch(updateEmployeeSuccess());
          //   }
          // });
        } else {
          console.log("TAB___ Driving License Tab Data");

          const formData = new FormData();
          formData.append("DrivingLicenseHolder", watch("isLicenseHolder"));
          formData.append("DrivingLicenseNo", watch("licenseNumber"));
          formData.append("LicenseImageFront", watch("LicenseImageFront"));
          formData.append("LicenseImageBack", watch("LicenseImageBack"));
          formData.append("LicenseIssueDate", watch("licenseIssueDate"));
          formData.append("LicenseExpiryDate", watch("licenseExpiryDate"));
          formData.append(
            "ResidentialStatus",
            createGeneralInfo?.residentialStatus
          );
          formData.append("UpdatedBy", UserData?.Id);
          formData.append("Id", createGeneralInfo?.id);
          formData.append("Status", 7);
          dispatch(UpdateApplicantLicenseInfo(formData));
        }
      },
      3: () => {
        if (isUaeResident) {
          console.log("TAB___ Driving License Tab Data");
          console.log("TAB___isUaeResident", isUaeResident);

          const formData = new FormData();
          formData.append("DrivingLicenseHolder", watch("isLicenseHolder"));
          formData.append("DrivingLicenseNo", watch("licenseNumber"));
          formData.append("LicenseImageFront", watch("LicenseImageFront"));
          formData.append("LicenseImageBack", watch("LicenseImageBack"));
          formData.append("LicenseIssueDate", watch("licenseIssueDate"));
          formData.append("LicenseExpiryDate", watch("licenseExpiryDate"));
          formData.append(
            "ResidentialStatus",
            createGeneralInfo?.residentialStatus
          );
          formData.append("UpdatedBy", UserData?.Id);
          formData.append("Id", createGeneralInfo?.id);
          formData.append("Status", 7);
          dispatch(UpdateApplicantLicenseInfo(formData));
        } else {
          console.log("TAB___ Passport Details Tab Data");

          const formData = new FormData();
          formData.append("PassportNo", watch("passportNumber"));
          formData.append("PassportIssueDate", watch("passportIssueDate"));
          formData.append("PassportExpiryDate", watch("passportExpiryDate"));
          formData.append("PassportImage", watch("passportCopy"));
          formData.append("IsVisaApplied", isActive);
          formData.append(
            "IsValidWorkVisa",
            watch("IsValidWorkVisa") === "Yes" ? true : false
          );
          formData.append(
            "ResidentialStatus",
            createGeneralInfo?.residentialStatus
          );
          formData.append("UpdatedBy", UserData?.Id);
          formData.append("Id", createGeneralInfo?.id);
          formData.append("Status", 7);

          dispatch(UpdateApplicantPassportInfo(formData));
        }
      },
      4: () => {
        if (isUaeResident) {
          console.log("TAB___ Passport Details Tab Data");
          console.log("TAB___isUaeResident", isUaeResident);

          const formData = new FormData();
          formData.append("PassportNo", watch("passportNumber"));
          formData.append("PassportIssueDate", watch("passportIssueDate"));
          formData.append("PassportExpiryDate", watch("passportExpiryDate"));
          formData.append("PassportImage", watch("passportCopy"));
          formData.append("IsVisaApplied", isActive);
          formData.append(
            "IsValidWorkVisa",
            watch("IsValidWorkVisa") === "Yes" ? true : false
          );
          formData.append(
            "ResidentialStatus",
            createGeneralInfo?.residentialStatus
          );
          formData.append("UpdatedBy", UserData?.Id);
          formData.append("Id", createGeneralInfo?.id);
          formData.append("Status", 7);

          dispatch(UpdateApplicantPassportInfo(formData));
        } else {
          console.log("TAB___ Referral Tab Data");
        }
      },
      5: () => {
        if (isUaeResident) {
          console.log("TAB___ Referral Tab Data");
        }
      },
    };

    // Prepare data for each tab
    // const tabActions = {
    //   0: () => {
    //     console.log("TAB___General");
    //   },
    //   1: () => {
    //     console.log("TAB___Contact");
    //   },
    //   2: () => {
    //     if (isUaeResident) {
    //       console.log("TAB___Emirates");
    //     } else {
    //       console.log("TAB___Driving");
    //     }
    //   },
    //   3: () => {
    //     if (isUaeResident) {
    //       console.log("TAB___Driving");
    //     } else {
    //       console.log("TAB___Passport");
    //     }
    //   },
    //   4: () => {
    //     if (isUaeResident) {
    //       console.log("TAB___Passport");
    //     } else {
    //       console.log("TAB___Referral");
    //     }
    //   },
    //   5: () => {
    //     if (isUaeResident) {
    //       console.log("TAB___Referral");
    //     }
    //   },
    // };

    // Execute the corresponding action for the current tab
    tabActions[activeTab]?.();

    // Move to the next tab if validation passes
    if (activeTab < tabs.length - 1) {
      setActiveTab((prev) => prev + 1);
    } else {
      console.log("TAB___ Reached the last tab");
    }
  };

  const onSubmit = (data) => {
    console.log("data", data);

    const referralData = {
      referralBy: data?.referralName,
      referralContactNumber: data?.referralPhone,
      referralAddress: data?.referralAddress,
      updatedBy: UserData?.Id,
      id: createGeneralInfo?.id,
      status: 10,
    };

    dispatch(UpdateApplicantUpdateReferralInfo(referralData)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        handleCloseModal();
        reset();
      }
    });
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
              isUaeResident={isUaeResident}
              disabled={!methods.formState.isValid}
            />

            <CustomTabPanel value={activeTab} index={0}>
              <GeneralInfo
                control={methods.control}
                isUaeResident={isUaeResident}
                proceedDetails={proceedDetails}
                createGeneralInfo={createGeneralInfo}
              />
            </CustomTabPanel>

            <CustomTabPanel value={activeTab} index={1}>
              <ContactResidence
                control={methods.control}
                error={methods?.formState?.errors}
                isUaeResident={isUaeResident}
                proceedDetails={proceedDetails}
              />
            </CustomTabPanel>

            {isUaeResident && (
              <CustomTabPanel value={activeTab} index={2}>
                <EmiratesID
                  control={methods.control}
                  isUaeResident={isUaeResident}
                  proceedDetails={proceedDetails}
                />
              </CustomTabPanel>
            )}

            <CustomTabPanel value={activeTab} index={isUaeResident ? 3 : 2}>
              <DrivingLicense
                control={methods.control}
                isUaeResident={isUaeResident}
                proceedDetails={proceedDetails}
              />
            </CustomTabPanel>

            <CustomTabPanel value={activeTab} index={isUaeResident ? 4 : 3}>
              <PassportDetails
                control={methods.control}
                isUaeResident={isUaeResident}
                proceedDetails={proceedDetails}
                isActive={isActive}
                setIsActive={setIsActive}
              />
            </CustomTabPanel>

            <CustomTabPanel value={activeTab} index={isUaeResident ? 5 : 4}>
              <Referral
                control={methods.control}
                isUaeResident={isUaeResident}
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
              {activeTab === tabs.length - 1 ? (
                <CustomButton type="submit" variant="contained">
                  Save
                </CustomButton>
              ) : (
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
                  <CustomButton
                    type="button"
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<DoneIcon sx={{ width: "15px" }} />}
                  >
                    Next
                  </CustomButton>
                </Box>
              )}
            </Box>
          </form>
        </FormProvider>
      </Paper>
    </LocalizationProvider>
  );
}
