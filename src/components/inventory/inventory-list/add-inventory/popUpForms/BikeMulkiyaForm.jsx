import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { RefreshCcwIcon } from "lucide-react";
import CustomButton from "@/components/shared-components/CustomButton";

const BikeMulkiyaFormPopUp = ({
  control,
  handleUpdate,
  data,
  columns,
  btnTxt,
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
          <Typography sx={{ flex: 1 }}>Bike Mulkiya Picture</Typography>
          <Box sx={{ flex: 1 }}>
            <Controller
              name="bikeMulikya.picture"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomFileUploadField
                  label="Bike Mulkiya Picture"
                  placeholder="Jpg, Pdf, Png"
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
          <Typography sx={{ flex: 1 }}>Bike Mulikya Expiry</Typography>
          <Box sx={{ flex: 1 }}>
            <Controller
              name="bikeMulikya.expiryDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomDateField
                  label="Bike Mulikya Expiry"
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
          {btnTxt}
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
          Bike Mulikaya History
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

export default BikeMulkiyaFormPopUp;
