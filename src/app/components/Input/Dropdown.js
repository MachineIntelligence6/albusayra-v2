import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Dropdown({
  name,
  value,
  onChange,
  onBlur,
  labelText,
  options = [],
  layout = "col",
  customClass = "",
}) {
  return (
    <div
      className={`flex ${
        layout === "row" ? "flex-row" : "flex-col"
      } gap-[5px] ${customClass}`}
    >
      {labelText && (
        <label htmlFor={name}>
          {labelText}
          <span className="text-red-500">*</span>
        </label>
      )}
      <div className="relative w-full">
        <select
          onChange={onChange}
          className="w-full h-[38px] border-[1px] border-[#2F2B3D40] rounded-[6px] !outline-none px-3 pr-8 appearance-none"
          id={name}
          name={name}
          value={value}
          onBlur={onBlur}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Custom Dropdown Arrow Icon */}
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <KeyboardArrowDownIcon />
        </span>
      </div>
    </div>
  );
}

export default Dropdown;
