import * as Yup from "yup";

const FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const applicantFormSchema = Yup.object().shape({
  profileImage: Yup.mixed().required("Profile image is required"),
  // .test("fileSize", "File size is too large", (value) => {
  //   if (!value) return true; // Let required handle empty
  //   return value && value.size <= FILE_SIZE;
  // })
  // .test("fileFormat", "Unsupported file format", (value) => {
  //   if (!value) return true; // Let required handle empty
  //   return value && SUPPORTED_FORMATS.includes(value.type);
  // })
  // .test(
  //   "fileDimensions",
  //   "Image dimensions must be at least 200x200px",
  //   async (value) => {
  //     if (!value) return true; // Let required handle empty
  //     if (!value.type.startsWith("image/")) return true;

  //     return new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(value);
  //       reader.onload = (e) => {
  //         const img = new Image();
  //         img.src = e.target.result;
  //         img.onload = () => {
  //           const { width, height } = img;
  //           resolve(width >= 200 && height >= 200);
  //         };
  //         img.onerror = () => resolve(false);
  //       };
  //     });
  //   }
  // ),
  campaignName: Yup.string().required("Campaign Name is required"),
  residency: Yup.string().required("Residency status is required"),
  fullName: Yup.string().required("Full Name is required"),
  gender: Yup.string().required("Gender is required"),
  employeeStatus: Yup.string().required("Employment Status is required"),
  workingCountry: Yup.string().required(
    "Preferred Working Country is required"
  ),
  workingState: Yup.string().required("Preferred Working State is required"),
  workingCity: Yup.string().required("Preferred Working City is required"),

  interestedplatform: Yup.string().when("residency", (residency, schema) =>
    residency === "UAE Resident"
      ? schema.required("Interested platform is required for UAE residents")
      : schema.notRequired()
  ),
  learnedFrom: Yup.string().required(
    "Please specify how you learned about this form"
  ),
  companyprovideNOC: Yup.string().when("residency", (residency, schema) =>
    residency === "UAE Resident"
      ? schema.required("This field is required for UAE residents")
      : schema.notRequired()
  ),

  // Contact & Residence fields
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string().required("phoneNumber is required"),
  whatsappNumber: Yup.string().required("whatsappNumber is required"),
  // phoneNumber: Yup.object().shape({
  //   countryCode: Yup.string()
  //     .matches(/^\+\d{1,3}$/, "Country code must be in the format +XX or +XXX")
  //     .required("Country code is required"),
  //   number: Yup.string()
  //     // .matches(/^\d{3} \d{3} \d{4}$/, 'Number must be in the format XXX XXX XXXX')
  //     .required("Phone number is required"),
  // }),
  // whatsappNumber: Yup.object().shape({
  //   countryCode: Yup.string().matches(
  //     /^\+\d{1,3}$/,
  //     "Country code must be in the format +XX or +XXX"
  //   ),
  //   number: Yup.string().notRequired(),
  // }),
  currentCountryResidence: Yup.string().when("residency", (residency, schema) =>
    residency != "resident"
      ? schema.notRequired()
      : schema.required("Current country is required for non-UAE residents")
  ),

  nationality: Yup.string().when("residency", (residency, schema) =>
    residency != "resident"
      ? schema.notRequired()
      : schema.required("Current country is required for non-UAE residents")
  ),
  emiratesIDNumber: Yup.string().when("residency", (residency, schema) =>
    residency != "resident"
      ? schema.notRequired()
      : schema.required("Emirates ID number is required")
  ),
  emiratesIDIssueDate: Yup.date()
    .nullable()
    .typeError("Emirates ID Issue Date  is not valid")
    .required("Emirates ID Issue Date is required"),

  emiratesIDExpiryDate: Yup.date()
    .nullable()
    .typeError("Emirates ID Expiry Date  is not valid")
    .required("Emirates ID Expiry Date is required"),
  emiratesIDFront: Yup.mixed().when("residency", (residency, schema) =>
    residency === "resident"
      ? schema
          .required("Emirates ID front scan is required")
          .test("fileType", "Only PDF files are allowed", (value) => {
            if (!value) return true; // Let required handle empty
            return value && value.type === "application/pdf";
          })
          .test("fileSize", "File must be less than 5MB", (value) => {
            if (!value) return true; // Let required handle empty
            return value && value.size <= 5000000;
          })
      : schema
  ),
  emiratesIDBack: Yup.mixed().when("residency", (residency, schema) =>
    residency === "resident"
      ? schema
          .required("Emirates ID back scan is required")
          .test("fileType", "Only PDF files are allowed", (value) => {
            if (!value) return true;
            return value && value.type === "application/pdf";
          })
          .test("fileSize", "File must be less than 5MB", (value) => {
            if (!value) return true;
            return value && value.size <= 5000000;
          })
      : schema
  ),
  residencyIqama: Yup.mixed().when("residency", (residency, schema) =>
    residency === "resident"
      ? schema
          .required("Residency/Iqama scan is required")
          .test("fileType", "Only PDF files are allowed", (value) => {
            if (!value) return true;
            return value && value.type === "application/pdf";
          })
          .test("fileSize", "File must be less than 5MB", (value) => {
            if (!value) return true;
            return value && value.size <= 5000000;
          })
      : schema
  ),

  // Driving License fields
  isLicenseHolder: Yup.string().required(
    "Please specify if you hold a driving license"
  ),
  licenseNumber: Yup.string().when(
    "isLicenseHolder",
    (isLicenseHolder, schema) =>
      isLicenseHolder
        ? schema.required("License number is required for license holders")
        : schema
  ),
  licenseIssueDate: Yup.date()
    .nullable()
    .typeError("license Issue Date  is not valid")
    .required("license Issue Date is required"),
  licenseExpiryDate: Yup.date()
    .nullable()
    .typeError("license Expiry Date is not valid")
    .min(
      Yup.ref("licenseIssueDate"),
      "license Expiry Date can't be before license Issue Date"
    )
    .required("license Expiry Date is required"),
  // LicenseImageFront: Yup.string().nullable().required("Document is required"),
  // LicenseImageBack: Yup.string().nullable().required("Document is required"),

  // Passport Details fields
  passportNumber: Yup.string().required("Passport number is required"),

  passportIssueDate: Yup.date()
    .nullable()
    .typeError("Passport Issue Date  is not valid")
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
  // IsValidWorkVisa: Yup.string().required("field is required"),
  visaApplied: Yup.boolean().required(
    "Please specify if you have applied for a visa"
  ),

  // Referral fields
  referralName: Yup.string().required("Referral name is required"),
  referralPhone: Yup.string().required("Referral name is required"),
  // referralPhone: Yup.object().shape({
  //   countryCode: Yup.string()
  //     .matches(/^\+\d{1,3}$/, "Country code must be in the format +XX or +XXX")
  //     .required("Country code is required"),
  //   number: Yup.string()
  //     // .matches(/^\d{3} \d{3} \d{4}$/, 'Number must be in the format XXX XXX XXXX')
  //     .required("Phone number is required"),
  // }),

  referralAddress: Yup.string().required("Referral address is required"),
});
