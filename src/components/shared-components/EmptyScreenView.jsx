import { Box, Typography } from "@mui/material";
import React from "react";
import CustomButton from "./CustomButton";
import { Plus } from "lucide-react";
import { custom } from "@/app/theme";
import DescriptiveText from "./DescriptiveText";

const EmptyScreenView = ({
  image,
  altText,
  title,
  description,
  buttonText,
  onButtonClick,
  icon = <Plus size={18} />,
  showButton = true,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 3,
        width: "100%",
        height: "100%",
      }}
    >
      <Box component="figure" className="w-fit">
        <img src={image} alt={altText} />
      </Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "center",
        }}
      >
        {title && (
          <DescriptiveText
            text={title}
            fontSize={20}
            fontWeight={600}
            color={custom.deepBlue}
          />
        )}
        {description && (
          <DescriptiveText
            text={description}
            fontSize={16}
            fontWeight={400}
            color={custom.breadcrumbText}
          />
        )}
        {/* Conditionally render the button */}
        {showButton && (
          <CustomButton onClick={onButtonClick} sx={{ px: 4 }} endIcon={icon}>
            {buttonText}
          </CustomButton>
        )}
      </Box>
    </Box>
  );
};

export default EmptyScreenView;
