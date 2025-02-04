// const FormattedDate = ({ isoDate, showTime = false }) => {
//   const formatDateTime = (dateString) => {
//     if (!dateString) return "";

//     const date = new Date(dateString);

//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();

//     let formattedDate = `${month}/${day}/${year}`;

//     if (showTime) {
//       let hours = date.getHours();
//       const minutes = String(date.getMinutes()).padStart(2, "0");
//       const amPm = hours >= 12 ? "PM" : "AM";
//       hours = hours % 12 || 12; // Convert 0 hour to 12

//       formattedDate += ` ${hours}:${minutes} ${amPm}`;
//     }

//     return formattedDate;
//   };

//   return <span>{formatDateTime(isoDate)}</span>;
// };

// import React from "react";

const FormattedDate = ({ isoDate, showTime = false }) => {
  const formatDateTime = (dateString) => {
    if (!dateString) return ""; // Prevent errors if date is undefined/null

    const date = new Date(dateString);

    // Extract parts of the date
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();

    // Format Date
    let formattedDate = `${month}/${day}/${year}`;

    // If `showTime` is true, format the time
    if (showTime) {
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const amPm = hours >= 12 ? "PM" : "AM";

      // Convert to 12-hour format
      hours = hours % 12 || 12; // Convert '0' hours to '12' for AM

      formattedDate += ` ${hours}:${minutes} ${amPm}`;
    }

    return formattedDate;
  };

  return <span>{formatDateTime(isoDate)}</span>;
};

export default FormattedDate;
