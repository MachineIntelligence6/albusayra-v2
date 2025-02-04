"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { UserData } from "@/configs/UseApi";
import { useDispatch, useSelector } from "react-redux";
import { GenericGetProductCategoryDropdown } from "@/redux/reducers/dataBank/dataBankThunk";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import { inCompleteEmployeeFormTab } from "@/utils/hard-data/inCompleteEmployeeFormTab";
import { ApplicantGetById } from "@/redux/reducers/applicants/applicantThunk";
import {
  EmployeeGetByIdEmiratesHistory,
  EmployeeGetByIdInsuranceHistory,
  EmployeeGetByIdLicenseHistory,
  EmployeeGetByIdPassportHistory,
  EmployeeGetByIdVisaHistory,
  UpdateFinalContactInfo,
  UpdateFinalEmiratesInfo,
  UpdateFinalGeneralInfo,
  UpdateFinalInsuranceInfo,
  UpdateFinalLicenseInfo,
  UpdateFinalOtherDetailsInfo,
  UpdateFinalPassportInfo,
  UpdateFinalVisaInfo,
} from "@/redux/reducers/employees/employeeThunk";
import AddInCompleteEmployeeForm from "./forms";
import IncompleteEmployeeTableWrapper from "./view-employee/IncompleteEmployeeTableWrapper";

