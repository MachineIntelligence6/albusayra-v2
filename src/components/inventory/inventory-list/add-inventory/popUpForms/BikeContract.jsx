import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import { Box, Divider, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import React from "react";
import { RefreshCcwIcon } from "lucide-react";
import CustomButton from "@/components/shared-components/CustomButton";

const BikeContractPopUp = ({
  control,
  options,
  handleUpdate,
  data,
  columns,
}) => {
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
          <Typography sx={{ flex: 1 }}>Vendor</Typography>
          <Box sx={{ flex: 1 }}>
            <Controller
              name="bikeContact.vendor"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomDropdown
                  label="Vendor"
                  error={!!error}
                  helperText={error?.message}
                  options={options.vendorOptions}
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
          <Typography sx={{ flex: 1 }}>Contract</Typography>
          <Box sx={{ flex: 1 }}>
            <Controller
              name="bikeContact.contact"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomDropdown
                  label="Contract"
                  error={!!error}
                  helperText={error?.message}
                  options={options.contractOptions}
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
          Bike Contract History
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

export default BikeContractPopUp;
