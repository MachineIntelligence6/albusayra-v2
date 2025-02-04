// import DoubleChevronUp from '@/components/shared-components/DoubleChevronUp'
// import { inventoyBikeData } from '@/utils/vendor-detail'
// import { Avatar, Box, Divider, Icon, Typography } from '@mui/material'
// import { ChevronUp } from 'lucide-react'
// import React from 'react'

// const DetailsCard = () => {
//     return (
//         <Box component="div" sx={{
//             bgcolor: "#062A47",
//             boxShadow: "0px 4px 18px 0px rgba(75, 70, 92, 0.10)",
//             borderRadius: "25px",
//             display: "flex",
//             flexDirection: "column",
//             gap: "14px",
//             color: "#F2F2F2",
//             // height: "90vh"
//             // minWidth: 400
//         }}>

//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pr: 2 }}>
//                 <Box
//                     sx={{
//                         display: "flex",
//                         gap: 2,
//                         padding: "18px",
//                         alignItems: 'center'
//                     }}
//                 >
//                     <Avatar
//                         src="/icon1.png"
//                         sx={{
//                             width: 70,
//                             height: 70,
//                             border: "2px solid white",
//                             borderRadius: "50%",
//                         }}
//                     />
//                     <Typography variant='h5'>Al Busayra</Typography>

//                 </Box>

//                 <DoubleChevronUp />
//             </Box>
//             <Divider color="white" />
//             {inventoyBikeData?.map((item, index) => (
//                 <React.Fragment key={index}>
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             padding: "6px 24px",
//                             marginBottom:
//                                 index === inventoyBikeData.length - 1 ? "16px" : "0", // Add margin at the bottom of the last item
//                         }}
//                     >
//                         <Typography
//                             sx={{
//                                 color: "rgba(255, 255, 255, 0.70)",
//                                 fontSize: "13px",
//                                 fontWeight: 500,
//                             }}
//                         >
//                             {item.label}
//                         </Typography>
//                         <Typography
//                             sx={{
//                                 color: "rgba(255, 255, 255, 0.90)",
//                                 fontSize: "13px",
//                                 fontWeight: 500,
//                                 ...item.value === "Active" && {
//                                     px: 1.5,
//                                     borderRadius: 1,
//                                     bgcolor: "#28C76F",
//                                     cursor: "pointer"
//                                 }

//                             }}
//                         >
//                             {item.value}
//                         </Typography>
//                     </Box>
//                     {index !== inventoyBikeData.length - 1 && (
//                         <Divider color="#F2F2F2" />
//                     )}
//                 </React.Fragment>
//             ))}
//         </Box>
//     )
// }

// export default DetailsCard
