"use client";
import ActionMenu from "@/components/shared-components/ActionMenu";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import TableExportRow from "@/components/shared-components/Table-components/TableExportRow";
import TableFilters from "@/components/shared-components/Table-components/TableFilters";
import { InventoryListData } from "@/utils/hard-data/inventory-data";
import { Box, Typography } from "@mui/material";
import { Download, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import DataGridTable from "@/components/shared-components/Table-components/DataGridTable";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  GenericGetAdvancefilterDropdown,
  GenericGetVendorDropdown,
  getByHeaderAndSectionAndKey,
  getCityByCountryId,
  getCountriesByStatus,
} from "@/redux/reducers/dataBank/dataBankThunk";
import {
  InventoryExportInventoryListBike,
  InventoryExportInventoryListSim,
} from "@/redux/reducers/inventory/inventoryThunk";
import toast from "react-hot-toast";

const MenuItems = [
  { label: "View Details", action: "view" },
  // { label: "Edit Details", action: "edit" },
];
const tableExportMenuItems = [
  { label: "Change Status", action: "status" },
  { label: "Delete", action: "delete" },
];
const InventoryTableWrapper = ({
  tableData,
  inventoryModuleName,
  pageSize,
  currentPage,
  setPageSize,
  onPageChange,
  onPageSizeChange,
  onSearch,
  search,
  setAppliedFilters,
  selectedProduct,
}) => {
  const {
    getCountryByStatuses: countryData,
    getCityByCountry: cityData,
    getGenericDropdowns: platformTypeData,
    getGenericDropdowns: bikeTypeData,
    vendorOptionsData: venderData,
    advanceFilterDropdownData: FilterDropDown,
  } = useSelector((state) => state.dataBankSlice);
  // console.log("inventoryModuleName", inventoryModuleName);
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedPlatformId, setSelectedPlatformId] = useState(null);
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
    dispatch(GenericGetAdvancefilterDropdown());
  }, [dispatch]);

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
  // useEffect(() => {
  //   if (countryData?.length > 0) {
  //     const formattedOptions = countryData.map((country) => ({
  //       value: country.id,
  //       label: country.countryName,
  //     }));
  //     setCountryOptions(formattedOptions);
  //   }
  // }, [countryData]);

  // Update country options
  useEffect(() => {
    if (FilterDropDown.listInventoryCountries?.length > 0) {
      const formattedOptions = FilterDropDown.listInventoryCountries.map(
        (country) => ({
          value: country?.id,
          label: country?.name,
        })
      );
      setCountryOptions(formattedOptions);
    }
  }, [FilterDropDown.listInventoryCountries]);

  useEffect(() => {
    if (FilterDropDown.listInventoryCities?.length > 0) {
      const formattedOptions = FilterDropDown.listInventoryCities.map(
        (city) => ({
          value: city.id,
          label: city.name,
        })
      );
      setCityOptions(formattedOptions);
    }
  }, [FilterDropDown.listInventoryCities]);

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

  const handleMenuClick = (value, row) => {
    if (inventoryModuleName === "Bike" && value.action === "view") {
      setSelectedPlatformId(row.id); // Set the selected platform ID
      router.push(`/admin/inventory/bike/details?id=${row.id}`); // Bike route
    } else if (inventoryModuleName === "Sim" && value.action === "view") {
      setSelectedPlatformId(row.id); // Set the selected platform ID
      router.push(`/admin/inventory/sim/details?id=${row.id}`); // Sim route
    }
    // else if (value.action === "edit") {
    //   setIsOpenModal(true);
    //   setSelectedPlatformId(row.id);
    //   router.push(`/admin/corporate/platforms?id=${row.id}`);
    // } else if (value.action === "delete") {
    //   handleDelete(row.id);
    // }
    else {
      setShowPopup(false);
    }
  };

  const bikeFullColumns = [
    {
      field: "bikePlateNo",
      headerName: "BIKE PLATE",
      align: "left",
      showFilter: true,
      minWidth: 150, // Optional
      flex: 1,
    },
    {
      field: "bikeImage",
      headerName: "BIKE PICTURE",
      showFilter: true,
      align: "left",
      flex: 2,
      renderCell: (params) => (
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            height: "100%",
          }}
        >
          <ImageIcon size={20} />
          <Typography variant="caption">
            {params.row?.bikeImage?.split("/").pop() || "-"}
          </Typography>
          <Download
            size={20}
            onClick={() => {
              if (params.row?.bikeImage) {
                window.open(params.row?.bikeImage, "_blank");
              } else {
                toast.error("No image available.");
              }
            }}
          />
        </Box>
      ),
    },
    {
      field: "bikeType",
      headerName: "BIKE OWNERSHIP",
      align: "left",
      showFilter: true,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="caption">{params.row?.bikeType}</Typography>
      ),
    },
    {
      field: "city",
      headerName: "City",
      align: "left",
      showFilter: true,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="caption">{params.row?.city?.cityName}</Typography>
      ),
    },
    {
      field: "isInsuranced",
      headerName: "BIKE INSURANCE",
      showFilter: true,
      align: "left",
      flex: 1,
      renderCell: (params) => (
        <Typography variant="caption">
          {params.row?.inventoryInsurance?.[0]?.isInsurance ? "Yes" : "No"}
        </Typography>
      ),
    },
    {
      field: "cost",
      headerName: "BIKE COST",
      align: "left",
      showFilter: true,
      flex: 1,
    },
    {
      field: "status",
      headerName: "STATUS",
      showFilter: true,
      align: "left",
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant="caption"
          sx={{
            py: 0.5,
            px: 1,
            borderRadius: 1,
            color: params?.row?.status === 1 ? "#28C76F" : "#FF9F43",
            bgcolor: params?.row?.status === 1 ? "#28C76F29" : "#FF9F4329",
          }}
        >
          {params?.row?.status === 1 ? "Allocated" : "N/A"}
        </Typography>
      ),
    },
    {
      field: "allocated_company",
      headerName: "ALLOCATED COMPANY",
      align: "left",
      showFilter: true,
      flex: 1,
      renderCell: (params) => (
        <>
          {params?.row?.allocated_company ? (
            <CustomAvatar
              fullName={params?.row?.allocated_company?.name || ""}
              email={params?.row?.allocated_company?.email || ""}
              image={params?.row?.allocated_company?.icon || ""}
            />
          ) : (
            "---"
          )}
        </>
      ),
    },
    {
      field: "allocated_rider",
      headerName: "ALLOCATED RIDER",
      showFilter: true,
      align: "left",
      flex: 1,
      renderCell: (params) => (
        <>
          {params?.row?.allocated_rider ? (
            <CustomAvatar
              fullName={params?.row?.allocated_rider?.name || ""}
              email={params?.row?.allocated_rider?.email || ""}
              image={params?.row?.allocated_rider?.icon || ""}
            />
          ) : (
            "---"
          )}
        </>
      ),
    },
    {
      field: "action",
      headerName: "ACTION",
      align: "left",
      flex: 1,
      renderCell: (row) => (
        <ActionMenu
          menuItems={MenuItems}
          onMenuItemClick={(value) => handleMenuClick(value, row)}
        />
      ),
    },
  ];
  const simFullColumns = [
    {
      field: "simNo",
      headerName: "Sim Number",
      align: "left",
      showFilter: true,
      minWidth: 150, // Optional
      flex: 1,
      renderCell: (params) => (
        <Typography variant="caption">{params.row?.simNo || "-"}</Typography>
      ),
    },
    {
      field: "vendor",
      headerName: "Sim Vendor",
      align: "left",
      showFilter: true,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="caption">
          {params.row?.vendor?.vendorName || "-"}
        </Typography>
      ),
    },
    {
      field: "simOwnership",
      headerName: "Sim Ownership",
      align: "left",
      showFilter: true,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="caption">
          {params.row?.simOwnership || "-"}
        </Typography>
      ),
    },

    // {
    //   field: "signingDate",
    //   headerName: "Contract signing date",
    //   align: "left",
    //   showFilter: true,
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Typography variant="caption">
    //       {params.row?.simContract?.signingDate
    //         ? moment(params.row?.simContract?.signingDate).format("DD/MM/YYYY")
    //         : "-"}
    //     </Typography>
    //   ),
    // },
    {
      field: "contractName",
      headerName: "Sim Contract",
      align: "left",
      showFilter: true,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="caption">
          {params.row?.simContract?.contractName}
        </Typography>
      ),
    },
    // {
    //   field: "startDate",
    //   headerName: "Contract Start date",
    //   showFilter: true,
    //   align: "left",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Typography variant="caption">
    //       {params.row?.simContract?.startDate
    //         ? moment(params.row?.simContract?.startDate).format("DD/MM/YYYY")
    //         : "-"}
    //     </Typography>
    //   ),
    // },
    // {
    //   field: "endDate",
    //   headerName: "Contract End date",
    //   showFilter: true,
    //   align: "left",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Typography variant="caption">
    //       {params.row?.simContract?.endDate
    //         ? moment(params.row?.simContract?.endDate).format("DD/MM/YYYY")
    //         : "-"}
    //     </Typography>
    //   ),
    // },
    {
      field: "fixedAmount",
      headerName: "Fixed Amount Rider",
      align: "left",
      showFilter: true,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="caption">
          {params.row?.simContract?.fixedAmount}
        </Typography>
      ),
    },
    // {
    //   field: "commissionAmount",
    //   headerName: "Commission Amount",
    //   align: "left",
    //   showFilter: true,
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Typography variant="caption">
    //       {params.row?.simContract?.commissionAmount}
    //     </Typography>
    //   ),
    // },
    {
      field: "charges",
      headerName: "Sim Service Charges",
      align: "left",
      showFilter: true,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="caption">
          {params.row?.simContract?.charges}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "STATUS",
      showFilter: true,
      align: "left",
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant="caption"
          sx={{
            py: 0.5,
            px: 1,
            borderRadius: 1,
            color: params?.row?.status === 1 ? "#28C76F" : "#FF9F43",
            bgcolor: params?.row?.status === 1 ? "#28C76F29" : "#FF9F4329",
          }}
        >
          {params?.row?.status === 1 ? "Allocated" : "N/A"}
        </Typography>
      ),
    },
    {
      field: "action",
      headerName: "ACTION",
      align: "left",
      flex: 1,
      renderCell: (row) => (
        <ActionMenu
          menuItems={MenuItems}
          onMenuItemClick={(value) => handleMenuClick(value, row)}
        />
      ),
    },
  ];
  const columns = useMemo(() => {
    if (inventoryModuleName === "Bike") {
      return bikeFullColumns;
    } else if (inventoryModuleName === "Sim") {
      return simFullColumns;
    }
    return [];
  }, [inventoryModuleName]);

  const handleCountryChange = (countryId) => {
    dispatch(
      getCityByCountryId({
        statuses: 1,
        parentId: countryId,
      })
    );
  };

  useEffect(() => {
    if (inventoryModuleName === "Bike") {
      setFilters([
        {
          id: 1,
          filterName: "Bike Plate Number",
          placeholder: "Enter Bike Plate Number",
        },
        {
          id: 2,
          filterName: "Country",
          placeholder: "Select Country",
          options: countryOptions,
          // onChange: (value) => handleCountryChange(value),
        },
        {
          id: 3,
          filterName: "City",
          placeholder: "Select City",
          options: cityOptions,
        },
        {
          id: 4,
          filterName: "Bike Type",
          placeholder: "Select Bike Type",
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
          placeholder: "Select Vendor Name",
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

  const handleExport = () => {
    const params = {
      page: 1,
      pageLength: 1000,
      filter: "",
      filter2: "",
      filter3: "",
      desc: true,
      orderBy: "CreatedDate",
      statuses: [1, 2, 12],
      parentId: selectedProduct?.value,
      SubParentId: "",
      SubParentId1: "",
      SubParentId2: "",
    };
    if (inventoryModuleName === "Bike") {
      // Dispatch the export action
      dispatch(InventoryExportInventoryListBike(params)).then((action) => {
        if (action.payload) {
          // Ensure Blob is handled correctly
          const blob = new Blob([action.payload], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel MIME type
          });

          // Create a temporary link element for downloading
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `BIKEInventoryList_${Date.now()}.xlsx`; // Set file name
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error("Failed to export data:", action.error);
        }
      });
    }
    if (inventoryModuleName === "Sim") {
      dispatch(InventoryExportInventoryListSim(params)).then((action) => {
        if (action.payload) {
          // Ensure Blob is handled correctly
          const blob = new Blob([action.payload], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel MIME type
          });

          // Create a temporary link element for downloading
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `SIMInventoryList_${Date.now()}.xlsx`; // Set file name
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error("Failed to export data:", action.error);
        }
      });
    }
  };
  return (
    <Box sx={{ bgcolor: "white", overflow: "hidden", m: 1.5, borderRadius: 6 }}>
      <TableFilters
        filters={filters}
        onApplyFilters={handleApplyFilters}
        isBtnSearch={true}
        isBtnSReset={true}
        multiSelect={true}
      />
      <TableExportRow
        handleExport={handleExport}
        isBtnAdd
        btnText={`Add Inventory ${inventoryModuleName}`}
        handleOpenModal={() =>
          inventoryModuleName === "Bike"
            ? router.push("/admin/inventory/inventory-list/add-inventory")
            : router.push("/admin/inventory/add-inventory")
        }
        showSearchField={false}
        isExportBtn={true}
        menuItems={tableExportMenuItems}
        isMenu={false}
        pagination={false}
      />
      <DataGridTable data={tableData?.data} columns={columns} />
    </Box>
  );
};

export default InventoryTableWrapper;
