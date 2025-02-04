import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  abbreviation: Yup.string().required("abbreviation is required"),
  companyName: Yup.string().required("companyName is required"),
  industry: Yup.string().required("industry is required"),
  website: Yup.string().required("website is required"),
  phone: Yup.string()
    .matches(/^\d{3} \d{3} \d{4}$/, "Number must be in the format XXX XXX XXXX")
    .required("Phone number is required"),
  address: Yup.string().required("address is required"),
  country: Yup.string().required("country is required"),
  state: Yup.string().required("state is required"),
  city: Yup.string().required("city is required"),
});
