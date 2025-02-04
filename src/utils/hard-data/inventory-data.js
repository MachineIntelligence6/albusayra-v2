import { v4 as uuidv4 } from "uuid";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import TwoWheelerOutlinedIcon from "@mui/icons-material/TwoWheelerOutlined";
import { uuid } from "../cmmon";


export const InventoryListData = [
    {
        id: uuidv4(),
        bike_plate_no: "1213",
        picture: "img.jpg",
        isOwner: true,
        isInsuranced: true,
        cost: "$1200",
        status: true,
        allocated_company: {
            name: "Al Hamama",
            icon: "/icon2.png",
            email: "alhamama@gmail.com",
        },
        allocated_rider: {
            name: "Mujtaba",
            email: "mujtaba@gmail.com",
            icon: "/images/profile-m.jpg"
        }
    },
    {
        id: uuidv4(),
        bike_plate_no: "1213",
        picture: "img.jpg",
        isOwner: true,
        isInsuranced: true,
        cost: "$1200",
        status: false,
        allocated_company: null,
        allocated_rider: null
    },
    {
        id: uuidv4(),
        bike_plate_no: "1213",
        picture: "img.jpg",
        isOwner: true,
        isInsuranced: true,
        cost: "$1200",
        status: true,
        allocated_company: {
            name: "Al Dobya",
            icon: "/icon3.png",
            email: "aldobya@gmail.com",
        },
        allocated_rider: {
            name: "Majid",
            email: "majid@gmail.com",
            icon: "/images/profile-f.jpg"
        }
    },

];

export const inventoryViewDetails = [

    {
        id: "001",
        title: "BASIC INFORMATION",
        data: [
            {
                id: "001",
                icon: <Person3OutlinedIcon />,
                label: "Vendor Name",
                value: "Saleem Akhtar",
            },
            {
                id: "002",
                icon: <FemaleOutlinedIcon />,
                label: "Bike Purchased/Aqcuired Date",
                value: "10-09-2028",
            },
            {
                id: "003",
                icon: <CalendarMonthOutlinedIcon />,
                label: "Date of Birth",
                value: "29 Sep 1988",
            },
            {
                id: "004",
                icon: <HomeOutlinedIcon />,
                label: "Religion",
                value: "Islam",
            },
            {
                id: "005",
                icon: <MyLocationOutlinedIcon />,
                label: "Nationality",
                value: "UAE",
            },
            {
                id: "006",
                icon: <AllInclusiveOutlinedIcon />,
                label: "Marital Status",
                value: "Married",
            },
            {
                id: "012",
                icon: <HomeOutlinedIcon />,
                label: "Religion",
                value: "Islam",
            },
            {
                id: "015",
                icon: <MyLocationOutlinedIcon />,
                label: "Nationality",
                value: "UAE",
            },
            {
                id: "0235",
                icon: <AllInclusiveOutlinedIcon />,
                label: "Marital Status",
                value: "Married",
            },
            {
                id: "0043287",
                icon: <TwoWheelerOutlinedIcon />,
                label: "Employment Type",
                value: "Rider",
            },
        ],
    },
    {
        id: "002",
        title: "Bike Food Permit",
        data: [
            {
                id: "001",
                icon: <Person3OutlinedIcon />,
                label: "Vendor Name",
                value: "Saleem Akhtar",
            },
            {
                id: "002",
                icon: <FemaleOutlinedIcon />,
                label: "Bike Purchased/Aqcuired Date",
                value: "10-09-2028",
            },

        ],
    },
    {
        id: "003",
        title: "Bike Mulikaya",
        data: [
            {
                id: "001",
                icon: <Person3OutlinedIcon />,
                label: "Vendor Name",
                value: "Saleem Akhtar",
            },
            {
                id: "002",
                icon: <FemaleOutlinedIcon />,
                label: "Bike Purchased/Aqcuired Date",
                value: "10-09-2028",
            },
            {
                id: "003",
                icon: <CalendarMonthOutlinedIcon />,
                label: "Date of Birth",
                value: "29 Sep 1988",
            },

        ],
    },
    {
        id: "004",
        title: "Bike Contract",
        data: [
            {
                id: "001",
                icon: <Person3OutlinedIcon />,
                label: "Vendor Name",
                value: "Saleem Akhtar",
            },
            {
                id: "002",
                icon: <FemaleOutlinedIcon />,
                label: "Bike Purchased/Aqcuired Date",
                value: "10-09-2028",
            },
            {
                id: "003",
                icon: <CalendarMonthOutlinedIcon />,
                label: "Date of Birth",
                value: "29 Sep 1988",
            },

        ],
    },
    {
        id: "005",
        title: "Bike Insuance",
        data: [
            {
                id: "001",
                icon: <Person3OutlinedIcon />,
                label: "Vendor Name",
                value: "Saleem Akhtar",
            },
            {
                id: "002",
                icon: <FemaleOutlinedIcon />,
                label: "Bike Purchased/Aqcuired Date",
                value: "10-09-2028",
            },
            {
                id: "003",
                icon: <CalendarMonthOutlinedIcon />,
                label: "Date of Birth",
                value: "29 Sep 1988",
            },

        ],
    },
    {
        id: "006",
        title: "Other Details",
        data: [
            {
                id: "001",
                icon: <Person3OutlinedIcon />,
                label: "Vendor Name",
                value: "Saleem Akhtar",
            },
            {
                id: "002",
                icon: <FemaleOutlinedIcon />,
                label: "Bike Purchased/Aqcuired Date",
                value: "10-09-2028",
            },
            {
                id: "003",
                icon: <CalendarMonthOutlinedIcon />,
                label: "Date of Birth",
                value: "29 Sep 1988",
            },

        ],
    },
]


