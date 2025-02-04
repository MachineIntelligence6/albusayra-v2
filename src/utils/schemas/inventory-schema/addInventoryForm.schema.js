import * as yup from "yup";

export const addInventoryFormSchema = yup.object({
  bikeInfo: yup.object({
    vendorName: yup.string().optional(),
    acquiredDate: yup
      .mixed()
      .transform((value) => {
        return value === "" ? undefined : value;
      })
      .optional(),
    regCountry: yup.string().optional(),
    regCity: yup.string().optional(),
    regDate: yup
      .mixed()
      .transform((value) => {
        return value === "" ? undefined : value;
      })
      .optional(),
    plateNo: yup.string().optional(),
    healthCheck: yup.string().optional(),
    type: yup.string().optional(),
    chassesNumber: yup.string().optional(),
    manufactureer: yup.string().optional(),
    modal: yup.string().optional(),
    number: yup.string().optional(),
    cost: yup.string().optional(),
    picture: yup.string().optional(),
  }),
  bikeMulikya: yup.object({
    picture: yup.string().optional(),
    expiryDate: yup
      .mixed()
      .transform((value) => {
        return value === "" ? undefined : value;
      })
      .optional(),
  }),
  bikeInsurance: yup.object({
    insurance: yup.string().optional(),
    startDate: yup
      .mixed()
      .transform((value) => {
        return value === "" ? undefined : value;
      })
      .optional(),
    endDate: yup
      .mixed()
      .transform((value) => {
        return value === "" ? undefined : value;
      })
      .optional(),
  }),
  bikeContact: yup.object({
    vendor: yup.string().optional(),
    contact: yup.string().optional(),
  }),
  bikeFoodPermit: yup.object({
    picture: yup.string().optional(),
    expiryDate: yup
      .mixed()
      .transform((value) => {
        return value === "" ? undefined : value;
      })
      .optional(),
    cost: yup.string().optional(),
  }),
  otherDetails: yup.object({
    branding: yup.string().optional(),
    brandingPlateform: yup.string().optional(),
    box: yup.string().optional(),
    brandCost: yup.string().optional(),
    vat: yup.string().optional(),
  }),
});
