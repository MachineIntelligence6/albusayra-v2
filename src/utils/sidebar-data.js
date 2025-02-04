import {
  AssetMenuIcon,
  AssetMenuIcon2,
  DashboardMenuIcon,
  EmployeesMenuIcon,
} from "./Icons";

export const adminMenuData = [
  {
    id: "1",
    title: "Companies",
    url: "/admin/companies", // Simple route
    icon: "/sidebarIcons/svg/office.svg",
  },
  {
    id: "2",
    title: "Campaigns",
    icon: "/sidebarIcons/svg/campaign.svg",
    item: [
      { id: "2-1", label: "Campaign List", url: "/admin/campaigns" },
      {
        id: "2-2",
        label: "Campaign Users",
        url: "/admin/campaigns/campaigns-users",
      },
      {
        id: "2-3",
        label: "Not Qualified",
        url: "/admin/campaigns/not-qualified",
      },
    ],
  },
  {
    id: "3",
    title: "Applicants",
    icon: "/sidebarIcons/svg/users.svg",
    item: [
      {
        id: "3-1",
        label: "Shortlisted",
        url: "/admin/applicants/shortlisted-applicants",
      },
      {
        id: "3-2",
        label: "Final Review",
        url: "/admin/applicants/final-review",
      },
      { id: "3-3", label: "Hold", url: "/admin/applicants/hold" },
      {
        id: "3-4",
        label: "Not Qualified",
        url: "/admin/applicants/not-qualified",
      },
    ],
  },
  {
    id: "4",
    title: "Employees",
    icon: "/sidebarIcons/svg/user.svg",
    item: [
      {
        id: "4-1",
        label: "Incomplete Profile",
        url: "/admin/employees/incomplete-profile",
      },
      { id: "4-2", label: "Active Employees", url: "/admin/employees" },
      {
        id: "4-3",
        label: "Inactive Employees",
        url: "/admin/employees/inactive-employee",
      },
    ],
  },
  {
    id: "5",
    title: "Inventory",
    icon: "/sidebarIcons/svg/archive.svg",
    item: [
      { id: "5-1", label: "Dashboard", url: "/admin/inventory" },
      {
        id: "5-2",
        label: "Inventory List",
        url: "/admin/inventory/inventory-list",
      },
    ],
  },
  {
    id: "6",
    title: "Corporate",
    icon: "/sidebarIcons/svg/user-info.svg",
    item: [
      { id: "6-1", label: "Vendors", url: "/admin/corporate" },
      { id: "6-2", label: "Platforms", url: "/admin/corporate/platforms" },
    ],
  },
  {
    id: "7",
    title: "Challans",
    icon: "/sidebarIcons/svg/cash.svg",
    item: [
      { id: "7-1", label: "Salik", url: "/admin/challans" },
      { id: "7-2", label: "Traffic", url: "/admin/challans/traffic" },
    ],
  },
  {
    id: "8",
    title: "Users",
    icon: "/sidebarIcons/svg/users.svg",
    item: [
      { id: "8-1", label: "Active User", url: "/admin/users/active-users" },
      { id: "8-2", label: "Inactive User", url: "/admin/users/inactive-users" },
      {
        id: "8-3",
        label: "Roles Template",
        url: "/admin/users/roles-template",
      },
    ],
  },
  {
    id: "9",
    title: "Configuration",
    url: "/admin/configuration", // Simple route
    icon: "/sidebarIcons/svg/settings.svg",
  },
];

export const companyMenuData = [
  {
    id: "1",
    title: "Dashboard",
    url: "/dashboard", // Simple route
    icon: "/sidebarIcons/company/dashboard.svg",
  },
  {
    id: "2",
    title: "Employees",
    icon: "/sidebarIcons/company/user.svg",
    item: [
      { id: "2-1", label: "Employees", url: "/employees" },
      { id: "2-2", label: "Advance Salary", url: "/employees/advance-salary" },
      {
        id: "2-3",
        label: "Driving License Request",
        url: "/employees/driving-license-request",
      },
      // { id: "2-4", label: "EMP Ledger", url: "/employees/emp-ledger" },
      {
        id: "2-5",
        label: "Employee Clearance",
        url: "/employees/employee-clearance",
      },
      {
        id: "2-6",
        label: "Employee Information Base",
        url: "/employees/employee-information-base",
      },
      {
        id: "2-7",
        label: "Employee Transfer",
        url: "/employees/employee-transfer",
      },
      {
        id: "2-8",
        label: "Food Permit Deduction",
        url: "/employees/food-permit-deduction",
      },
      {
        id: "2-9",
        label: "General Deduction",
        url: "/employees/general-deduction",
      },
      {
        id: "2-10",
        label: "Passport Return",
        url: "/employees/passport-return",
      },
      {
        id: "2-11",
        label: "Passport Acceptance",
        url: "/employees/passport-acceptance",
      },
      { id: "2-12", label: "Payroll", url: "/employees/payroll" },
      {
        id: "2-13",
        label: "Special Allowance",
        url: "/employees/special-allowance",
      },
      { id: "2-14", label: "Loan", url: "/employees/loan" },
    ],
  },
  {
    id: "3",
    title: "Asset Allocation",
    url: "/asset-allocation",
    icon: "/sidebarIcons/company/clearance.svg",
  },
  {
    id: "4",
    title: "Asset Clearance",
    url: "/asset-clearance",
    icon: "/sidebarIcons/company/allocation.svg",
  },
];
