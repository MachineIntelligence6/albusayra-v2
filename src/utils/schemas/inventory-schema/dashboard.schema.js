import * as yup from "yup";

export const addSimDetailSchema = yup.object().shape({
  simNumber: yup.string().optional(),
  simVendorName: yup.string().optional(),
  simOwnership: yup.string().optional(),
  simContract: yup.string().optional(),
  vat: yup
    .number()
    .min(0, "VAT cannot be negative")
    .max(100, "VAT cannot exceed 100%")
    .optional(),
});
