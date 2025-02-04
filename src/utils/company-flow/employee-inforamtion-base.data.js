import { ClipboardPlus, FileText, Home, Mail, MapPin, Phone, ShieldCheck, Star, User, Webcam } from "lucide-react";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import { uuid } from "../cmmon";

export const empInfoBaseTableData = [
    {
        id: "AB0001",
        fullName: "Saleem Akhtar Muhammad Miskeen",
        image: "/images/profile-f-f.png",
        email: "saleem@gmail.com",
        resident: "UAE",
        drivingLicense: "879343",
        passportNumber: "TA1822801",
        phoneNumber: "+971 986556465",
        employeeType: "Rider",
    },
    {
        id: "AB0002",
        fullName: "Saleem Akhtar Muhammad Miskeen",
        image: "/images/profile-f.jpg",
        email: "saleem@gmail.com",
        resident: "UAE",
        drivingLicense: "879343",
        passportNumber: "TA1822801",
        phoneNumber: "+971 986556465",
        employeeType: "Rider",
    },
    {
        id: "AB0003",
        fullName: "Saleem Akhtar Muhammad Miskeen",
        image: "/images/profile-m.jpg",
        email: "saleem@gmail.com",
        resident: "UAE",
        drivingLicense: "879343",
        passportNumber: "TA1822801",
        phoneNumber: "+971 986556465",
        employeeType: "Rider",
    },
    {
        id: "AB0004",
        fullName: "Saleem Akhtar Muhammad Miskeen",
        image: "/images/profile-m-m.png",
        email: "saleem@gmail.com",
        resident: "UAE",
        drivingLicense: "879343",
        passportNumber: "TA1822801",
        phoneNumber: "+971 986556465",
        employeeType: "Rider",
    },
    {
        id: "AB0005",
        fullName: "Saleem Akhtar Muhammad Miskeen",
        image: "/images/profile-f.jpg",
        email: "saleem@gmail.com",
        resident: "UAE",
        drivingLicense: "879343",
        passportNumber: "TA1822801",
        phoneNumber: "+971 986556465",
        employeeType: "Rider",
    },
];

export const actionMenuItems = [
    { label: "View Details", action: "view_details" },
    { label: "Asset Clearance", action: "asset_clearance" },
    { label: "Asset Allocation", action: "asset_allocation" },
    { label: "Advance Salary Request", action: "advance_salary_request" },
    { label: "Driving Licence Request", action: "driving_licence_request" },
    { label: "Employee Clearance Form", action: "employee_clearance_form" },
    { label: "Transfer of Platform", action: "transfer_of_platform" },
    { label: "Food Permit Deduction Form", action: "food_permit_deduction_form" },
    { label: "General Deduction Form", action: "general_deduction_form" },
    {
        label: "Passport Temp Return Request",
        action: "passport_temp_return_request",
    },
    { label: "Passport Acceptance", action: "passport_acceptance" },
    { label: "Special Allowance", action: "special_allowance" },
    { label: "Visa Loan", action: "visa_loan" },
    { label: "Complaint Module", action: "complaint_module" },
];

export const menuItems = [
    { label: "Employee Transfer Form", action: "employee_transfer_form" },
    { label: "Food Permit Deduction", action: "food_permit_deduction" },
    { label: "General Deduction", action: "general_deduction" },
    { label: "Passport Return", action: "passport_return" },
    { label: "Passport Acceptance", action: "passport_acceptance" },
    { label: "Payroll", action: "payroll" },
    { label: "Special Allowance Form", action: "special_allowance_form" },
    { label: "Visa Loan Form", action: "visa_loan_form" },
];

export const detailsTabs = [
    { id: uuid(), label: "EMP Personal Info", icon: <User size={16} /> },
    {
        id: uuid(),
        label: "Assets",
        icon: <ShoppingBasketOutlinedIcon sx={{ fontSize: 16 }} />,
    },
    { id: uuid(), label: "Insurance", icon: <ClipboardPlus size={16} /> },
    {
        id: uuid(),
        label: "Ledger",
        icon: <ArticleOutlinedIcon sx={{ fontSize: 16 }} />,
    },
    { id: uuid(), label: "EMP Request", icon: <ShieldCheck size={16} /> },
    { id: uuid(), label: "Platform", icon: <Star size={16} /> },
    {
        id: uuid(),
        label: "Salary Slip",
        icon: <TurnedInNotOutlinedIcon sx={{ fontSize: 16 }} />,
    },
    { id: uuid(), label: "Complains", icon: <FileText size={16} /> },
];

