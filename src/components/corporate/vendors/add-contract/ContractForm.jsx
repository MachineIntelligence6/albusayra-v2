"use client";

import CurrencyType from "@/components/shared-components/CurrencyType";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { Box, Typography } from "@mui/material";
import { Check, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState, createElement, useEffect } from "react";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getByHeaderAndSectionAndKey } from "@/redux/reducers/dataBank/dataBankThunk";
import CustomSelect from "@/components/shared-components/CustomSelect";

const ContractForm = (props) => {
  const {
    form,
    onSubmit,
    onReset,
    ContractType,
    editId,
    editDataCheck,
    currencyType,
  } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const [contractType, setContractType] = useState([]);
  const [selectedContractType, setSelectedContractType] = useState("Rider");
  const { getGenericDropdowns: platformTypeData } = useSelector(
    (state) => state.dataBankSlice
  );

  useEffect(() => {
    const sectionName = "Vendor";
    const sectionValue = "ContractType";
    dispatch(
      getByHeaderAndSectionAndKey({
        sectionName: sectionName, // Section name for filter2
        sectionValue: sectionValue, // Section value for filter3
      })
    );
  }, [dispatch]);

  const handleContractTypeChange = (value) => {
    setSelectedContractType(value);
  };
  useEffect(() => {
    if (editDataCheck == true && editId) {
      setSelectedContractType(ContractType);
    }
  }, [editDataCheck, editId]);
  useEffect(() => {
    if (platformTypeData?.length > 0) {
      const formattedOptions = platformTypeData.map((platform) => ({
        value: platform.value,
        label: platform.value,
      }));
      setContractType(formattedOptions);
    }
  }, [platformTypeData]);
  const inputFields = [
    {
      label: "Contract Name",
      name: "contractName",
      required: true,
      placeholder: "Enter Contract Name",
      component: CustomTextField,
    },
    {
      label: "Contract Signing Date",
      required: true,
      name: "contractSigningDate",
      component: CustomDateField,
    },
    {
      label: "Contract Start Date",
      name: "contractStartDate",
      component: CustomDateField,
    },
    {
      label: "Contract End Date",
      name: "contractEndDate",
      component: CustomDateField,
    },
    {
      label: "Contract Type",
      name: "contractType",
      required: true,
      component: CustomSelect,
      options: contractType,
      onChange: (e) => handleContractTypeChange(e.target.value),
    },
    ...(selectedContractType === "Rider"
      ? [
          {
            label: "Fixed Amount (Rider)",
            name: "fixedAmount",
            placeholder: "e.g. 2800",
            component: CustomTextField,
            endAdornment: <CurrencyType type={currencyType} />,
          },
          {
            label: "Commission Amount",
            name: "commissionAmount",
            placeholder: "e.g. 2800",
            component: CustomTextField,
            endAdornment: <CurrencyType type={currencyType} />,
          },
        ]
      : []),
    ...(selectedContractType === "Asset"
      ? [
          {
            label: "Charges",
            name: "charges",
            placeholder: "e.g. 2800",
            component: CustomTextField,
            endAdornment: <CurrencyType type={currencyType} />,
          },
        ]
      : []),
    {
      label: "Active/Close",
      name: "status",
      required: true,
      component: CustomDropdown,
      options: [
        { label: "Active", value: "active" },
        { label: "Close", value: "close" },
      ],
    },
  ];

  return (
    <Box>
      <Typography sx={{ color: "#4B465C", fontSize: "18px", fontWeight: 500 }}>
        Contract Form
      </Typography>

      <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            marginTop: 2,
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {inputFields?.map(
              (
                {
                  label,
                  name,
                  required,
                  placeholder,
                  // component,
                  component = CustomSelect,
                  options,
                  endAdornment,
                  onChange,
                },
                index
              ) => (
                <Box
                  key={index}
                  sx={{
                    width: "calc(50% - 8px)", // Two fields per row
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#4B465C",
                      mb: 0.5,
                    }}
                  >
                    {label}{" "}
                    {required && <span style={{ color: "red" }}>*</span>}
                  </Typography>
                  <Controller
                    name={name}
                    control={form.control}
                    defaultValue=""
                    render={({ field, fieldState: { error } }) =>
                      createElement(component, {
                        ...field,
                        placeholder,
                        options,
                        error,
                        endAdornment,
                        onChange: (e) => {
                          field.onChange(e);
                          if (onChange) onChange(e);
                        },
                      })
                    }
                  />
                </Box>
              )
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <CustomButton
            bgColor="secondary"
            sx={buttonStyle}
            startIcon={<MoveLeft />}
            onClick={() => router.push("/admin/corporate")}
          >
            Back
          </CustomButton>
          <CustomButton endIcon={<Check />} sx={buttonStyle} type="submit">
            Add
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ContractForm;

const buttonStyle = {
  padding: "8px 20px",
  borderRadius: "6px",
  fontSize: "15px",
  fontWeight: 500,
  boxShadow: "0px 2px 6px 0px rgba(115, 103, 240, 0.30)",
};
