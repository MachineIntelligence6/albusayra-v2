import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import EmployeeDetailHeader from "./EmployeeDetailHeader";
import { detailsTabs } from "@/utils/company-flow/employee-inforamtion-base.data";
import CustomButton from "@/components/shared-components/CustomButton";
import { custom } from "@/app/theme";
import EmployeeView from "../../employees/view-employee";
import Image from "next/image";
import { DownloadIcon, FIleIcon } from "@/utils/Icons";
import { StatusIndicator } from "@/components/applicants/StatusIndicator";
import { usePathname, useRouter } from "next/navigation";
import { accordianTableData } from "@/utils/company-flow/asset-clarance-data";
import AssetsAccordion from "./AssetsAccordion";
import InsuranceCardWrapper from "./InsuranceCardWrapper";
import EmployeeLedgerTable from "./EmployeeLedgerTable";
import EmpRequestTable from "./EmpRequestTable";
import SalarySlipTable from "./SalarySlipTable";
import Complains from "./Complains";
import EmpPlatform from "./EmpPlatform";

const items = [
    {
        title: "Bike Information",
    },
    {
        title: "Sim Information",
    },
];
const EmployeeDetailsIndex = () => {
    const [value, setValue] = React.useState(0);
    const pathname = usePathname();
    const router = useRouter();



    const columns = useMemo(() => {
        return [
            {
                field: "bikePlateNo",
                headerName: "Bike Plate No",
                align: "left",
                render: (row) => (
                    <Typography variant="body2">{row.bikePlateNo}</Typography>
                ),
            },
            {
                field: "bikeCity",
                headerName: "Bike City",
                align: "left",
                render: (row) => <Typography>{row.bikeCity}</Typography>,
            },
            {
                field: "bikeOwnership",
                headerName: "Bike Ownership",
                align: "left",
                render: (row) => (
                    <Box
                        component="div"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <Image src="/challans/Avatar.png" width={20} height={20} alt="" />
                        <Typography variant="caption">ABDS</Typography>
                    </Box>
                ),
            },
            {
                field: "bikeIssueDate",
                headerName: "Date of Bike Issue",
                align: "left",
                render: (row) => <Typography>{row.bikeIssueDate}</Typography>,
            },
            {
                field: "bikeIssueTime",
                headerName: "Time of Bike Issue",
                align: "left",
                render: (row) => <Typography>{row.bikeIssueTime}</Typography>,
            },
            {
                field: "foodPermit",
                headerName: "Food Permit Provided To Rider",
                align: "left",
                render: (row) => <Typography>{row.foodPermit}</Typography>,
            },
            {
                field: "mulkiyaProvided",
                headerName: "Mulkiya Provided To Rider",
                align: "left",
                render: (row) => <Typography>{row.mulkiyaProvided}</Typography>,
            },
            {
                field: "allocationPicture",
                headerName: "Picture Of Physical Allocation To Rider",
                align: "left",
                render: (row) => (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={row.allocationIcon}
                            alt="Allocation"
                            style={{ height: 20 }}
                        />
                        <Typography sx={{ ml: 1 }}>{row.allocationText}</Typography>
                    </Box>
                ),
                render: (row) => (
                    <Box
                        component="div"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <FIleIcon />
                        <Typography variant="caption">
                            {row?.pictureOfAllocation.text || "Challan"}
                        </Typography>
                        <DownloadIcon size={20} />
                    </Box>
                ),
            },
            {
                field: "clearanceDate",
                headerName: "Clearance Date",
                align: "left",
                render: (row) => <Typography>{row.clearanceDate || "--"}</Typography>,
            },
            {
                field: "vendor",
                headerName: "Rider Acquiring Vendor",
                align: "left",
                render: (row) => (
                    <Box
                        component="div"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <Image
                            src="/company/asset-clearence/man.svg"
                            width={20}
                            height={20}
                            alt=""
                        />
                        <Typography>{row.riderAcquiringVendor.name}</Typography>
                    </Box>
                ),
            },
            {
                field: "companyName",
                headerName: "Rider Acquiring Company",
                align: "left",
                render: (row) => (
                    <Box
                        component="div"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <Image
                            src="/company/asset-clearence/man.svg"
                            width={20}
                            height={20}
                            alt=""
                        />
                        <Typography>{row.riderAcquiringCompany.name}</Typography>
                    </Box>
                ),
            },
            {
                field: "status",
                headerName: "Status",
                align: "left",
                render: (row) => (
                    <StatusIndicator status={row.status} pathname={pathname} />
                ),
            },
        ];
    }, []);

    return (
        <Box>
            {/* Header Section */}
            <EmployeeDetailHeader
                fullName="Saleem Akhtar Muhammad Miskeen"
                description="saleemakhtar1234@gmail.com"
                profileImage={"/icons/abidpic.png"}
                sx={{
                    borderRadius: 1.5,
                    boxShadow: "0px 4px 10px 0px #00000026",
                }}
            />

            {/* Tabs Section */}
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderColor: "divider" }}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        {detailsTabs.map((tab, index) => (
                            <CustomButton
                                key={tab.id}
                                startIcon={tab.icon}
                                sx={{
                                    backgroundColor:
                                        value === index ? custom.deepBlue : "transparent",
                                    color: value === index ? custom.white : custom.secondaryText,
                                    borderRadius: 1.5,
                                    fontSize: 14,
                                    fontWeight: 500,
                                }}
                                onClick={() => setValue(index)}
                            >
                                {tab.label}
                            </CustomButton>
                        ))}
                    </Box>
                </Box>

                {/* Tab Panels */}
                {detailsTabs.map((tab, index) => (
                    <CustomTabPanel key={tab.id} value={value} index={index}>
                        <Box sx={{ my: 2 }}>
                            {tab.label === "EMP Personal Info" ? (
                                <EmployeeView isHeader={false} padding={0} />
                            ) : tab.label === "Assets" ? (
                                <AssetsAccordion
                                    column={columns}
                                    data={accordianTableData}
                                    items={items}
                                />
                            ) : tab.label === "Insurance" ? (
                                <InsuranceCardWrapper />
                            ) : tab.label === "Ledger" ? (
                                <EmployeeLedgerTable />
                            ) : tab.label === "EMP Request" ? (
                                <EmpRequestTable />
                            ) : tab.label === "Platform" ? (
                                <EmpPlatform />
                            ) : tab.label === "Salary Slip" ? (
                                <SalarySlipTable />
                            ) : tab.label === "Complains" ? (
                                <Complains />
                            ) : null}
                        </Box>
                    </CustomTabPanel>
                ))}
            </Box>
        </Box>
    );
};

export default EmployeeDetailsIndex;

// Accessibility props for Tabs (if needed in the future)
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

// Custom Tab Panel Component
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </Box>
    );
}
