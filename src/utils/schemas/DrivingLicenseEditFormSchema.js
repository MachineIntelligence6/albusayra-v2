import * as yup from "yup";

export const DrivingLicenseEditSchema = yup.object().shape({
    isUaeLicenseHolder: yup.string().required("Please specify if you hold a UAE driving license"),
  drivingLicenseIssueDate: yup.date().when("isUaeLicenseHolder", {
    is: "yes",
    then: (schema) => schema.required("License issue date is required"),
  }),
  drivingLicenseExpiryDate: yup.date().when("isUaeLicenseHolder", {
    is: "yes",
    then: (schema) => schema.required("License expiry date is required"),
  }),
  drivingLicenseFront: yup.mixed().when("isUaeLicenseHolder", {
    is: "yes",
    then: (schema) => schema.required("Front side of license is required"),
  }),
  drivingLicenseBack: yup.mixed().when("isUaeLicenseHolder", {
    is: "yes",
    then: (schema) => schema.required("Back side of license is required"),
  }),

});