import React, { useEffect, useMemo, useState } from "react";
import ActionMenu from "@/components/shared-components/ActionMenu";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import TableExportRow from "@/components/shared-components/Table-components/TableExportRow";
import TableFilters from "@/components/shared-components/Table-components/TableFilters";
import { data } from "@/utils/campaigns.data";
import { Box, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { platformListing, vendorListing } from "@/utils/schemas/vendor.data";
import VendorDetailModal from "./VendorDetailModal";
import TablePagination from "@/components/shared-components/Table-components/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import {
  GenericGetAdvancefilterDropdown,
  getByHeaderAndSectionAndKey,
  getCitiesByStatus,
  getCountriesByStatus,
  getStatesByStatus,
} from "@/redux/reducers/dataBank/dataBankThunk";
import {
  VendorDelete,
  VendorGetByStatus,
} from "@/redux/reducers/vendor/vendorThunk";
import { UserData } from "@/configs/UseApi";

import swal from "sweetalert";

const platformFilters = [
  { id: 1, filterName: "Vendor ID", placeholder: "CA1" },
  { id: 2, filterName: "Vendor Type", placeholder: "4PL" },
  {
    id: 3,
    filterName: "Country",
    placeholder: "UAE",
    options: [
      { id: 1, label: "UAE", value: "uae" },
      { id: 2, label: "Pakistan", value: "pakistan" },
      { id: 3, label: "India", value: "india" },
    ],
  },
  {
    id: 4,
    filterName: "City",
    placeholder: "Islamabad",
    options: [
      { id: 1, label: "Islamabad", value: "islamabad" },
      { id: 2, label: "Rawalpindi", value: "rawalpindi" },
      { id: 3, label: "Peshawar", value: "peshawar" },
    ],
  },
];

