// import InputLabelTop from "@/components/shared-components/InputLabel";
// import { Box } from "@mui/material";
// import React from "react";

// function Input({
//   name,
//   value,
//   onChange,
//   onBlur,
//   placeholder,
//   labelText,
//   fieldName,
//   layout = "col",
//   customClass = "",
//   customInputClass = "",
//   required = false
// }) {
//   return (
//     <div
//       className={`flex ${layout === "row" ? "flex-row" : "flex-col"
//         } gap-[1px] ${customClass}`}
//     >
//       {labelText && (
//         <InputLabelTop text={labelText} required={required} />
//       )}
//       <input
//         onChange={onChange}
//         className={`w-full h-[38px] border-[1px] border-[#2F2B3D40]   rounded-[6px] !outline-none px-3 ${customInputClass} `}
//         placeholder={placeholder}
//         id={name}
//         name={name}
//         value={value}
//         onBlur={onBlur}
//       />
//     </div>
//   );
// }

// export default Input;
