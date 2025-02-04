import * as Yup from 'yup';

export const ChallansSchema = Yup.object().shape({
    bikeNumberPlate: Yup.string().required("Bike Number Plate is required"),
    bikeOwner: Yup.string().required("Bike Owner is required"),
    challanNo: Yup.string().required("Challan No. is required"),
    challanAmount: Yup
      .number()
      .typeError("Challan Amount must be a number")
      .required("Challan Amount is required"),
    // challanAttachments: Yup
    //   .mixed()
    //   .test("fileRequired", "Challan Attachments are required", (value) => {
    //     return value && value.length > 0;
    //   }),
    challanAttachments: Yup.mixed()
    .required("challanAttachments are required"),
    dateOfTrafficChallan: Yup
      .date()
      .typeError("Invalid Date")
      .required("Date of Traffic Challan is required"),
    time: Yup.string().required("Time is required"),
    city: Yup.string().required("City is required"),
    location: Yup.string().required("Location is required"),
    reason: Yup.string().required("Reason is required"),
  });