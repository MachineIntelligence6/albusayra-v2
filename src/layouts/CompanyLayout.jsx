import React from 'react'
import SidebarMenu from '@/components/SidebarMenu'
import { companyMenuData } from '@/utils/sidebar-data'
import { Box } from '@mui/material'

const CompanyLayout = ({ children }) => {
    return (<Box
        sx={{
            display: "flex",
            minHeight: "100vh",
            width: "100vw",
            bgcolor: "#23567F",
            // overflow: "auto",
        }}
        key={"company-layout"}
    >
        <SidebarMenu adminMenuData={companyMenuData} portal="company" />
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                bgcolor: "#23567F",
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                width: "calc(100vw - 300px)",
            }}
        >
            <Box
                sx={{
                    bgcolor: "#F8F7FA",
                    flexGrow: 1,
                    borderRadius: 7,
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {children}
            </Box>
        </Box>
    </Box>
    )
}

export default CompanyLayout
