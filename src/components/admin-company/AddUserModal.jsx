import React, { createElement } from 'react'
import VendorModal from '../shared-components/modals/VendorModalWrapper'
import { Box } from '@mui/material'
import CustomTextField from '../shared-components/CustomTextField';
import CustomMultiSelected from '../shared-components/CustomMultiSelected';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CaptionText from '../shared-components/CaptionText';
import { addUserSchema } from '@/utils/schemas/addCopmanyUser.schema';
import CustomSelect from '../shared-components/CustomSelect';
import ImageUpload from '../applicants/ImageUpload';
import CustomCountryCodeInput from '../shared-components/CustomCountryCodeInput';
import { countryCodes } from '@/utils/hard-data/common';

const fields = [
    {
        label: "User Type",
        name: "user_type",
        required: true,
        placeholder: "533225",
        component: CustomSelect,
    },
    {
        label: "Role",
        name: "role",
        required: true,
        placeholder: "Administration",
        component: CustomSelect,
    },
    {
        label: "Full Name",
        name: "full_name",
        required: true,
        placeholder: "Abid Khan",
        component: CustomTextField,

    },
    {
        label: "Email Address",
        name: "email_address",
        required: true,
        placeholder: "careem@gmail.com",
        component: CustomTextField,
    },

    {
        label: "Phone Number",
        name: "[hone_number]",
        placeholder: "123 456 7890",
        required: true,
        component: CustomCountryCodeInput,
        countryCodes
    },
    {
        label: "Country",
        name: "cuntry",
        required: true,
        placeholder: "United Arab Emirates",
        options: [
            { value: "United Arab Emirates", label: "United Arab Emirates" },
            { value: "Pakistan", label: "Pakistan" },
            { value: "Indai", label: "India" },
            { value: "Afghanitan", label: "Afghanitan" },
        ],
    },
    {
        label: "State/Province",
        name: "State/Province",
        required: true,
        placeholder: "Dubia",
        component: CustomSelect,
        options: [
            { value: "islamabad", label: "Islamabad" },
            { value: "rawalpindi", label: "RawalPindi" },
            { value: "peshawar", label: "Peshawar" },
            { value: "swat", label: "Swat" },
        ],
    },
    {
        label: "City",
        name: "City",
        required: true,
        placeholder: "Dubia",
        component: CustomSelect,
        options: [
            { value: "islamabad", label: "Islamabad" },
            { value: "rawalpindi", label: "RawalPindi" },
            { value: "peshawar", label: "Peshawar" },
            { value: "swat", label: "Swat" },
        ],
    },
    {
        label: "Status",
        name: "status",
        required: true,
        placeholder: "Active",
        component: CustomSelect,
        options: [
            { value: "Active", label: "Active" },
            { value: "In_active", label: "In active" },
        ],
    },
    {
        label: "Company",
        name: "company",
        placeholder: 'Al busayra',
        required: true,
        component: CustomMultiSelected,
        options: [
            { value: "Albusayra", label: "Al Busayra" },
            { value: "Careem", label: "Careem" },
            { value: "InDrive", label: "InDrive" },

        ],
    },

];
const AddUserModal = ({ open, onClose }) => {

    const form = useForm({
        resolver: yupResolver(addUserSchema),
        mode: 'onChange',
    })

    return (
        <VendorModal
            open={open}
            onClose={onClose}
            title="Add User"
        >
            <Box sx={{ width: "100%", my: 5 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Controller
                        name="profileImage"
                        control={form.control}
                        render={({ field, fieldState: { error } }) => (
                            <ImageUpload
                                uploadedImage={field.value}
                                onFileChange={(file) => console.log("file", file)}
                                error={error?.message || null}
                            />
                        )}
                    />
                </Box>
                {fields.map(({ label, name, required, placeholder, options, component = CustomSelect }, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", mt: "1rem" }}>
                        <Box sx={{ flex: "0 0 40%", textalign: "left", paddingRight: "1rem" }}>
                            <CaptionText text={label} required />
                        </Box>
                        <Box sx={{ flex: "1", width: "80%" }}>
                            <Controller
                                name={name}
                                control={form.control}
                                defaultValue=""
                                render={({ field, fieldState: { error } }) =>
                                    createElement(component, {
                                        value: field.value,
                                        onChange: field.onChange,
                                        placeholder,
                                        options,
                                        countryCodes,
                                        error,

                                    })
                                }
                            />
                        </Box>
                    </Box>
                ))}
            </Box>

        </VendorModal>

    )
}

export default AddUserModal
