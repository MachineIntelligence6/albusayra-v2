import * as Yup from "yup";

export const GeneralInfoSchema = Yup.object().shape({
  campaignName: Yup.string().required("Campaign Name is required"),
  residency: Yup.string()
    .oneOf(
      ["resident", "non-resident"],
      "Please select a valid residency status"
    )
    .required("Residency status is required"),
  fullName: Yup.string().required("Full Name is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Please select a valid gender")
    .required("Gender is required"),
  employeeStatus: Yup.string()
    .oneOf(
      ["fullTime", "partTime", "contractor"],
      "Please select a valid employment status"
    )
    .required("Employment Status is required"),
  // workingCountry: Yup.string()
  //   .oneOf(['uae', 'other'], 'Please select a valid working country')
  //   .required('Preferred Working Country is required'),
  workingCity: Yup.string()
    .oneOf(["dubai", "other"], "Please select a valid working city")
    .required("Preferred Working City is required"),
  // interestedplatform: Yup.string()
  //   .oneOf(['dubai', 'abuDhabi', 'sharjah'], 'Please select a valid platform')
  //   .when('residency', (residency, schema) =>
  //     residency === 'resident'
  //       ? schema.required('Interested platform is required for UAE residents')
  //       : schema
  //   ),
  learnedFrom: Yup.string()
    .oneOf(["social", "friend", "other"], "Please select a valid option")
    .required("Please specify how you learned about this form"),
  companyprovideNOC: Yup.string()
    .oneOf(["social", "friend", "other"], "Please select a valid option")
    .when("residency", (residency, schema) =>
      residency === "resident"
        ? schema.required("This field is required for UAE residents")
        : schema
    ),
});
