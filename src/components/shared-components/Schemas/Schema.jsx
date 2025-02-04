import * as Yup from "yup";

export const Schema = () => {
  return Yup.object({
    // Validation for 'status' field (radio buttons)
    status: Yup.string().required("Please select a status"),

    // Validation for 'remarks' field (textarea)
    remarks: Yup.string()
      .min(5, "Remarks must be at least 5 characters")
      .required("Remarks are required"),
  });
};


