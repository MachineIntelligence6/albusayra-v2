"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import CustomButton from "./CustomButton";
import { custom } from "@/app/theme";

const DynamicBreadcrumb = ({
  isBtnShow,
  btnName = "Add Applicant",
  onClick,
  icon,
  isChallan,
  isRole,
}) => {
  const pathname = usePathname();

  const pathArray = pathname.split("/").filter((path) => path);

  const breadcrumbs = pathArray.map((path, index) => {
    const href = `/${pathArray.slice(0, index + 1).join("/")}`;
    return { label: path.replace("-", " "), href };
  });


  const toTitleCase = (text) => {
    const cleanedText = text.replace(/admin\//gi, "");

    const parts = cleanedText.split("/").filter(Boolean);

    return parts
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" / ");
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center"  >
      <Breadcrumbs aria-label="breadcrumb" sx={{}}>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return isLast ? (
            <Typography key={index} color={custom.breadcrumbText} fontSize="20px" fontWeight="500">
              {toTitleCase(crumb.label)}
            </Typography>
          ) : (
            <Link style={{ textDecoration: "none" }} key={index} href={crumb.href} passHref>
              <Typography color={custom.breadcrumbText} fontSize="20px" fontWeight="500" sx={{ cursor: "pointer" }}>
                {toTitleCase(crumb.label)}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
      <Box>
        {isBtnShow && (
          <CustomButton startIcon={icon} onClick={onClick}>
            {btnName}
          </CustomButton>
        )}
        {isChallan && (
          <CustomButton onClick={onClick} sx={{ marginLeft: "14px" }}>
            Add Challan
          </CustomButton>
        )}
        {isRole && (
          <CustomButton startIcon={icon} onClick={onClick} sx={{ marginLeft: "14px" }}>
            {btnName}
          </CustomButton>
        )}
      </Box>

    </Box>
  );
};

export default DynamicBreadcrumb;
