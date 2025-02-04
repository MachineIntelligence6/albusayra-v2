export const countryCodes = [
    { code: "+1", country: "USA" },
    { code: "+91", country: "India" },
    { code: "+44", country: "UK" },
];


export const isNumeric = (value) => {
    return /^\d*$/.test(value);
  }