export const challanSalikFilters = [
    {
      id: 1, filterName: "Invoice Month", placeholder: "Please Select",inputType: "dropdown", options: [
        { id: 19, label: "UAE", value: "uae" },
        { id: 29, label: "Pakistan", value: "pakistan" },
        { id: 39, label: "India", value: "india" },
      ],
    },
    {
      id: 2, filterName: "Vendor", placeholder: "Please Select",inputType: "dropdown", options: [
        { id: 71, label: "UAE", value: "uae" },
        { id: 72, label: "Pakistan", value: "pakistan" },
        { id: 73, label: "India", value: "india" },
      ],
    },
    {
      id: 3,
      filterName: "Vehicle Registration No",
      placeholder: "e.g 3242",
      inputType: "text"
    },
    {
      id: 4,
      filterName: "Direction",
      placeholder: "Please Select",
      inputType: "dropdown",
      options: [
        { id: 51, label: "Islamabad", value: "islamabad" },
        { id: 52, label: "Rawalpindi", value: "rawalpindi" },
        { id: 53, label: "Peshawar", value: "peshawar" },
      ],
    },
  ];
  
  export const challanTrafficFilters = [
    {
      id: 1,
      filterName: "ID",
      placeholder: "e.g. 3242",
      inputType: "text", // Indicates a text input field
    },
    {
      id: 2,
      filterName: "Employment Name",
      placeholder: "Please Select",
      inputType: "dropdown", // Indicates a dropdown field
    },
    {
      id: 3,
      filterName: "Bike Plate",
      placeholder: "e.g. XYZ 1234",
      inputType: "text",
    },
    {
      id: 4,
      filterName: "Challan Number",
      placeholder: "e.g. 1001",
      inputType: "dropdown",
      options: [
        { id: 11, label: "1001", value: "1001" },
        { id: 21, label: "1002", value: "1002" },
        { id: 31, label: "1003", value: "1003" },
      ],
    },
  ];