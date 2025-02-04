"use client"
import React from 'react'
import { custom } from '@/app/theme'
import HeadingText1 from '@/components/shared-components/HeadingText1'
import HeadingText3 from '@/components/shared-components/HeadingText3'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2'


const RegistrationLayout = ({ children }) => {
    return (
        <Box component="main" sx={{}}>
            <Grid container sx={{ p: 2 }}>
                <Grid size={8} >
                    <Box
                        component="div"
                        sx={{
                            position: 'relative',
                            backgroundImage: `url('/signupimage.jpeg')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backdropFilter: 10,
                            overflow: "hidden",
                            height: "95vh",
                            borderRadius: 7.5

                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 12 }}>
                            <HeadingText1>
                                We Leverage Our &ldquo;SMART&rdquo; Strength
                            </HeadingText1>
                            <HeadingText3 sx={{ color: custom.white, fontWeight: 400, fontSize: 25 }}>
                                of monitoring riders to our clients and partners
                            </HeadingText3>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={4} sx={{ px: 4 }}>
                    {children}
                </Grid>
            </Grid>
        </Box >
    )
}

export default RegistrationLayout
