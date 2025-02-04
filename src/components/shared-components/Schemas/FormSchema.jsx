import * as yup from "yup";
const phoneRegExp =
  /^(\+?\d{1,4})?\s?-?\s?(\d{3})\s?-?\s?(\d{3})\s?-?\s?(\d{4})$/;
export const formSchema = yup.object({
  // General Info
  campaignName: yup.string().required("Campaign name is required"),
  residency: yup.string().required("Residency status is required"),
  fullName: yup.string().required("Full name is required"),
  gender: yup.string().required("Gender is required"),
  employeeStatus: yup.string().required("Employee status is required"),
  workingCountry: yup.string().required("Working country is required"),
  workingCity: yup.string().required("Working city is required"),
  learnedFrom: yup.string().required("This field is required"),
  dob: yup.string().required("Date of Birth is required"),
  religion: yup.string().required("Religion is required"),
  maritalStatus: yup.string().required("Marital Status is required"),
  eContactRelation: yup
    .string()
    .required("Emergency contact relation is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),

  emiratesId: yup.string().required("Emirates ID is required"),
  eidIssueDate: yup.date().required("EID Issue Date is required"),
  eidExpiryDate: yup.date().required("EID Expiry Date is required"),
  eidCopyFront: yup.mixed().required("EID Copy Front is required"),
  eidCopyBack: yup.mixed().required("EID Copy Back is required"),

  eContactNo: yup
    .string()
    .matches(phoneRegExp, "Emergency contact number is not valid")
    .required("Emergency contact number is required"),
  // Contact & Residence
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  whatsappNumber: yup
    .string()
    .matches(phoneRegExp, "WhatsApp number is not valid"),
  currentCountry: yup.string().required("Current country is required"),
  nationality: yup.string().required("Nationality is required"),

  // Driving License
  isLicenseHolder: yup
    .string()
    .required("Please specify if you have a driving license"),
  licenseNumber: yup.string().when("isLicenseHolder", {
    is: "yes",
    then: yup.string().required("License number is required"),
  }),
  licenseIssueDate: yup.date().when("isLicenseHolder", {
    is: "yes",
    then: yup.date().required("Issue date is required"),
  }),
  licenseExpiryDate: yup.date().when("isLicenseHolder", {
    is: "yes",
    then: yup.date().required("Expiry date is required"),
  }),
  licenseNumber: yup.string().required("License number is required"),
  licenseIssueDate: yup.string().required("Issue date is required"),
  licenseExpiryDate: yup.string().required("Expiry date is required"),
  licenseCopyFront: yup
    .mixed()
    .required("Driving License Copy Front is required"),
  licenseCopyBack: yup
    .mixed()
    .required("Driving License Copy Back is required"),

  // Passport Details
  passportNumber: yup.string().required("Passport number is required"),
  passportIssueDate: yup.date().required("Passport issue date is required"),
  passportExpiryDate: yup.date().required("Passport expiry date is required"),
  passportCopy: yup.mixed().required("Passport copy is required"),
  visaApplied: yup.boolean(),

  // Visa Details

  uaeResidencyIqamaNo: yup
    .string()
    .required("UAE Residency/Iqama No. is required"),
  visaIssueDate: yup.string().required("Visa Issue Date is required"),
  visaExpiryDate: yup.string().required("Visa Expiry Date is required"),
  uaeResidencyIqama: yup.string().required("UAE Residency/Iqama is required"),
  companyName: yup.string().required("Company Name is required"),
  companyLocation: yup.string().required("Company Location is required"),
  visaType: yup.string().required("Visa Type is required"),
  visaAppliedVia: yup.string().required("Visa Applied Via is required"),

  // Insurance Details

  medicalInsurance: yup.string().required("Medical Insurance is required"),
  miStartDate: yup.string().required("Start date is required"),
  miEndDate: yup.string().required("End date is required"),
  accidentalInsurance: yup
    .string()
    .required("Accidental Insurance is required"),
  aiStartDate: yup.string().required("Start date is required"),
  aiEndDate: yup.string().required("End date is required"),

  // Other Details => EmployeeForm

  passportHandOver: yup
    .string()
    .required("Passport Handed Over To Representative is required"),
  passportTakerName: yup
    .string()
    .required("Name of Representative Passport Taken is required"),
  passportPicture: yup.string().required("Add Picture of Passport is required"),
  rtaTraining: yup.string().required("RTA Training is required"),
  empOwnerShip: yup.string().required("EMP Ownership is required"),
  empStatus: yup.string().required("EPM Status is required"),
  vendor: yup.string().required("Vendor is required"),

  // Referral
  referralName: yup.string().required("Referral name is required"),
  referralPhone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Referral phone is required"),
  referralAddress: yup.string().required("Referral address is required"),
});
