import * as Yup from "yup";

export const incompleteProfileSchema = Yup.object({
  BasicInfo: Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    gender: Yup.string()
      .oneOf(["male", "female", "other"], "Please select a valid gender")
      .required("Gender is required"),
    dob: Yup.date()
      .typeError("Please enter a valid date") // This will show if the date is invalid
      .required("DOB is required"),

    religion: Yup.string()
      .oneOf(
        ["islam", "christianity", "hindu", "other"],
        "Please select a one of the religion"
      )
      .required("Religion is required"),
    nationality: Yup.string()
      .oneOf(
        ["uae", "india", "usa", "other"],
        "Please select either Pakistan or Indian"
      )
      .required("Nationality is required for non-UAE residents"),

    maritalStatus: Yup.string()
      .oneOf(
        ["single", "married", "divorced"],
        "Please select a valid marital status"
      )
      .required("Marital status is required"),
    employmentType: Yup.string()
      .oneOf(
        ["employed", "self-employed", "unemployed"],
        "Please select a valid employment type"
      )
      .required("Employment type is required"),
  }),
  ContactResidence: Yup.object({
    email: Yup.string()
      .email("Please enter vaild email")
      .required("Email is required"),
    eContactRelation: Yup.string().required("Relation is required"),
    country: Yup.string()
      .oneOf(["usa", "india", "uae"], "Please select vaild value in dropdown")
      .required("Country name is required for non-UAE residents"),
    city: Yup.string()
      .oneOf(
        ["dubai", "abu-dhabi", "sharjah"],
        "Please select vaild value in dropdown"
      )
      .required("City name is required "),
    phoneNumber: Yup.object({
      countryCode: Yup.string().required("Country code is required"),
      number: Yup.string()
        .required("Phone number is required")
        .matches(/^\d+$/, "Please enter numbers only")
        // .matches(/^\d{3} \d{3} \d{4}$/, 'Number must be in the format XXX XXX XXXX')
        .required("Phone number is required"),
    }),
    eContactNo: Yup.object({
      countryCode: Yup.string().required("Country code is required"),
      number: Yup.string()
        .required("Phone number is required")
        .matches(/^\d+$/, "Please enter numbers only")
        // .matches(/^\d{3} \d{3} \d{4}$/, 'Number must be in the format XXX XXX XXXX')
        .required("Phone number is required"),
    }),
  }),
  EmiratesId: Yup.object({
    emiratesId: Yup.string().required("Emirates ID is requried "),
    eIdIssueDate: Yup.date()
      .nullable()
      .typeError("Emirates ID Issue Date  is not valid")
      .required("Emirates ID Issue Date is required"),

    eIdExpiryDate: Yup.date()
      .nullable()
      .typeError("Emirates ID Expiry Date  is not valid")
      .min(
        Yup.ref("eIdIssueDate"),
        "Emirates ID expiry date can't be before Issue Date"
      )
      .required("Emirates ID Expiry Date is required"),
    eIdCopyFront: Yup.mixed()
      .required("Emirates ID front copy is required")
      .test("fileSize", "File size is too large", (value) => {
        if (!value) return true; // Let required handle null/undefined
        return value.size <= 5000000; // 5MB limit
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "application/pdf"].includes(
          value.type
        );
      }),
    eIdCopyBack: Yup.mixed()
      .required("Emirates ID back copy is required")
      .test("fileSize", "File size is too large", (value) => {
        if (!value) return true;
        return value.size <= 5000000;
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "application/pdf"].includes(
          value.type
        );
      }),
  }),
  DrivingLicense: Yup.object({
    licenseNo: Yup.string().required("License number is required"),
    licenseIssueDate: Yup.date()
      .nullable()
      .typeError("License Issue Date is not valid")
      .required("License Issue Date is required"),
    licenseExpiryDate: Yup.date()
      .nullable()
      .typeError("License Expiry Date is not valid")
      .min(
        Yup.ref("licenseIssueDate"),
        "License expiry date can't be before Issue Date"
      )
      .required("License Expiry Date is required"),
    licenseCopyFront: Yup.mixed()
      .required("License front copy is required")
      .test("fileSize", "File size is too large", (value) => {
        if (!value) return true;
        return value.size <= 5000000; // 5MB limit
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "application/pdf"].includes(
          value.type
        );
      }),
    licenseCopyBack: Yup.mixed()
      .required("License back copy is required")
      .test("fileSize", "File size is too large", (value) => {
        if (!value) return true;
        return value.size <= 5000000;
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "application/pdf"].includes(
          value.type
        );
      }),
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
    passportCopy: Yup.mixed()
      .required("Passport copy is required")
      .test("fileSize", "File size is too large", (value) => {
        if (!value) return true;
        return value.size <= 5000000; // 5MB limit
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "application/pdf"].includes(
          value.type
        );
      }),
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
    uaeResidencyIqama: Yup.mixed()
      .required("UAE Residency/Iqama copy is required")
      .test("fileSize", "File size is too large", (value) => {
        if (!value) return false;
        return value.size <= 5000000;
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return false;
        return ["image/jpeg", "image/png", "application/pdf"].includes(
          value.type
        );
      })
      .test("required", "UAE Residency/Iqama copy is required", (value) => {
        return value !== null && value !== undefined;
      }),
    companyName: Yup.string()
      .oneOf(
        ["al-busayra", "taj-global", "bin-xyz"],
        "Please select a valid company"
      )
      .required("Company name is required"),
    companyLocation: Yup.string()
      .oneOf(
        ["dubai", "abu-dhabi", "sharjah"],
        "Please select a valid location"
      )
      .required("Company location is required"),
    visaType: Yup.string()
      .oneOf(["own", "company"], "Please select a valid visa type")
      .required("Visa type is required"),
    visaAppliedVia: Yup.string()
      .oneOf(
        ["abds-dubai", "abds-sharjah", "ahds-dubai"],
        "Please select a valid visa application source"
      )
      .required("Visa application source is required"),
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
    passportHandOver: Yup.string()
      .oneOf(["yes", "no"], "Please select yes or no")
      .required("Please select if passport is handed over"),
    passportTakerName: Yup.string().when("passportHandOver", {
      is: (val) => val === "yes",
      then: (schema) => schema.required("Representative name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    passportPicture: Yup.mixed()
      .required("Passport picture is required")
      .test("fileSize", "File size is too large", (value) => {
        if (!value) return true;
        return value.size <= 5000000; // 5MB limit
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "application/pdf"].includes(
          value.type
        );
      }),
    rtaTraining: Yup.string()
      .oneOf(["yes", "no"], "Please select yes or no")
      .required("Please select RTA training status"),
    empOwnership: Yup.string()
      .oneOf(["own", "4pl"], "Please select a valid ownership type")
      .required("EMP ownership is required"),
    vendor: Yup.string()
      .oneOf(
        ["taj-global", "bin-abc", "bin-xyz"],
        "Please select a valid vendor"
      )
      .required("Vendor is required"),
    empStatus: Yup.string()
      .oneOf(["active", "inactive"], "Please select a valid status")
      .required("EMP status is required"),
  }),
});
