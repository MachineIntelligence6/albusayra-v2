import React from "react";
import FormTab from "@/components/inventory/inventory-list/add-inventory/forms/FormTab";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/shared-components/CustomButton";
import { ArrowBack } from "@mui/icons-material";
import { Check } from "lucide-react";
import EmploypeeForm from "./EmployeeForm";
import C3Card from "./C3Card";

const AddEmployeeForm = ({ formtabs, onClickTab, selectedTab }) => {
  const router = useRouter();

  const handleNextClick = () => {
    const index = formtabs.findLastIndex((item) => item.isActive);
    const nextTab = formtabs.at(index + 1);
    onClickTab(nextTab);
  };

  const handleBackClick = () => {
    const index = formtabs.findLastIndex((item) => item.isActive);
    const nextTab = formtabs.at(index - 1);
    onClickTab(nextTab);
  };

  return (
    <Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          gap: 2,
          borderBottom: "1px solid #2F2B3D40",
          pb: 2,
          pt: 4,
        }}
      >
        {formtabs?.length &&
          formtabs.map((tab) => (
            <FormTab key={tab.id} tab={tab} onClickTab={onClickTab} />
          ))}
      </Box>

      <Box sx={{ width: "100%", my: 5 }}>
        {formtabs?.map((item) => {
          return (
            <>
              {item.isActive && item.text === "Add Employee" && (
                <EmploypeeForm />
              )}
              {item.isActive && item.text === "C3 Card" && <C3Card />}
            </>
          );
        })}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 2,
          pb: 4,
        }}
      >
        {selectedTab?.text !== "Bike Info" && (
          <CustomButton
            startIcon={<ArrowBack size={20} />}
            bgColor="muted"
            onClick={() => router.push("/employees?table=false")}
          >
            Back
          </CustomButton>
        )}
        <Box
          component="div"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <CustomButton endIcon={<Check size={20} />} onClick={handleNextClick}>
            {Boolean(selectedTab?.text === "C3 Card") ? "Save" : "Next"}
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AddEmployeeForm;
