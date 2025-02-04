"use client";
import React, { useEffect, useMemo, useState } from "react";
import CustomButton from "@/components/shared-components/CustomButton";
import ExpandableTable from "@/components/shared-components/Table-components/ExpandableTable";
import TableExportRow from "@/components/shared-components/Table-components/TableExportRow";
import TableFilters from "@/components/shared-components/Table-components/TableFilters";
import { Box, Divider, Typography } from "@mui/material";
import { ChevronDown } from "lucide-react";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import ActionMenu from "@/components/shared-components/ActionMenu";
import {
  childData,
  dashboardTableData,
} from "@/utils/hard-data/inventory-data";
import { useRouter } from "next/navigation";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import CustomDropdownButton from "@/components/shared-components/CustomDropdownButton";
import { useDispatch, useSelector } from "react-redux";
import {
  GenericGetVendorDropdown,
  getByHeaderAndSectionAndKey,
  getCityByCountryId,
  getCountriesByStatus,
} from "@/redux/reducers/dataBank/dataBankThunk";

const DashboardTable = ({
  inventoryModuleName,
  setAppliedFilters,
  setSelectedStatus,
  selectedStatus,
  statusButtons,
  tableData,
}) => {
  const {
    getCountryByStatuses: countryData,
    getCityByCountry: cityData,
    getGenericDropdowns: platformTypeData,
    getGenericDropdowns: bikeTypeData,
    vendorOptionsData: venderData,
  } = useSelector((state) => state.dataBankSlice);
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  // const [selectedStatus, setSelectedStatus] = useState(statusButtons[0]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [bikeTypeOptions, setBikeTypeOptions] = useState([]);
  const [simTypeOptions, setSimTypeOptions] = useState([]);
  const [vendorOptions, setVendorOptions] = useState([]);
  const [filters, setFilters] = useState([]);
  const filtersList = filters || [];
  const handleApplyFilters = (filters) => {
    const appliedFilters = Object.entries(filters)
      .map(([filterId, value]) => {
        const filter = (filtersList || []).find(
          (f) => f.id === Number(filterId)
        );
        return filter ? { filterName: filter.filterName, value } : null;
      })
      .filter(Boolean);

    setAppliedFilters(appliedFilters);
  };
  useEffect(() => {
    dispatch(getCountriesByStatus({ page: 1, pageLength: 1000, statuses: 1 }));
    const sectionName = "Inventory";
    const sectionValue =
      inventoryModuleName === "Bike" ? "BikeType" : "SimOwnership";
    dispatch(
      getByHeaderAndSectionAndKey({
        sectionName: sectionName, // Section name for filter2
        sectionValue: sectionValue, // Section value for filter3
      })
    );
    // dispatch(getPlatformDropdown({ page: 1, pageLength: 1000, statuses: 1 }));
  }, [dispatch, inventoryModuleName]);
  // Update country options
  useEffect(() => {
    if (countryData?.length > 0) {
      const formattedOptions = countryData.map((country) => ({
        value: country.id,
        label: country.countryName,
      }));
      setCountryOptions(formattedOptions);
    }
  }, [countryData]);
  useEffect(() => {
    if (cityData?.length > 0) {
      const formattedOptions = cityData.map((city) => ({
        value: city.id,
        label: city.cityName,
      }));
      setCityOptions(formattedOptions);
    }
  }, [cityData]);
  // Bike type options
  useEffect(() => {
    if (inventoryModuleName === "Bike" && bikeTypeData?.length > 0) {
      const formattedOptions = bikeTypeData.map((platform) => ({
        value: platform.value,
        label: platform.value,
      }));
      setBikeTypeOptions(formattedOptions);
    } else if (inventoryModuleName === "Sim" && bikeTypeData?.length > 0) {
      const formattedOptions = bikeTypeData.map((platform) => ({
        value: platform.value,
        label: platform.value,
      }));
      setSimTypeOptions(formattedOptions);
    }
  }, [bikeTypeData, inventoryModuleName]);
  // Vendor type options
  useEffect(() => {
    if (venderData?.length > 0) {
      const formattedOptions = venderData?.map((platform) => ({
        value: platform.id,
        label: platform.vendorName,
      }));
      setVendorOptions(formattedOptions);
    }
  }, [venderData]);
  useEffect(() => {
    const params = { page: 1, pageLength: 1000, statuses: 1 };
    dispatch(GenericGetVendorDropdown(params));
  }, [dispatch]);
  const handleCountryChange = (countryId) => {
    dispatch(
      getCityByCountryId({
        statuses: 1,
        parentId: countryId,
      })
    );
  };
  const handleActionClick = (obj) => {
    console.log(obj);
    if (obj.action === "company_stats") router.push("/admin/inventory/company");
  };

  const MenuItems = useMemo(
    () => [
      { label: "Company Stats", action: "company_stats" },
      { label: "Vendor Stats", action: "vendor_stats" },
    ],
    []
  );

  const parentColumns = useMemo(() => {
    return [
      {
        field: "companyName",
        headerName: "Company Name",
        render: (row) => {
          return (
            <CustomAvatar
              fullName={row.companyName}
              email={row.companyEmail}
              image={row.icon}
            />
          );
        },
      },
      {
        field: "totalBikes",
        headerName: "Total",
      },
      {
        field: "allocatedBikes",
        headerName: "Allocated Bikes",
      },
      {
        field: "inactiveInventory",
        headerName: "In active Bikes",
      },
      {
        field: "availableInventory",
        headerName: "Available Inventory",
      },
      {
        field: "availableInventory",
        headerName: "Actions",
        render: () => (
          <ActionMenu
            menuItems={MenuItems}
            onMenuItemClick={handleActionClick}
          />
        ),
      },
    ];
  }, []);
  const childColumns = useMemo(() => {
    return [
      {
        field: "vendorName",
        headerName: "Vendor Name",
        render: (row) => {
          return (
            <CustomAvatar
              fullName={row.vendorName}
              email={row.vendorEmail}
              image={row.icon}
            />
          );
        },
      },
      {
        field: "totalBikes",
        headerName: "Total",
      },
      {
        field: "allocatedBikes",
        headerName: "Allocated Bikes",
      },
      {
        field: "inactiveInventory",
        headerName: "In active Bikes",
      },
      {
        field: "availableInventory",
        headerName: "Available Inventory",
      },
    ];
  }, [MenuItems, handleActionClick]);
  useEffect(() => {
    if (inventoryModuleName === "Bike") {
      setFilters([
        {
          id: 1,
          filterName: "Bike Plate Number ",
          placeholder: "Enter Bike Plate Number",
        },
        {
          id: 2,
          filterName: "Country",
          placeholder: "Select Country",
          options: countryOptions,
          onChange: (value) => handleCountryChange(value),
        },
        {
          id: 3,
          filterName: "City",
          placeholder: "Selecte City",
          options: cityOptions,
        },
        {
          id: 4,
          filterName: "Bike Type",
          placeholder: "Selecte Bike Type",
          options: bikeTypeOptions,
        },
        {
          id: 5,
          filterName: "Bike Cost",
          placeholder: "Enter Bike Cost",
        },
      ]);
    }
    if (inventoryModuleName === "Sim") {
      setFilters([
        { id: 11, filterName: "Sim Number", placeholder: "Enter Sim Number" },
        {
          id: 22,
          filterName: "Vendor Name",
          placeholder: "Selecte Vendor Name",
          options: vendorOptions,
        },
        {
          id: 33,
          filterName: "Sim Ownership",
          placeholder: "Enter Sim Ownership",
          options: simTypeOptions,
        },
      ]);
    }
  }, [
    bikeTypeOptions,
    cityOptions,
    countryOptions,
    simTypeOptions,
    inventoryModuleName,
  ]);
  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        minHeight: "700px",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
        my: 4,
        pb: 2,
        borderRadius: 4,
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: "2px solid #2F2B3D1F",
        }}
      >
        <DescriptiveText
          text={selectedStatus?.label}
          fontSize={18}
          fontWeight={500}
        />
        <CustomDropdownButton
          options={statusButtons}
          selectedValue={selectedStatus}
          setSelectedValue={setSelectedStatus}
        />
      </Box>
      <Box component="div" sx={{ p: 2, borderBottom: "1px solid #2F2B3D1F" }}>
        <TableFilters
          bottomBorder={false}
          filters={filters}
          onApplyFilters={handleApplyFilters}
          isBtnSearch={true}
          isBtnSReset={true}
          multiSelect={false}
        />
      </Box>
      <Box component="div" sx={{ px: 2 }}>
        <TableExportRow isBtnAdd={false} />
      </Box>
      <ExpandableTable
        columns={parentColumns}
        data={dashboardTableData}
        nestedColumns={childColumns}
        renderNestedData={(parentId) => childData[parentId]}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        expandedRows={expandedRows}
        setExpandedRows={setExpandedRows}
        isFiltered={true}
      />
    </Box>
  );
};

export default DashboardTable;