const defaultStates = {
  BasicInfo: {
    fullName: "",
    gender: "",
    dob: null,
    religion: "",
    nationality: "",
    maritalStatus: "",
    employeeStatus: "",
    image: null,
  },
  ContactResidence: {
    email: "",
    phoneNumber: "",
    eContactRelation: "",
    eContactNo: "",
    country: "",
    city: "",
  },
  EmiratesId: {
    emiratesId: "",
    eidIssueDate: "",
    eidExpiryDate: "",
    eidCopyFront: null,
    eidCopyBack: null,
  },
  DrivingLicense: {
    licenseNumber: "",
    licenseIssueDate: "",
    licenseExpiryDate: "",
    licenseCopyFront: null,
    licenseCopyBack: null,
  },
  Passport: {
    passportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    passportCopy: null,
  },
  Visa: {
    uaeResidencyIqamaNo: "",
    visaIssueDate: "",
    visaExpiryDate: "",
    uaeResidencyIqama: "",
    companyName: "",
    companyLocation: "",
    visaType: "",
    visaAppliedVia: "",
  },
  Insurance: {
    medicalInsurance: "",
    miStartDate: "",
    miEndDate: "",
    accidentalInsurance: "",
    aiStartDate: "",
    aiEndDate: "",
  },
  OtherDetails: {
    passportHandOver: "",
    passportTakerName: "",
    passportPicture: null,
    rtaTraining: "",
    empOwnerShip: "",
    empStatus: "",
    vendor: "",
  },
};
const InCompleteEmployee = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formtabs, setFormTabs] = useState(inCompleteEmployeeFormTab);
  const [selectedTab, setSelectedTab] = useState(inCompleteEmployeeFormTab[0]);
  const [formData, setFormData] = useState(defaultStates); // State to store data for all steps
  const searchParams = useSearchParams();
  // tab param
  const tabParam = searchParams.get("tab");
  useEffect(() => {
    if (tabParam) {
      const activeTab = inCompleteEmployeeFormTab.find(
        (tab) => tab.id === tabParam
      );
      if (activeTab) {
        handleActiveFormTab(activeTab);
      }
    }
  }, [tabParam]);
  const editMode = searchParams.get("id");
  useEffect(() => {
    if (editMode) {
      const param = { id: editMode };
      dispatch(ApplicantGetById(param));
    }
  }, [editMode, dispatch]);
  const editData = useSelector(
    (state) => state?.applicantSlice?.proceedDetails
  );
  useEffect(() => {
    dispatch(GenericGetProductCategoryDropdown({ statuses: 1 }));
  }, [dispatch]);

  const formSchema = Yup.object({
    BasicInfo: Yup.object().shape({
      fullName: Yup.string().required("Full name is required"),
      gender: Yup.string().required("Gender is required"),
      dob: Yup.string().required("DOB is required"),
      religion: Yup.string().required("Religion is required"),
      nationality: Yup.string().required("Nationality is required"),
      maritalStatus: Yup.string().required("Marital status is required"),
      employmentType: Yup.string().required("Employment type is required"),
    }),
    ContactResidence: Yup.object({
      email: Yup.string()
        .email("Please enter vaild email")
        .required("Email is required"),
      eContactRelation: Yup.string().required("Relation is required"),
      country: Yup.string().required(
        "Country name is required for non-UAE residents"
      ),
      city: Yup.string().required("City name is required "),
      phoneNumber: Yup.string().required("Contact number is required"),
      eContactNo: Yup.string().required("Emergency Contact number is required"),
    }),
    EmiratesId: Yup.object({
      emiratesId: Yup.string().required("Emirates ID is required"),
      eIdIssueDate: Yup.date()
        .typeError("Emirates ID Issue Date must be a valid date")
        .required("Emirates ID Issue Date is required"),
      eIdExpiryDate: Yup.date()
        .typeError("Emirates ID Expiry Date must be a valid date")
        .required("Emirates ID Expiry Date is required")
        .test(
          "isAfterIssueDate",
          "Emirates ID Expiry Date can't be before Issue Date",
          function (value) {
            const { eIdIssueDate } = this.parent;
            return value && eIdIssueDate ? value >= eIdIssueDate : true;
          }
        ),
      eIdCopyFront: Yup.mixed().required("Emirates ID front copy is required"),
      eIdCopyBack: Yup.mixed().required("Emirates ID back copy is required"),
    }),
    DrivingLicense: Yup.object({
      licenseNo: Yup.string().required("License number is required"),
      licenseIssueDate: Yup.date()
        .typeError("License Issue Date is not valid")
        .required("License Issue Date is required"),
      licenseExpiryDate: Yup.date()
        .typeError("License Expiry Date is not valid")
        .required("License Expiry Date is required")
        .test(
          "isAfterIssueDate",
          "License ExpiryDate can't be before Issue Date",
          function (value) {
            const { licenseIssueDate } = this.parent;
            return value && licenseIssueDate ? value >= licenseIssueDate : true;
          }
        ),
      licenseExpiryDate: Yup.date()
        .typeError("License Expiry Date is not valid")
        .min(
          Yup.ref("licenseIssueDate"),
          "License expiry date can't be before Issue Date"
        )
        .required("License Expiry Date is required"),
      licenseCopyFront: Yup.mixed().required("License front copy is required"),
      licenseCopyBack: Yup.mixed().required("License back copy is required"),
    }),
    Passport: Yup.object({
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
          "Passport expiry date can't be before Issue Date"
        )
        .required("Passport Expiry Date is required"),
      passportCopy: Yup.mixed().required("Passport copy is required"),
    }),
    Visa: Yup.object({
      uaeResidencyIqamaNo: Yup.string().required(
        "UAE Residency/Iqama number is required"
      ),
      visaIssueDate: Yup.date()
        .nullable()
        .typeError("Visa Issue Date is not valid")
        .required("Visa Issue Date is required"),
      visaExpiryDate: Yup.date()
        .nullable()
        .typeError("Visa Expiry Date is not valid")
        .min(
          Yup.ref("visaIssueDate"),
          "Visa expiry date can't be before Issue Date"
        )
        .required("Visa Expiry Date is required"),
      uaeResidencyIqama: Yup.mixed().required(
        "UAE Residency/Iqama copy is required"
      ),
      companyName: Yup.string().required("Company name is required"),
      companyLocation: Yup.string().required("Company location is required"),
      visaType: Yup.string().required("Visa type is required"),
      visaAppliedVia: Yup.string().when("visaType", {
        is: (value) => value !== "Own Visa", // When visaType is not "Own Visa"
        then: (schema) =>
          schema.required("Visa application source is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    Insurance: Yup.object({
      medicalInsurance: Yup.string().required(
        "Medical Insurance number is required"
      ),
      miStartDate: Yup.date()
        .nullable()
        .typeError("Medical Insurance Start Date is not valid")
        .required("Medical Insurance Start Date is required"),
      miEndDate: Yup.date()
        .nullable()
        .typeError("Medical Insurance End Date is not valid")
        .min(
          Yup.ref("miStartDate"),
          "Medical Insurance End Date can't be before Start Date"
        )
        .required("Medical Insurance End Date is required"),
      accidentalInsurance: Yup.string().required(
        "Accidental Insurance number is required"
      ),
      aiStartDate: Yup.date()
        .nullable()
        .typeError("Accidental Insurance Start Date is not valid")
        .required("Accidental Insurance Start Date is required"),
      aiEndDate: Yup.date()
        .nullable()
        .typeError("Accidental Insurance End Date is not valid")
        .min(
          Yup.ref("aiStartDate"),
          "Accidental Insurance End Date can't be before Start Date"
        )
        .required("Accidental Insurance End Date is required"),
    }),
    OtherDetails: Yup.object().shape({
      passportHandOver: Yup.string().required(
        "Please select if passport is handed over"
      ),
      passportTakerName: Yup.string().when("passportHandOver", {
        is: (val) => val === "yes",
        then: (schema) => schema.required("Representative name is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      passportPicture: Yup.mixed().required("Passport picture is required"),
      rtaTraining: Yup.string().required("Please select RTA training status"),
      empOwnership: Yup.string().required("EMP ownership is required"),
      vendor: Yup.string().when("empOwnership", {
        is: (value) => value !== "Own",
        then: (schema) => schema.required("Vendor is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      empStatus: Yup.string()
        .oneOf(["1", "2"], "Please select a valid status")
        .required("EMP status is required"),
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
        BasicInfo: {
          image: editData.image,
          fullName: editData.fullName || "",
          gender: editData.genderId || "",
          dob: editData.dob ? moment(editData.dob).format("YYYY-MM-DD") : "",
          religion: editData.religion || "",
          nationality: editData.nationality || "",
          maritalStatus: editData.maritalStatus || "",
          employmentType: editData.employmentType || "",
        },
        ContactResidence: {
          email: editData.email || "",
          eContactRelation: editData.emergencyRelation || "",
          country: editData.emergencyCountryId || "",
          city: editData.emergencyCityId || "",
          phoneNumber: editData.contactNumber || "",
          eContactNo: editData.emergencyContactNumber || "",
        },
        EmiratesId: {
          emiratesId: editData.emiratesId || "",
          eIdIssueDate: editData.emiratesIdIssueDate
            ? moment(editData.emiratesIdIssueDate).format("YYYY-MM-DD")
            : "",
          eIdExpiryDate: editData.emiratesIdExpiryDate
            ? moment(editData.emiratesIdExpiryDate).format("YYYY-MM-DD")
            : "",
          eIdCopyFront: editData.emiratesIdImageFront || "",
          eIdCopyBack: editData.emiratesIdImageBack || "",
        },
        DrivingLicense: {
          licenseNo: editData.drivingLicenseNo || "",
          licenseIssueDate: editData.licenseIssueDate
            ? moment(editData.licenseIssueDate).format("YYYY-MM-DD")
            : "",
          licenseExpiryDate: editData.licenseExpiryDate
            ? moment(editData.licenseExpiryDate).format("YYYY-MM-DD")
            : "",
          licenseCopyFront: editData.licenseImageFront || "",
          licenseCopyBack: editData.licenseImageBack || "",
        },
        Passport: {
          passportNumber: editData.passportNo || "",
          passportIssueDate: editData.passportIssueDate
            ? moment(editData.passportIssueDate).format("YYYY-MM-DD")
            : "",
          passportExpiryDate: editData.passportExpiryDate
            ? moment(editData.passportExpiryDate).format("YYYY-MM-DD")
            : "",
          passportCopy: editData.passportImage || "",
        },
        Visa: {
          uaeResidencyIqamaNo: editData.iqamaNo || "",
          visaIssueDate: editData.visaIssueDate
            ? moment(editData.visaIssueDate).format("YYYY-MM-DD")
            : "",
          visaExpiryDate: editData.visaExpiryDate
            ? moment(editData.visaExpiryDate).format("YYYY-MM-DD")
            : "",
          uaeResidencyIqama: editData.iqamaDocImage || "",
          companyName: editData.companyId || "",
          companyLocation: editData.companyLocationId || "",
          visaType: editData.visaType || "",
          visaAppliedVia: editData.visaAppliedCompanyId || "",
        },
        Insurance: {
          medicalInsurance: editData.medicalInsurance || "",
          miStartDate: editData.medicalStartDate
            ? moment(editData.medicalStartDate).format("YYYY-MM-DD")
            : "",
          miEndDate: editData.medicalEndDate
            ? moment(editData.medicalEndDate).format("YYYY-MM-DD")
            : "",
          accidentalInsurance: editData.accidentalInsurance || "",
          aiStartDate: editData.accidentalStartDate
            ? moment(editData.accidentalStartDate).format("YYYY-MM-DD")
            : "",
          aiEndDate: editData.accidentalEndDate
            ? moment(editData.accidentalEndDate).format("YYYY-MM-DD")
            : "",
        },
        OtherDetails: {
          passportHandOver: editData.isPassportHandover ? "true" : "false",
          passportTakerName: editData.handoverToName || "",
          passportCopy: editData.passportImage || "",
          rtaTraining: editData.isRTATraining ? "true" : "false",
          empOwnership: editData.empOwnership || 0,
          vendor: editData.vendorId || "",
          empStatus: editData.empStatus === 1 ? "1" : "2",
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

  const getFormSection = (tabText) => {
    const sectionMap = {
      "Basic Info": "BasicInfo",
      "Contact Residence": "ContactResidence",
      "Emirates ID": "EmiratesId",
      "Driving License": "DrivingLicense",
      Passport: "Passport",
      Visa: "Visa",
      Insurance: "Insurance",
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

    const editBasicInfoPayload = {
      Id: editMode,
      Image: updatedFormData.BasicInfo.image,
      FullName: updatedFormData.BasicInfo.fullName,
      GenderId: updatedFormData.BasicInfo.gender,
      DOB: updatedFormData.BasicInfo.dob,
      Religion: updatedFormData.BasicInfo.religion,
      Nationality: updatedFormData.BasicInfo.nationality,
      MaritalStatus: updatedFormData.BasicInfo.maritalStatus,
      EmploymentType: updatedFormData.BasicInfo.employmentType,
      UpdatedBy: UserData?.Id,
      Status: editMode ? editData.status : 11,
    };
    const editContactResidence = {
      Id: editMode,
      Email: updatedFormData.ContactResidence.email,
      ContactNumber: updatedFormData.ContactResidence.phoneNumber,
      EmergencyRelation: updatedFormData.ContactResidence.eContactRelation,
      EmergencyContactNumber: updatedFormData.ContactResidence.eContactNo,
      EmergencyCountryId: updatedFormData.ContactResidence.country,
      EmergencyCityId: updatedFormData.ContactResidence.city,
      UpdatedBy: UserData?.Id,
      Status: editMode ? editData.status : 11,
    };
    const editEmiratesIdPayload = {
      Id: editMode,
      EmiratesId: updatedFormData.EmiratesId.emiratesId,
      EmiratesIdIssueDate: updatedFormData.EmiratesId.eIdIssueDate,
      EmiratesIdExpiryDate: updatedFormData.EmiratesId.eIdExpiryDate,
      EmiratesIdImageFront: updatedFormData.EmiratesId.eIdCopyFront,
      EmiratesIdImageBack: updatedFormData.EmiratesId.eIdCopyBack,
      UpdatedBy: UserData?.Id,
      Status: editMode ? editData.status : 11,
    };
    const editDrivingLicensePayload = {
      Id: editMode,
      DrivingLicenseNo: updatedFormData.DrivingLicense.licenseNo,
      LicenseIssueDate: updatedFormData.DrivingLicense.licenseIssueDate,
      LicenseExpiryDate: updatedFormData.DrivingLicense.licenseExpiryDate,
      LicenseImageFront: updatedFormData.DrivingLicense.licenseCopyFront,
      LicenseImageBack: updatedFormData.DrivingLicense.licenseCopyBack,
      UpdatedBy: UserData?.Id,
      Status: editMode ? editData.status : 11,
    };
    const editPassportPayload = {
      Id: editMode,
      PassportNo: updatedFormData.Passport.passportNumber,
      PassportIssueDate: updatedFormData.Passport.passportIssueDate,
      PassportExpiryDate: updatedFormData.Passport.passportExpiryDate,
      PassportImage: updatedFormData.Passport.passportCopy,
      UpdatedBy: UserData?.Id,
      Status: editMode ? editData.status : 11,
    };
    const editVisaPayload = {
      Id: editMode,
      IqamaNo: updatedFormData.Visa.uaeResidencyIqamaNo,
      VisaIssueDate: updatedFormData.Visa.visaIssueDate,
      VisaExpiryDate: updatedFormData.Visa.visaExpiryDate,
      IqamaDocImage: updatedFormData.Visa.uaeResidencyIqama,
      CompanyId: updatedFormData.Visa.companyName,
      CompanyLocationId: updatedFormData.Visa.companyLocation,
      VisaType: updatedFormData.Visa.visaType,
      VisaAppliedCompanyId: updatedFormData.Visa.visaAppliedVia,
      UpdatedBy: UserData?.Id,
      Status: editMode ? editData.status : 11,
    };
    const editInsurancePayload = {
      Id: editMode,
      MedicalInsurance: updatedFormData.Insurance.medicalInsurance,
      MedicalStartDate: updatedFormData.Insurance.miStartDate,
      MedicalEndDate: updatedFormData.Insurance.miEndDate,
      AccidentalInsurance: updatedFormData.Insurance.accidentalInsurance,
      AccidentalStartDate: updatedFormData.Insurance.aiStartDate,
      AccidentalEndDate: updatedFormData.Insurance.aiEndDate,
      UpdatedBy: UserData?.Id,
      Status: editMode ? editData.status : 11,
    };
    const editOtherDetailsPayload = {
      Id: editMode,
      IsPassportHandover: updatedFormData.OtherDetails.passportHandOver
        ? true
        : false,
      HandoverToName: updatedFormData.OtherDetails.passportTakerName,
      PassportImage: updatedFormData.OtherDetails.passportCopy,
      IsRTATraining: updatedFormData.OtherDetails.rtaTraining ? true : false,
      EMPOwnership: updatedFormData.OtherDetails.empOwnership,
      EMPStatus: updatedFormData.OtherDetails.empStatus,
      VendorId: updatedFormData.OtherDetails.vendor,
      UpdatedBy: UserData?.Id,
      Status: 1,
    };
    if (selectedTab.id === "1") {
      dispatch(UpdateFinalGeneralInfo(editBasicInfoPayload)).then((res) => {
        if (res.payload.code === 200) {
          // Fetch updated data after successful update
          if (tabParam) {
            router.back();
          }
        }
      });
    } else if (selectedTab.id === "2") {
      dispatch(UpdateFinalContactInfo(editContactResidence)).then((res) => {
        if (res.payload.code === 200) {
          // Fetch updated data after successful update
          if (tabParam) {
            router.back();
          }
        }
      });
    } else if (selectedTab.id === "3") {
      dispatch(UpdateFinalEmiratesInfo(editEmiratesIdPayload)).then((res) => {
        if (res.payload.code === 200) {
          // Fetch updated data after successful update
          if (tabParam) {
            router.back();
          }
        }
      });
    } else if (selectedTab.id === "4") {
      dispatch(UpdateFinalLicenseInfo(editDrivingLicensePayload)).then(
        (res) => {
          if (res.payload.code === 200) {
            // Fetch updated data after successful update
            if (tabParam) {
              router.back();
            }
          }
        }
      );
    } else if (selectedTab.id === "5") {
      dispatch(UpdateFinalPassportInfo(editPassportPayload)).then((res) => {
        if (res.payload.code === 200) {
          // Fetch updated data after successful update
          if (tabParam) {
            router.back();
          }
        }
      });
    } else if (selectedTab.id === "6") {
      dispatch(UpdateFinalVisaInfo(editVisaPayload)).then((res) => {
        if (res.payload.code === 200) {
          // Fetch updated data after successful update
          if (tabParam) {
            router.back();
          }
        }
      });
    } else if (selectedTab.id === "7") {
      dispatch(UpdateFinalInsuranceInfo(editInsurancePayload)).then((res) => {
        if (res.payload.code === 200) {
          // Fetch updated data after successful update
          if (tabParam) {
            router.back();
          }
        }
      });
    } else if (selectedTab.id === "8") {
      dispatch(UpdateFinalOtherDetailsInfo(editOtherDetailsPayload)).then(
        (res) => {
          if (res.payload.code === 200) {
            // Fetch updated data after successful update
            if (tabParam) {
              router.back();
            }
          }
        }
      );
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
  useEffect(() => {
    const param = {
      id: editMode,
    };
    if (selectedTab.id === "3") {
      dispatch(EmployeeGetByIdEmiratesHistory(param));
    } else if (selectedTab.id === "4") {
      dispatch(EmployeeGetByIdLicenseHistory(param));
    } else if (selectedTab.id === "5") {
      dispatch(EmployeeGetByIdPassportHistory(param));
    } else if (selectedTab.id === "6") {
      dispatch(EmployeeGetByIdVisaHistory(param));
    } else if (selectedTab.id === "7") {
      dispatch(EmployeeGetByIdInsuranceHistory(param));
    }
  }, [dispatch, selectedTab]);
  const {
    GetByIdEmirates,
    GetByIdLicense,
    GetByIdPassport,
    GetByIdVisa,
    GetByIdInsurance,
  } = useSelector((state) => state?.employeeSlice);

  return (
    <Box>
      <Box>
        <AddInCompleteEmployeeForm
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
          tabParam={tabParam}
        />
      </Box>
      {selectedTab.id === "3" ? (
        <>
          <IncompleteEmployeeTableWrapper
            tableData={GetByIdEmirates}
            selectedTab={selectedTab}
          />
        </>
      ) : selectedTab.id === "4" ? (
        <>
          <IncompleteEmployeeTableWrapper
            tableData={GetByIdLicense}
            selectedTab={selectedTab}
          />
        </>
      ) : selectedTab.id === "5" ? (
        <>
          <IncompleteEmployeeTableWrapper
            tableData={GetByIdPassport}
            selectedTab={selectedTab}
          />
        </>
      ) : selectedTab.id === "6" ? (
        <>
          <IncompleteEmployeeTableWrapper
            tableData={GetByIdVisa}
            selectedTab={selectedTab}
          />
        </>
      ) : selectedTab.id === "7" ? (
        <>
          <IncompleteEmployeeTableWrapper
            tableData={GetByIdInsurance}
            selectedTab={selectedTab}
          />
        </>
      ) : null}
    </Box>
  );
};

export default InCompleteEmployee;
