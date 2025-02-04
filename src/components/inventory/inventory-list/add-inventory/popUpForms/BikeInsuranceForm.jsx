import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { RefreshCcwIcon } from "lucide-react";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
const BikeInsuranceFormPopUp = ({ control, handleUpdate, data, columns }) => {
  return (
    <>
      <Box
        component="div"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ flex: 1 }}>Bike Insurance</Typography>
          <Box sx={{ flex: 1 }}>
            <Controller
              name="bikeInsurance.insurance"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomDropdown
                  label="Bike Insurance"
                  error={!!error}
                  helperText={error?.message}
                  options={[
                    { label: "Yes", value: "true" },
                    { label: "No", value: "false" },
                  ]}
                  {...field}
                />
              )}
            />
          </Box>
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ flex: 1 }}>Bike Insurance Start Date</Typography>
          <Box sx={{ flex: 1 }}>
            <Controller
              name="bikeInsurance.startDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomDateField
                  label="Bike Insurance Start Date"
                  placeholder="DD/MM/YYYY"
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                />
              )}
            />
          </Box>
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ flex: 1 }}>Bike Insurance End Date</Typography>
          <Box sx={{ flex: 1 }}>
            <Controller
              name="bikeInsurance.endDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomDateField
                  label="Bike Insurance End Date"
                  placeholder="DD/MM/YYYY"
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                />
              )}
            />
          </Box>
        </Box>
      </Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 3,
        }}
      >
        <CustomButton
          type="submit"
          endIcon={<RefreshCcwIcon size={18} />}
          variant="outlined"
          onClick={handleUpdate}
        >
          Update
        </CustomButton>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box component="div" sx={{ width: "100%", minHeight: "200px" }}>
        <Typography
          variant="h6"
          sx={{
            textTransform: "uppercase",
            fontWeight: 600,
            fontSize: 16,
            pb: 2,
          }}
        >
          Bike Insurance History
        </Typography>

        <Box
          sx={{
            width: "100%",
            minHeight: 270,
            border: "1px solid #2F2B3D1F",
            overflowY: "auto",
            borderRadius: 3,
          }}
        >
          <CustomTable
            isSelectedOption={false}
            columns={columns}
            data={data}
            handleFilterClick={() => {}}
            onRowSelect={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};

export default BikeInsuranceFormPopUp;