export const FoodPermitTable = [

    { id: uuid(), noPlate: "1713", city: "Sharjah", ownerShip: { id: uuid(), name: "ABDS", logo: "" }, dateOfIssue: "10/09/2024", picture: "IMG-001", cost: "100 AED", installmentPlan: "3 Months", status: "active" },
    { id: uuid(), noPlate: "2255", city: "Sharjah", ownerShip: { id: uuid(), name: "ABDS", logo: "" }, dateOfIssue: "10/09/2024", picture: "IMG-001", cost: "100 AED", installmentPlan: "2 Months", status: "expired" },
]

export const dashboardTableData = [
    { id: 1, companyName: "Al-Busayra", companyEmail: "albusayra@gmail.com", icon: "/icon1.png", totalBikes: "539", allocatedBikes: "500", inactiveInventory: "02", availableInventory: "38", },
    { id: 2, companyName: "Al-Hamama", companyEmail: "alhamama@gmail.com", icon: "/icon2.png", totalBikes: "647", allocatedBikes: "63", inactiveInventory: "01", availableInventory: "03", },
]

export const albusayraVendors = [
    { id: uuid(), vendorName: "ABDS", vendorEmail: "abds@gmail.com", icon: "/images/profile-m.jpg", totalBikes: "86", allocatedBikes: "83", inactiveInventory: "01", availableInventory: "02" },
    { id: uuid(), vendorName: "Auto Rent", vendorEmail: "autoorent@gmail.com", icon: "/images/profile-f.jpg", totalBikes: "40", allocatedBikes: "66", inactiveInventory: "05", availableInventory: "10" },
    { id: uuid(), vendorName: "Easy Lease", vendorEmail: "lease@gmail.com", icon: "/images/profile-m.jpg", totalBikes: "70", allocatedBikes: "45", inactiveInventory: "04", availableInventory: "14" },
    { id: uuid(), vendorName: "GM Rent", vendorEmail: "gmrent@gmail.com", icon: "/images/profile-f.jpg", totalBikes: "45", allocatedBikes: "75", inactiveInventory: "14", availableInventory: "55" },
]
export const alhamama = [
    { id: uuid(), vendorName: "Emirate Transport", vendorEmail: "emiratetrans@gmail.com", icon: "/icon3.png", totalBikes: "44", allocatedBikes: "100", inactiveInventory: "07", availableInventory: "19" },

]

export const childData = {
    1: albusayraVendors,
    2: alhamama
}


export const DashboardDetailTable = [
    {
        id: uuid(),
        bike_plate: "1245",
        bike_picture: "img.jpg",
        bike_ownership: "Yes",
        bike_insurance: "Yes",
        bike_cost: "$1200",
        status: "Allocated",
        allocated_company: {
            name: "Al Hamams",
            email: "alhamam@gmail.com",
            icon: "/icon2.png"
        },
        allocated_rider: {
            name: "Majid",
            email: "majid@gmail.com",
            icon: "/images/profile-f.jpg"
        },
        employee_id: "2311",
        bike_city: "Dubai",
        working_city: "Dubai",
    },
    {
        id: uuid(),
        bike_plate: "4541",
        bike_picture: "img.jpg",
        bike_ownership: "Yes",
        bike_insurance: "Yes",
        bike_cost: "$1200",
        status: "Allocated",
        allocated_company: {
            name: "Al Busayra",
            email: "albusayra@gmail.com",
            icon: "/icon1.png"
        },
        allocated_rider: {
            name: "Bilal",
            email: "bilal@gmail.com",
            icon: "/images/profile-m.jpg"
        },
        employee_id: "2311",
        bike_city: "Dubai",
        working_city: "Dubai",
    }
]