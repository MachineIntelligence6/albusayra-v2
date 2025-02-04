import React, { useEffect, useMemo, useState } from "react";
import ActionMenu from "@/components/shared-components/ActionMenu";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import TableExportRow from "@/components/shared-components/Table-components/TableExportRow";
import TableFilters from "@/components/shared-components/Table-components/TableFilters";
import { data } from "@/utils/campaigns.data";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { platformListing } from "@/utils/schemas/vendor.data";
import PlatformDetailModal from "./PlatformDetailModal";
import TablePagination from "@/components/shared-components/Table-components/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import {
  GenericGetAdvancefilterDropdown,
  getByHeaderAndSectionAndKey,
  getCitiesByStatus,
  getCountriesByStatus,
  getStatesByStatus,
} from "@/redux/reducers/dataBank/dataBankThunk";
import { useRouter } from "next/navigation";
import {
  PlatformDelete,
  PlatformGetByStatus,
} from "@/redux/reducers/platform/platformThunk";
import { UserData } from "@/configs/UseApi";
import swal from "sweetalert";

const PlatformTableWrapper = ({
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
  const [platformTypeOptions, setPlatformTypeOptions] = useState([]);
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
    const sectionName = "Platform";
    const sectionValue = "PlatformType";
    dispatch(
      getByHeaderAndSectionAndKey({
        sectionName: sectionName, // Section name for filter2
        sectionValue: sectionValue, // Section value for filter3
      })
    );
  }, [dispatch]);

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

  // Fetch states based on selected country
  // const handleCountryChange = (countryId) => {
  //   dispatch(
  //     getStatesByStatus({
  //       statuses: 1,
  //       parentId: countryId,
  //     })
  //   );
  //   // form.setValue("state", ""); // Reset state selection
  //   // form.setValue("city", ""); // Reset city selection
  // };

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
  // const handleStateChange = (stateId) => {
  //   dispatch(getCitiesByStatus({ statuses: 1, parentId: stateId }));
  //   // form.setValue("city", ""); // Reset city selection
  // };

  // Update country options

  // Platform type options
  useEffect(() => {
    if (platformTypeData?.length > 0) {
      const formattedOptions = platformTypeData.map((platform) => ({
        value: platform.value,
        label: platform.value,
      }));
      setPlatformTypeOptions(formattedOptions);
    }
  }, [platformTypeData]);

  useEffect(() => {
    if (FilterDropDown.listPlatformCountries?.length > 0) {
      const formattedOptions = FilterDropDown.listPlatformCountries.map(
        (country) => ({
          value: country?.id,
          label: country?.name,
        })
      );
      setCountryOptions(formattedOptions);
    }
  }, [FilterDropDown.listPlatformCountries]);

  // Update state options
  useEffect(() => {
    if (FilterDropDown.listPlatformStates?.length > 0) {
      const formattedOptions = FilterDropDown.listPlatformStates.map(
        (state) => ({
          value: state.id,
          label: state.name,
        })
      );
      setStateOptions(formattedOptions);
    }
  }, [FilterDropDown.listPlatformStates]);

  // Update city options
  useEffect(() => {
    if (FilterDropDown.listPlatformCities?.length > 0) {
      const formattedOptions = FilterDropDown.listPlatformCities.map(
        (city) => ({
          value: city.id,
          label: city.name,
        })
      );
      setCityOptions(formattedOptions);
    }
  }, [FilterDropDown.listPlatformCities]);

  useEffect(() => {
    setFilters([
      { id: 1, filterName: "Platform ID", placeholder: "Enter Platform ID" },
      {
        id: 2,
        filterName: "Platform Type",
        placeholder: "Select Platform Type",
        options: platformTypeOptions,
      },
      {
        id: 3,
        filterName: "Country",
        placeholder: "Select Country",
        options: countryOptions,
        // onChange: (e) => handleCountryChange(e.target.value),
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
  }, [countryOptions, stateOptions, cityOptions, platformTypeOptions]);

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
        dispatch(PlatformDelete(payload)).then(() => {
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
          dispatch(PlatformGetByStatus(param));
        });
      }
    });
  };
  const handleMenuClick = (value, row) => {
    if (value.action === "view") {
      setSelectedPlatformId(row.id); // Set the selected platform ID
      setShowPopup(true); // Open the modal
    } else if (value.action === "edit") {
      setIsOpenModal(true);
      setSelectedPlatformId(row.id);
      router.push(`/admin/corporate/platforms?id=${row.id}`);
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
      { label: "View Details", action: "view" },
      { label: "Edit Details", action: "edit" },
      { label: "Delete Details", action: "delete" },
    ],
    []
  );

  const fullColumns = useMemo(
    () => [
      { field: "platformId", headerName: "Platform ID", align: "left" },
      {
        field: "platformName",
        headerName: "platform Name",
        align: "left",
        render: (row) => (
          <CustomAvatar
            image={row.image}
            email={row.email}
            fullName={row.platformName}
          />
        ),
      },
      {
        field: "platformType",
        headerName: "platform Type",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>{row?.platformType}</Box>
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
              backgroundColor: row.status === 1 ? "#D9F0FF" : "#FFE5E5",
              color:
                row.status === 1
                  ? "#007FFF"
                  : row.status === "Not Qualified"
                  ? "#FF0000"
                  : "#FF0000",
              padding: "4px 8px",
              borderRadius: "4px",
              textTransform: "capitalize",
              width: "fit-content",
              px: 4,
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
        <PlatformDetailModal
          onClose={onClose}
          platformId={selectedPlatformId}
          setShowPopup={setShowPopup}
          setIsOpenModal={setIsOpenModal}
        />
      )}
    </Box>
  );
};

export default PlatformTableWrapper;
