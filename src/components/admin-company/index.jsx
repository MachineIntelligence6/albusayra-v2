import React, { useEffect } from "react";
import { custom } from "@/app/theme";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import StateCard from "./StateCard";
import CompanyTableWrapper from "./CompanyTableWrapper";
import CompanyDetailCard from "./CompanyDetailCard";
import { getCompanyById } from "@/redux/reducers/companies/companyThunk";
import { useSearchParams } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import Loader from "@/utils/reusable-functions/Loader";

const AdminCompany = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { loading, getDataById } = useSelector((state) => state.companySlice);
  const getUserId = searchParams.get("id");

  useEffect(() => {
    if (getUserId) {
      dispatch(getCompanyById(getUserId));
    }
  }, [dispatch]);

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid size={3} sx={{ bgcolor: custom.deepBlue, borderRadius: 4 }}>
          <Box className="flex justify-center items-center h-full">
            {loading ? (
              <Loader size="large" />
            ) : (
              <CompanyDetailCard getDataById={getDataById} />
            )}
          </Box>
        </Grid>
        <Grid size={9} sx={{}}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <StateCard />
          </Box>
          <CompanyTableWrapper />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminCompany;
