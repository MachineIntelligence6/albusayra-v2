
import * as yup from "yup";

// Validation schema using Yup
export const addUserInfoSchema = yup.object().shape({
    profileImage: yup.mixed().required("Profile image is required"),
    userType: yup.string().required("User Type is required"),
    role: yup.string().required("Role is required"),
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().email("Invalid email format").required("Email Address is required"),
    phoneNumber: yup
      .string()
      .matches(/\+\d{1,3} \d{1,3} \d{3} \d{4}/, "Phone number must be in format +971 123 456 7890")
      .required("Phone Number is required"),
    country: yup.string().required("Country is required"),
    state: yup.string().required("State/Province is required"),
    city: yup.string().required("City is required"),
    active: yup.string().required("Active status is required"),
    company: yup
      .array()
      .of(yup.string().required("Each company must be a valid string"))
      .min(1, "At least one company must be selected")
      .required("Company is required"),
  });
  