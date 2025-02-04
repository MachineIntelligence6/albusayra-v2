"use client"
import React from 'react'
import { Box } from '@mui/material'
import { adminMenuData } from '@/utils/sidebar-data'
import SidebarMenu from '@/components/SidebarMenu'
import { usePathname } from 'next/navigation';

const AdminLayout = ({ children }) => {
    const pathname = usePathname();
    if (pathname.startsWith('/admin/campaigns/registration-form')) {
        return children;
    } else {
        return (
            <Box
                sx={{
                    display: "flex",
                    minHeight: "100vh",
                    width: "100vw",
                    bgcolor: "#23567F",
                    overflow: "hidden",
                }}
                key={"admin-layout"}
            >
                <SidebarMenu adminMenuData={adminMenuData} />
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
                            p: 3,
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




}

export default AdminLayout
