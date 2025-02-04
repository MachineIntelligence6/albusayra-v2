import * as yup from "yup";

// Company Info validation schema
export const companyInfoSchema = yup.object().shape({
  abbreviation: yup
    .string()
    .required("Company abbreviation is required")
    .max(2, "Maximum 2 characters allowed")
    .matches(/^[A-Za-z]+$/, "Only letters are allowed"),
  companyName: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters"),
  industry: yup.string().required("Industry is required"),
  website: yup
    .string()
    .url("Please enter a valid URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{2}\s\d{3}\s\d{4}$/, {
      message: "Phone number must be in format: XX XXX XXXX",
      excludeEmptyString: true,
    }),
  businessAddress: yup.string().required("Business address is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State/Province is required"),
  city: yup.string().required("City is required"),
});

// Contact Info validation schema
export const contactInfoSchema = yup.object().shape({
  salutation: yup.string().required("Salutation is required"),
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed"),
  jobTitle: yup.string().required("Job title is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{2}\s\d{3}\s\d{4}$/, {
      message: "Phone number must be in format: XX XXX XXXX",
      excludeEmptyString: true,
    }),
});

// Location validation schema
export const locationSchema = yup.object().shape({
  locations: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one location")
    .required("Please select at least one location"),
});

// Complete form schema
export const completeFormSchema = yup.object().shape({
  companyInfo: companyInfoSchema,
  contactInfo: contactInfoSchema,
  locations: locationSchema,
});
