import AdminDashboard from "@/components/admin-dashboard";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Box>
      <AdminDashboard />
      <Typography variant="h3">This screen is not developer so far </Typography>
      <Link href="/login" color="blue">
        Click here to redirect to campagins page
      </Link>
    </Box>
  );
}
