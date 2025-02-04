import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box, Divider, Paper, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CustomDatePicker from "@/components/shared-components/CustomDatePicker";
import { ChallansSchema } from "@/utils/schemas/ChallanFormSchema";
import CustomSelect from "../shared-components/CustomSelect";
import CustomFileUploadField from "../shared-components/CustomFIleUploadField";
import { useRouter } from "next/navigation";
import { AddUserInfoFields } from "./AddUserInfoFields";
import { addUserInfoSchema } from "@/utils/schemas/user-schema";

export default function AddUserForm({ handleCloseModal }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(addUserInfoSchema),
    mode: "onChange",
    defaultValues: {
      userType: "",
      role: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      country: "",
      state: "",
      city: "",
      active: "",
      company: [],
    },
  });

  const { trigger, control } = methods;

  // const handleSave = async () => {
  //   const isValid = await trigger();
  //   if (!isValid) {
  //     console.log("Validation Errors:", methods.formState.errors);
  //   }
  //   handleCloseModal();
  //   // router.push("/admin/users/active-users")
  // };

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("UserType", data.userType);
    formData.append("CityId", data.city);
    formData.append("ContactNumber", data.phoneNumber.replace(/\D/g, "")); // Remove non-numeric chars
    formData.append("StateId", data.state);
    formData.append("RoleId", data.role);
    formData.append("CountryId", data.country);
    formData.append("Status", data.active === "active" ? "1" : "0"); // Convert active status to API format
    formData.append("Address", data.address || ""); // Add address if available
    formData.append("FullName", data.fullName);
    formData.append("Email", data.email);
    formData.append("Password", data.password || ""); // Default empty if not provided
    formData.append("GenderId", data.genderId || ""); // Default empty if not provided
    formData.append("CreatedBy", data.createdBy || "harrisID"); // Default creator ID

    // Append multiple company IDs
    if (Array.isArray(data.company)) {
      data.company.forEach((companyId) => {
        formData.append("CompanyIds", companyId);
      });
    }

    // Append profile image if available
    if (data.profileImage) {
      formData.append("Image", data.profileImage);
    }

    // dispatch(createUser(formData));

    // handleCloseModal();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper sx={{ maxWidth: 800, margin: "auto", p: 3 }}>
        <Typography variant="h6">Add User</Typography>
        <Divider sx={{ my: "1em" }} />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <AddUserInfoFields control={control} />
            </Box>
            <Divider />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <CustomButton
                variant="outlined"
                bgColor="danger"
                onClick={handleCloseModal}
                startIcon={<CancelIcon />}
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                variant="contained"
                // onClick={handleSave}
                endIcon={<DoneIcon />}
              >
                Save
              </CustomButton>
            </Box>
          </form>
        </FormProvider>
      </Paper>
    </LocalizationProvider>
  );
}