export const ledgerTable = [
    {
        id: uuid(),
        date: "31 Mar, 2024",
        ref: "ABDS-0",
        narration: "NA",
        debit: "0.00",
        credit: "0.00",
        balance: "0.00",
    },
    {
        id: uuid(),
        date: "02 Apr, 2024",
        ref: "ABDS-1",
        narration: "NA",
        debit: "0.00",
        credit: "0.00",
        balance: "0.00",
    },
    {
        id: uuid(),
        date: "06 Apr, 2024",
        ref: "ABDS-2",
        narration: "NA",
        debit: "0.00",
        credit: "0.00",
        balance: "0.00",
    },
    {
        id: uuid(),
        date: "16 Apr, 2024",
        ref: "ABDS-3",
        narration: "NA",
        debit: "0.00",
        credit: "0.00",
        balance: "0.00",
    },
    {
        id: uuid(),
        date: "20 Apr, 2024",
        ref: "ABDS-4",
        narration: "NA",
        debit: "0.00",
        credit: "0.00",
        balance: "0.00",
    },
    {
        id: uuid(),
        date: "31 Mar, 2024",
        ref: "ABDS-5",
        narration: "NA",
        debit: "0.00",
        credit: "0.00",
        balance: "0.00",
    },
];
export const empRequestTableData = [
    {
        id: uuid(),
        date: "12/08/2024",
        visaLoan: "Visa Loan",
        reasonOfLoan: "Any",
        amount: "7000",
        createdBy: {
            image: "/images/profile-m-m.png",
            name: "Adil Dildar Dildar Hussain ",
            email: "adli@gmail.com",
        },
        status: "Pending",
    },
    {
        id: uuid(),
        date: "12/08/2024",
        visaLoan: "Advance Salary",
        reasonOfLoan: "Any",
        amount: "7000",
        createdBy: {
            image: "/images/profile-m.jpg",
            name: "Waqar Ali Muhammad Anwar Ali ",
            email: "waqar@gmail.com",
        },
        status: "Approved",
    },
];

export const salarySlipTable = [
    {
        id: uuid(),
        bikeNo: "1713",
        bikeCity: "Sharjah",
        bikeOwnership: { image: "/images/albusayra-logo.png", name: "ABDS" },
        bikeIssueDate: "10/09/2024",
        bikeIssueTime: "10:00 AM",
        foodPermit: "Yes",
        mulkiya: "No",
        picture: "Allocation picture",
        clearnaceDate: "--",
        vendor: {
            image: "/images/profile-m.jpg",
            name: "Rafiq  Khan",
        },
        company: {
            image: "/images/careem-logo.png",
            name: "Careem",
        },
        status: "Currently Assigned",
    },
    {
        id: uuid(),
        bikeNo: "2134",
        bikeCity: "Dubai",
        bikeOwnership: { image: "/images/albusayra-logo.png", name: "ABDS" },
        bikeIssueDate: "10/09/2024",
        bikeIssueTime: "10:00 AM",
        foodPermit: "Yes",
        mulkiya: "No",
        picture: "Allocation picture",
        clearnaceDate: "12/09/2024",
        vendor: {
            image: "/images/profile-m.jpg",
            name: "Rafiq  Khan",
        },
        company: {
            image: "/images/careem-logo.png",
            name: "Careem",
        },
        status: "Close",
    },
];

export const platformData = [
    {
        id: uuid(),
        key: "Platform ID",
        value: "CA125",
        icon: <User size={20} />

    },
    {
        id: uuid(),
        key: "Platform Type",
        value: "Bike Rent",
        icon: <Star size={20} />

    },
    {
        id: uuid(),
        key: "Country",
        value: "UAE",
        icon: <Webcam size={20} />

    },
    {
        id: uuid(),
        key: "Address",
        value: "Street 08, Al Jamal Resident",
        icon: <Home size={20} />

    },
    {
        id: uuid(),
        key: "POC Phone Number",
        value: "+971 123 456 7890",
        icon: <Phone size={20} />

    },
    {
        id: uuid(),
        key: "Platform Name",
        value: "Careem",
        icon: <User size={20} />

    },
    {
        id: uuid(),
        key: "Email Address",
        value: "Abidali@gmail.com",
        icon: <Mail size={20} />

    },
    {
        id: uuid(),
        key: "City",
        value: "Dubai",
        icon: <MapPin size={20} />

    },
    {
        id: uuid(),
        key: "POC Name",
        value: "Abdul Rehman",
        icon: <User size={20} />

    },
    {
        id: uuid(),
        key: "Status",
        value: "Active",
        icon: <ShieldCheck size={20} />

    },
]