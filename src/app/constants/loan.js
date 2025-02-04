export const modalTableFiltersData = [
    { id: 2, filterName: "ID", placeholder: "3212", inputType: "text" },
    {
      id: 3,
      filterName: "Employment Type",
      placeholder: "Rider/any other",
      inputType: "dropdown",
      options: [
        { id: 12, label: "Rider", value: "rider" },
        { id: 22, label: "Any other", value: "any other" },
      ],
    },
    { id: 4, filterName: "Employee Name", placeholder: "e.g Rashid", inputType: "text" },
    {
      id: 1,
      filterName: "Resident",
      placeholder: "UAE Resident/Iqama",
      inputType: "dropdown",
      options: [
        { id: 14, label: "UAE Resident", value: "uae resident" },
        { id: 24, label: "Non Resident", value: "non resident" },
      ],
    },
  ];

export const TableFiltersData = [
    { id: 2, filterName: "ID", placeholder: "3212", inputType: "text" },
    {
      id: 3,
      filterName: "Employment Type",
      placeholder: "Rider/any other",
      inputType: "dropdown",
      options: [
        { id: 12, label: "Rider", value: "rider" },
        { id: 22, label: "Any other", value: "any other" },
      ],
    },
    { id: 4, filterName: "Driving License", placeholder: "e.g 867568", inputType: "text" },
    {
      id: 1,
      filterName: "Status",
      placeholder: "Select",
      inputType: "dropdown",
      options: [
        { id: 14, label: "Approved", value: "approved" },
        { id: 24, label: "Approval Pending", value: "approval Pending" },
      ],
    },
  ];
  
  export const actionMenu = [
    { label: "List of EMP loan", route: "/employees/loan/list-emp-loan" },
  ];
  
  export const headerMenuItems = [
    { label: "Edit", action: "edit" },
    { label: "Delete", action: "delete" },
  ];
  
  