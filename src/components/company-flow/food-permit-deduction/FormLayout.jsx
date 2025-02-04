import React from 'react'
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { custom } from '@/app/theme';
import FoodPermitDeductionForm from './FoodPermitDeductionForm';
import { AssetClearanceData } from '@/utils/company-flow/asset-clarance-data';
import FoodPermitSideCard from './FoodPermitSideCard';

const FormLayout = () => {
    return (
        <Box component="div" sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid size={3} >
                    <FoodPermitSideCard
                        avatarSrc="/company/asset-clearence/man.svg"
                        name="Saleem Akhtar Muhammad Miskeen"
                        email="saleemakhtar@gmail.com"
                        contractData={AssetClearanceData}
                    />
                </Grid>
                <Grid size={9} sx={{ pt: 2, pb: 4, px: 2, boxShadow: "0px 2px 8px 0px #2F2B3D1F", borderRadius: 4, height: "fit-content" }}>
                    <FoodPermitDeductionForm />
                </Grid>
            </Grid>
        </Box>
    )
}

export default FormLayout
