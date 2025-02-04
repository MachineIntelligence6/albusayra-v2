import * as yup from "yup";

export const PassportDetailsSchema = yup.object().shape({
  passportNumber: yup.string()
    .required("Passport number is required")
    .matches(/^[A-Z0-9-]+$/, "Invalid passport number format"),
  
  passportIssueDate: yup.date()
    .required("Passport issue date is required")
    .max(new Date(), "Issue date cannot be in the future"),
  
  passportExpiryDate: yup.date()
    .required("Passport expiry date is required")
    .min(yup.ref('passportIssueDate'), "Expiry date must be after issue date"),
  
  passportCopy: yup.mixed()
    .required("Passport copy is required"),
  
  hasValidWorkVisa: yup.string()
    .required("Please specify if you have a valid work visa"),
});

