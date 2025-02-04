"use client";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { Box, Typography } from "@mui/material";
import { Check, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import CurrencyType from "@/components/shared-components/CurrencyType";
import CustomMultiSelected from "@/components/shared-components/CustomMultiSelected";
import DeductionType from "../employees/driving-license-request/form/DeductionType";



const months = ["Month 1", "Month 2", "Month 3"];
const FoodPermitDeductionForm = () => {
    const [deductionType, setDeductionType] = useState("");
    const router = useRouter();

    const handleClick = (value) => {
        router.push(`/employees/food-permit-deduction?table=${value}`);
    };

    const handleMultiChange = (value) => {
        setDeductionType("3")
        console.log(value)
    }

    const inputFields = useMemo(() => {
        return [
            {
                label: "Food Permit Amount Charged to Rider",
                name: "food_permit_amount",
                placeholder: "eg",
                type: "input",
                isRequired: true,
            },
            {
                label: "Deduction Type",
                name: "deductionType",
                type: "dropdown",
                placeholder: "Please Select",
                isRequired: false,
                options: [
                    { label: "Fixed", value: "fixed" },
                    { label: "Variable", value: "variable" },
                ],
                onChange: (event) => setDeductionType(event.target.value),
                showDropdown: true,
            },
            {
                label: "Installment Plan",
                name: "installmentPlan",
                type: "multiSelectedDropdown",
                placeholder: "Please Select",
                isRequired: true,
                options: [
                    { label: "1 Months", value: "1months" },
                    { label: "2 Months", value: "2months" },
                    { label: "3 Months", value: "3months" },
                    { label: "4 Months", value: "4months" },
                ],
                showDropdown: true,
            },

        ];
    }, []);

    return (
        <Box>
            <Typography sx={{ color: "#4B465C", fontSize: "18px", fontWeight: 500 }}>
                Food Permit Deduction Form
            </Typography>

            <Box
                sx={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 2 }}
            >
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, flex: 1 }}>
                    {inputFields?.map((field, index) => {
                        return (
                            <Box
                                key={field.name}
                                sx={{
                                    width:
                                        field.name === "assetType" ? "100%" : "calc(50% - 8px)",
                                    fontSize: "13px",
                                }}
                            >
                                {field.type === "input" && (
                                    <CustomTextField
                                        label={field.label}
                                        required={field.isRequired}
                                        placeholder={field.placeholder}
                                        disabled={field.isDisable}
                                    />
                                )}
                                {field.type === "multiSelectedDropdown" && (
                                    <CustomMultiSelected
                                        label={field.label}
                                        required={field.isRequired}
                                        placeholder={field.placeholder}
                                        options={field.options}
                                        onChange={handleMultiChange}
                                    />
                                )}

                                {field.type === "dropdown" && field.showDropdown && (
                                    <CustomDropdown
                                        label={field.label}
                                        options={field.options}
                                        onChange={field.onChange}
                                        required={field.isRequired}
                                    />
                                )}

                                {field.type === "CustomDateField" && (
                                    <CustomDateField
                                        label={field.label}
                                        required={true}
                                        borderRadius={1.5}
                                        height={37.5}
                                        textProps={{ fontSize: "13px", marginBottom: 0.5 }}
                                    />
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            <DeductionType deductionType={deductionType} months={months} />

            <Box
                sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}
            >
                <CustomButton
                    bgColor="secondary"
                    sx={buttonStyle}
                    startIcon={<MoveLeft />}
                    onClick={() => handleClick(false)}
                >
                    Back
                </CustomButton>
                <CustomButton
                    endIcon={<Check />}
                    sx={buttonStyle}
                    onClick={() => handleClick(true)}

                >
                    Done
                </CustomButton>
            </Box>
        </Box>
    );
};

const buttonStyle = {
    padding: "8px 20px",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: 500,
    boxShadow: "0px 2px 6px 0px rgba(115, 103, 240, 0.30)",
};

export default FoodPermitDeductionForm;
