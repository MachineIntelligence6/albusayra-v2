import { custom } from '@/app/theme';
import DescriptiveText from '@/components/shared-components/DescriptiveText';
import { uuid } from '@/utils/cmmon';
import { Avatar, Box, Divider } from '@mui/material';
import { Calendar } from 'lucide-react';
import React from 'react'

const cards = [
    { id: uuid(), image: "/images/jublee-insurance.png", name: "Jubliee Insurance", type: "Health Insurance", date: ["10-09-2024", "10-09-2025"] },
    { id: uuid(), image: "/images/reliance-insurance.png", name: "Reliance Insurance", type: "Accidental Insurance", date: ["10-09-2024", "10-09-2025"] },
]


const InsuranceCardWrapper = () => {
    return (
        <Box sx={{ display: "flex", gap: 2 }}>
            {cards.map(card => (<InsuranceCard key={card.id} card={card} />))}
        </Box>
    )
}

export default InsuranceCardWrapper;


const InsuranceCard = ({ card }) => {
    return (
        <Box component="div" sx={{ bgcolor: custom.lightBlue, borderRadius: "25px", minWidth: 514, }}>
            <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", p: 3 }}>
                <Box sx={{ display: 'inline-flex', gap: 1, alignItems: 'center' }}>
                    <Avatar src={card.image} sx={{ width: 60, height: 60 }} />
                    <DescriptiveText text={card.name} fontSize={18} fontWeight={600} color={custom.light1} />
                </Box>
                <Box sx={{ px: 3, py: 0.5, bgcolor: custom.white, borderRadius: 4 }}>
                    <DescriptiveText text={card.type} fontSize={14} fontWeight={500} color="black" />
                </Box>

            </Box>
            <Divider color={custom.light1} />

            <Box sx={{ p: 3, display: 'flex', flexDirection: "column", gap: 2 }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', justifyContent: "flex-start" }}>
                        <Calendar size={22} color={custom.white} />
                        <DescriptiveText text="Insurance Start Date" color={custom.white} />
                    </Box>

                    <DescriptiveText text={card?.date[0]} color={custom.white} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', justifyContent: "flex-start" }}>
                        <Calendar size={22} color={custom.white} />
                        <DescriptiveText text="Insurance End Date" color={custom.white} />
                    </Box>

                    <DescriptiveText text={card?.date[1]} color={custom.white} />
                </Box>
            </Box>
        </Box >
    )
}
