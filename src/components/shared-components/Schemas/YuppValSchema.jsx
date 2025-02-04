import * as Yup from "yup";

const dateFormat = "yyyy-MM-dd";

export const YuppValSchema = () => {
  return Yup.object({
    campaignName: Yup.string()
      .min(3, "Campaign name should be at least 3 characters")
      .required("Campaign name is required"),
    startDate: Yup.date()
      .nullable()
      .typeError("Start date is not valid")
      .required("Start date is required"),
    endDate: Yup.date()
      .nullable()
      .typeError("End date is not valid")
      .min(Yup.ref("startDate"), "End date can't be before start date")
      .required("End date is required"),
    description: Yup.string()
      .min(10, "Description should be at least 10 characters")
      .required("Description is required"),
  });
};