const VendorTableWrapper = ({
  tableData,
  setIsOpenModal,
  pageSize,
  currentPage,
  setPageSize,
  onPageChange,
  onPageSizeChange,
  onSearch,
  search,
  setAppliedFilters,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [vendorTypeOptions, setVendorTypeOptions] = useState([]);
  const [selectedPlatformId, setSelectedPlatformId] = useState(null);
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

  const {
    getCountryByStatuses: countryData,
    getStateByStatuses: stateData,
    getCityByStatuses: cityData,
    getGenericDropdowns: platformTypeData,
    advanceFilterDropdownData: FilterDropDown,
  } = useSelector((state) => state.dataBankSlice);

  useEffect(() => {
    dispatch(GenericGetAdvancefilterDropdown());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCountriesByStatus({ page: 1, pageLength: 1000, statuses: 1 }));
    const sectionName = "Vendor";
    const sectionValue = "VendorType";
    dispatch(
      getByHeaderAndSectionAndKey({
        sectionName: sectionName, // Section name for filter2
        sectionValue: sectionValue, // Section value for filter3
      })
    );
  }, [dispatch]);

  // Update country options
  useEffect(() => {
    if (FilterDropDown.listVendorCountries?.length > 0) {
      const formattedOptions = FilterDropDown.listVendorCountries.map(
        (country) => ({
          value: country?.id,
          label: country?.name,
        })
      );
      setCountryOptions(formattedOptions);
    }
  }, [FilterDropDown.listVendorCountries]);

  // Update state options
  useEffect(() => {
    if (FilterDropDown.listVendorStates?.length > 0) {
      const formattedOptions = FilterDropDown.listVendorStates.map((state) => ({
        value: state.id,
        label: state.name,
      }));
      setStateOptions(formattedOptions);
    }
  }, [FilterDropDown.listVendorStates]);

  // Update city options
  useEffect(() => {
    if (FilterDropDown.listVendorCities?.length > 0) {
      const formattedOptions = FilterDropDown.listVendorCities.map((city) => ({
        value: city.id,
        label: city.name,
      }));
      setCityOptions(formattedOptions);
    }
  }, [FilterDropDown.listVendorCities]);

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

  // Platform type options
  useEffect(() => {
    if (platformTypeData?.length > 0) {
      const formattedOptions = platformTypeData.map((platform) => ({
        value: platform.value,
        label: platform.value,
      }));
      setVendorTypeOptions(formattedOptions);
    }
  }, [platformTypeData]);
  // Fetch states based on selected country
  const handleCountryChange = (countryId) => {
    dispatch(
      getStatesByStatus({
        statuses: 1,
        parentId: countryId,
      })
    );
    // form.setValue("state", ""); // Reset state selection
    // form.setValue("city", ""); // Reset city selection
  };

  // Update state options
  // useEffect(() => {
  //   if (stateData?.length > 0) {
  //     const formattedOptions = stateData.map((state) => ({
  //       value: state.id,
  //       label: state.stateName,
  //     }));
  //     setStateOptions(formattedOptions);
  //   }
  // }, [stateData]);

  // Update city options
  // useEffect(() => {
  //   if (cityData?.length > 0) {
  //     const formattedOptions = cityData.map((city) => ({
  //       value: city.id,
  //       label: city.cityName,
  //     }));
  //     setCityOptions(formattedOptions);
  //   }
  // }, [cityData]);

  // Fetch cities based on selected state
  const handleStateChange = (stateId) => {
    dispatch(getCitiesByStatus({ statuses: 1, parentId: stateId }));
    // form.setValue("city", ""); // Reset city selection
  };

  useEffect(() => {
    setFilters([
      { id: 1, filterName: "Vendor ID", placeholder: "Enter Vendor ID" },
      {
        id: 2,
        filterName: "Vendor Type",
        placeholder: "Select Vendor Type",
        options: vendorTypeOptions,
      },
      {
        id: 3,
        filterName: "Country",
        placeholder: "Select Country",
        options: countryOptions,
        // onChange: (value) => handleCountryChange(value),
      },
      {
        id: 4,
        filterName: "State",
        placeholder: "Select State",
        options: stateOptions,
        // onChange: (value) => handleStateChange(value),
      },
      {
        id: 5,
        filterName: "City",
        placeholder: "Select City",
        options: cityOptions,
      },
    ]);
  }, [countryOptions, stateOptions, cityOptions, vendorTypeOptions]);

  // const handleRowSelect = (selectedRowIds) => {
  //   console.log("Selected Row IDs:", selectedRowIds);
  // };

  // const handleMenuClick = (value) => {
  //   if (value.action === "add-contract") router.push("corporate/add-contract");
  //   if (value.action === "view") setShowPopup(true);
  //   console.log("clicked menu", value);
  // };

  // const handleFilterClick = (field) => {
  //   console.log(`Filter clicked for: ${field}`);
  // };

  // const MenuItems = useMemo(
  //   () => [
  //     { label: "Add Contract", action: "add-contract" },
  //     { label: "View Details", action: "view" },
  //     { label: "Edit Details", action: "edit" },
  //   ],
  //   []
  // );

  // const [showPopup, setShowPopup] = React.useState(false);

  // const onClose = () => {
  //   setShowPopup(false);
  // };

  const handleRowSelect = (selectedRowIds) => {
    console.log("Selected Row IDs:", selectedRowIds);
  };

  const [showPopup, setShowPopup] = useState(false);
  // console.log("modalState", showPopup);
  const onClose = () => {
    setShowPopup(false);
  };
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: false,
      closeOnEsc: false,
    }).then((result) => {
      // debugger
      if (result) {
        const payload = {
          id: id,
          deletedBy: UserData?.Id,
          status: 3,
        };
        dispatch(VendorDelete(payload)).then(() => {
          const param = {
            page: currentPage,
            pageLength: pageSize,
            statuses: [1, 2],
            filter: search,
            filter2: "",
            filter3: "",
            desc: false,
            orderBy: "",
            parentId: "",
          };
          dispatch(VendorGetByStatus(param));
        });
      }
    });
  };
  const handleMenuClick = (value, row) => {
    if (value.action === "view") {
      setSelectedPlatformId(row.id); // Set the selected platform ID
      setShowPopup(true); // Open the modal
    } else if (value.action === "add-contract") {
      router.push(`corporate/add-contract/?id=${row.id}`);
    } else if (value.action === "edit") {
      setIsOpenModal(true);
      setSelectedPlatformId(row.id);
      router.push(`/admin/corporate/?id=${row.id}`);
    } else if (value.action === "delete") {
      handleDelete(row.id);
    } else {
      setShowPopup(false);
    }
  };

  const handleFilterClick = (field) => {
    console.log(`Filter clicked for: ${field}`);
  };

  const MenuItems = useMemo(
    () => [
      { label: "Add Contract", action: "add-contract" },
      { label: "View Details", action: "view" },
      { label: "Edit Details", action: "edit" },
      { label: "Delete Details", action: "delete" },
    ],
    []
  );

  const fullColumns = useMemo(
    () => [
      { field: "vendorNo", headerName: "Vendor ID", align: "left" },
      {
        field: "vendorName",
        headerName: "Vendor Name",
        align: "left",
        render: (row) => (
          <CustomAvatar
            image={row.image}
            email={row.email}
            fullName={row.vendorName}
          />
        ),
      },
      {
        field: "vendorType",
        headerName: "Vendor Type",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>{row?.vendorType}</Box>
        ),
      },
      {
        field: "taxRegistered",
        headerName: "Tax Register",
        align: "left",
        render: (row) => (
          <Typography variant="caption">
            {row.taxRegistered ? "Yes" : "No"}
          </Typography>
        ),
      },
      {
        field: "country",
        headerName: "Country",
        align: "left",
        render: (row) => <Box>{row?.country?.countryName}</Box>,
      },
      {
        field: "state",
        headerName: "State",
        align: "left",
        render: (row) => <Box>{row?.state?.stateName}</Box>,
      },
      {
        field: "city",
        headerName: "City",
        align: "left",
        render: (row) => <Box>{row?.city?.cityName}</Box>,
      },
      {
        field: "status",
        headerName: "STATUS",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              backgroundColor: row.status === 1 ? "#28C76F29" : "#FF4C5129",
              color: row.status === 1 ? "#28C76F" : "#FF4C51",
              padding: "4px 8px",
              borderRadius: "4px",
              textTransform: "capitalize",
              width: "fit-content",
              minWidth: 100,
              textAlign: "center",
            }}
          >
            {row.status === 1 ? "Active" : "Non active"}
          </Box>
        ),
      },
      {
        field: "action",
        headerName: "Action",
        align: "left",
        render: (row) => (
          <ActionMenu
            menuItems={MenuItems}
            onMenuItemClick={(value) => handleMenuClick(value, row)}
          />
        ),
      },
    ],
    [MenuItems]
  );

  return (
    <Box sx={{ bgcolor: "white", overflow: "hidden", m: 1.5, borderRadius: 6 }}>
      <TableFilters
        filters={filters}
        onApplyFilters={handleApplyFilters}
        isBtnSearch={true}
        multiSelect={true}
      />
      <TableExportRow
        isExportBtn={false}
        isBtnAdd={false}
        isMenu={false}
        totalEntries={pageSize}
        setTotalEntries={setPageSize}
        onSearch={onSearch}
      />
      <Box sx={{ height: "100%" }}>
        <CustomTable
          columns={fullColumns}
          data={tableData?.data}
          onRowSelect={handleRowSelect}
          handleFilterClick={handleFilterClick}
        />
        {tableData?.data?.length > 10 && (
          <TablePagination
            totalEntries={tableData?.rowCount || 0}
            rowsPerPage={pageSize}
            currentPage={currentPage}
            setCurrentPage={onPageChange}
            setPageSize={onPageSizeChange}
          />
        )}
      </Box>
      {showPopup && (
        <VendorDetailModal
          onClose={onClose}
          platformId={selectedPlatformId}
          setShowPopup={setShowPopup}
          setIsOpenModal={setIsOpenModal}
        />
      )}
    </Box>
  );
};

export default VendorTableWrapper;
