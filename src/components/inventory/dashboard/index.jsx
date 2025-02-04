"use client";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import { Box, Divider } from "@mui/material";
import {
  Bike,
  CircleCheck,
  CircleX,
  HandCoins,
  Network,
  UsersRound,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import DashboardTable from "./DashboardTable";
import CustomDropdownButton from "@/components/shared-components/CustomDropdownButton";
import { GenericGetProductCategoryDropdown } from "@/redux/reducers/dataBank/dataBankThunk";
import { useDispatch, useSelector } from "react-redux";
import {
  InventoryDashboardGetBikeByStatusCompanyWise,
  InventoryDashboardGetBikeByStatusVendorWise,
  InventoryDashboardGetBikeCounters,
} from "@/redux/reducers/inventoryDashboard/inventoryDashboardThunk";
import { UserData } from "@/configs/UseApi";
const statusButtons = [
  { label: "Company Stats", value: "compnay_stats" },
  { label: "Vendor Stats", value: "vendor_stats" },
];

const InventoryDashboard = () => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(statusButtons[0]);
  const [appliedFilters, setAppliedFilters] = useState([]); //Advance filters
  const [selectedProduct, setSelectedProduct] = useState({
    value: "",
    label: "",
  });
  const [productType, setProductType] = useState("");
  const { productCategoryData: productData } = useSelector(
    (state) => state.dataBankSlice
  );
  useEffect(() => {
    dispatch(GenericGetProductCategoryDropdown({ statuses: 1 }));
  }, [dispatch]);
  useEffect(() => {
    if (productData?.length > 0) {
      const formattedOptions = productData.map((platform) => ({
        value: platform.id,
        label: platform.name,
      }));
      setProductType(formattedOptions);
      if (formattedOptions.length > 0) {
        setSelectedProduct(formattedOptions[0]); // Set first product as { value, label }
      }
    }
  }, [productData]);
  useEffect(() => {
    const param = {
      page: 1,
      pageLength: "",
      statuses: [1, 2],
      filter: "",
      filter2: "",
      filter3: "",
      desc: true,
      orderBy: "",
      parentId: UserData?.EntityId,
      SubParentId: "",
      SubParentId1: "",
      SubParentId2: "",
    };
    dispatch(InventoryDashboardGetBikeCounters(param));
  }, [dispatch]);
  useEffect(() => {
    const param = {
      page: 1,
      pageLength: "",
      statuses: [1, 2],
      filter: "",
      filter2: "",
      filter3: "",
      desc: true,
      orderBy: "",
      parentId: UserData?.EntityId,
      SubParentId: "",
      SubParentId1: "",
      SubParentId2: "",
    };
    dispatch(InventoryDashboardGetBikeByStatusVendorWise(param));
    dispatch(InventoryDashboardGetBikeByStatusCompanyWise(param));
  }, [dispatch]);
  const {
    dashboardBikeCounter,
    getByStatusDashboardVendor,
    getByStatusDashboardCompany,
  } = useSelector((state) => state.InventoryDashboardSlice);
  console.log("getByStatusDashboardVendor", getByStatusDashboardVendor);
  console.log("getByStatusDashboardCompany", getByStatusDashboardCompany);
  return (
    <Box>
      <Box
        sx={{
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DynamicBreadcrumb />
        {productType?.length > 0 && (
          <CustomDropdownButton
            options={productType}
            selectedValue={selectedProduct}
            setSelectedValue={setSelectedProduct}
          />
        )}
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
        {selectedProduct.label === "Bike" ? (
          <>
            <DashboardCard
              bgColor="#23567F"
              data={{
                icon: <Bike size={24} color="#23567F" />,
                text: "Total Bikes",
                count: dashboardBikeCounter?.total,
              }}
            />
            <DashboardCard
              bgColor="#338BE3"
              data={{
                icon: (
                  <Network
                    style={{ transform: "rotate(180deg)" }}
                    size={24}
                    color="#338BE3"
                  />
                ),
                text: "Allocated",
                count: dashboardBikeCounter?.allocatedBike,
              }}
            />
            <DashboardCard
              bgColor="#01AB9C"
              data={{
                icon: <CircleCheck size={24} color="#01AB9C" />,
                text: "Available Inventory",
                count: dashboardBikeCounter?.availableBike,
              }}
            />
            <DashboardCard
              bgColor="#EA5359"
              data={{
                icon: <CircleX size={24} color="#EA5359" />,
                text: "Inactive Inventory",
                count: dashboardBikeCounter?.inActiveBike,
              }}
            />
            <DashboardCard
              bgColor="#CA4F8E"
              data={{
                icon: <Bike size={24} color="#CA4F8E" />,
                text: "Own Bikes",
                count: dashboardBikeCounter?.ownBike,
              }}
            />
            <DashboardCard
              bgColor="#FFAC30"
              data={{
                icon: <HandCoins size={24} color="#FFAC30" />,
                text: "Rental Bikes",
                count: dashboardBikeCounter?.rentalBike,
              }}
            />
            <DashboardCard
              bgColor="#EF8B88"
              data={{
                icon: <UsersRound size={24} color="#EF8B88" />,
                text: "Vendors",
                count: dashboardBikeCounter?.vendors,
              }}
            />
            <DashboardCard
              bgColor="#9747FF"
              data={{
                icon: <PersonOffIcon sx={{ color: "#9747FF" }} />,
                text: "Unassigned Vendors",
                count: dashboardBikeCounter?.deAllocatedBike,
              }}
            />
          </>
        ) : (
          <>
            <DashboardCard
              bgColor="#23567F"
              data={{
                icon: <Bike size={24} color="#23567F" />,
                text: "Total Bikes",
                count: "20",
              }}
            />
            <DashboardCard
              bgColor="#338BE3"
              data={{
                icon: (
                  <Network
                    style={{ transform: "rotate(180deg)" }}
                    size={24}
                    color="#338BE3"
                  />
                ),
                text: "Allocated",
                count: "50",
              }}
            />
            <DashboardCard
              bgColor="#01AB9C"
              data={{
                icon: <CircleCheck size={24} color="#01AB9C" />,
                text: "Available Inventory",
                count: "40",
              }}
            />
            <DashboardCard
              bgColor="#EA5359"
              data={{
                icon: <CircleX size={24} color="#EA5359" />,
                text: "Inactive Inventory",
                count: "10",
              }}
            />
          </>
        )}
      </Box>
      <DashboardTable
        inventoryModuleName={selectedProduct?.label}
        setAppliedFilters={setAppliedFilters}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        statusButtons={statusButtons}
        tableData={getByStatusDashboardCompany}
      />
    </Box>
  );
};

export default InventoryDashboard;
