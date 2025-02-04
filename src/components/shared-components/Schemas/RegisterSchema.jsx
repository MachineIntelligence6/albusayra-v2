import * as yup from "yup";

export const RegisterSchema = yup.object({
  fullName: yup.string().required("Full Name is required."),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email Address is required."),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{2}\s\d{3}\s\d{4}$/, {
      message: "Phone number must be in format: XX XXX XXXX",
      excludeEmptyString: true,
    }),
  country: yup.string().required("Resident Country is required."),
  state: yup.string().required("Resident State is required."),
  city: yup.string().required("Resident City is required."),
  license: yup
    .string()
    .required("Please select if you have a valid driving license."),
});
