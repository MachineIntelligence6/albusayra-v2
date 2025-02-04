import * as yup from "yup";

export const referralFormSchema = yup.object().shape({
  referredByWhom: yup
    .string()
    .required("Referrer name is required")
    .min(2, "Name must be at least 2 characters"),

  referralPhoneNumber: yup.object().shape({
    countryCode: yup
      .string()
      .matches(/^\+\d{1,3}$/, "Country code must be in the format +XX or +XXX")
      .required("Country code is required"),
    number: yup
      .string()
      .matches(
        /^\d{3} \d{3} \d{4}$/,
        "Number must be in the format XXX XXX XXXX"
      )
      .required("Phone number is required"),
  }),

  referralAddress: yup
    .string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
});
