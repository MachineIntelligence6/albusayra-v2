import React from "react";
import DescriptiveText from "./DescriptiveText";
import { custom } from "@/app/theme";

const CaptionText = (props) => {
  const { text, required = true, color = custom.primaryText } = props;
  return (
    <DescriptiveText
      text={text}
      fontSize={16}
      fontWeight={500}
      color={color}
      required={required}
    />
  );
};

export default CaptionText;
