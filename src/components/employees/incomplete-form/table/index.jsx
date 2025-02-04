"use client";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation"; // Import useRouter
import CustomAvatar from "../../../shared-components/CustomAvatar";
import ActionMenu from "../../../shared-components/ActionMenu";
import TableExportRow from "../../../shared-components/Table-components/TableExportRow";
import { StatusIndicator } from "./StatusIndicator";
import TableFilters from "../../../shared-components/Table-components/TableFilters";
import { useDispatch, useSelector } from "react-redux";
import FormattedDate from "@/utils/reusable-functions/FormattedDate ";
import Loader from "@/utils/reusable-functions/Loader";
import {
  getCampaignListByStatus,
  ExportEmployeeByStatus,
} from "@/redux/reducers/applicants/applicantThunk";
import ActionModalCardCampaign from "../../../shared-components/ActionModalCardCampaign";
import { updateSuccess } from "@/redux/reducers/campaign/campaignSlice";
import { updateEmployeeSuccess } from "@/redux/reducers/applicants/applicantSlice";
import {
  GenericGetAdvancefilterDropdown,
  getCampaignsInFilter,
  getCitiesByStatus,
  getCountriesByStatus,
  getStatesByStatus,
} from "@/redux/reducers/dataBank/dataBankThunk";
import BulkActionChangeStatus from "../../../shared-components/Table-components/BulkActionChangeStatus";
import DataGridTable from "../../../shared-components/Table-components/DataGridTable";

const columnConfig = {
  incompleteProfileCol: [
    "createdDate",
    "fullName",
    "currentCountry",
    "residentCity",
    "isValidDrivingLicense",
    "passportNo",
    "contactNumber",
    "preferedWorkingCity",
    "referralBy",
    "campaignName",
    "reason",
    "status",
    "action",
  ],
  activeEmployeeCol: [
    // "id",
    "createdDate",
    "fullName",
    "currentCountry",
    "residentCity",
    "isValidDrivingLicense",
    "passportNo",
    "contactNumber",
    "preferedWorkingCity",
    "referralBy",
    "campaignName",
    "reason",
    "status",
    "action",
  ],
  inActiveEmployeeCol: [
    "createdDate",
    "fullName",
    "currentCountry",
    "residentCity",
    "isValidDrivingLicense",
    "passportNo",
    "contactNumber",
    "preferedWorkingCity",
    "referralBy",
    "campaignName",
    "reason",
    "status",
    "action",
  ],
};

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const ApplicantsTableWrapper = ({
  pageSize,
  setPageSize,
  setCurrentPage,
  currentPage,
  filteredStatuses,
  search,
  setSearch,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [isBtnAdd, setIsBtnAdd] = useState(false);
  const [filters, setFilters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalForBulk, setShowModalForBulk] = useState(false);
  const [rowIDOfCampaign, setRowIDOfCampaign] = useState(false);
  const [isMenu, setIsMenu] = useState(true); // Set Menu
  const [isSelectedOption, setIsSelectedOption] = useState(true); // Set Row Selection

  const [appliedFilters, setAppliedFilters] = useState([]); //Advance filters
  const [bulkRowIds, setBulkRowIds] = useState([]); //Advance Menu
  const filtersList = filters || [];

  const { submitSuccess } = useSelector((state) => state.campaignSlice); // for change status globally
  const { loading, getListByStatus, submitApplicantSuccess } = useSelector(
    (state) => state.applicantSlice
  );

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

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePageSizeChange = (size) => setPageSize(size);

  const handleSearchChange = useCallback(
    debounce((value) => setSearch(value), 500),
    []
  );

  const handleRowSelect = (selectedRowIds) => {
    console.log("Selected Row IDs:", selectedRowIds);
    setBulkRowIds(selectedRowIds);
  };

  const menuConfigurations = useMemo(
    () => ({
      incompleteProfile: {
        menuItems: [
          { label: "Proceed", action: "proceed" },
          { label: "Change Status", action: "change_status" },
          { label: "View Details", action: "view" },
        ],
      },
      activeEmployee: {
        menuItems: [
          { label: "View Details", action: "view" },
          { label: "Change Status", action: "change_status" },
        ],
      },
      inActiveEmployee: {
        menuItems: [
          { label: "View Details", action: "view" },
          { label: "Change Status", action: "change_status" },
        ],
      },
    }),
    []
  );

  const menuItemsBulk = [
    { label: "Change Status", action: "change_status_bulk" },
  ];

  const currentMenuConfig = useMemo(() => {
    if (pathname.includes("admin/employees/incomplete-profile"))
      return menuConfigurations.incompleteProfile;
    if (pathname.includes("admin/employees/inactive-employee"))
      return menuConfigurations.inActiveEmployee;
    // if (pathname.includes("employees"))
    //   return menuConfigurations.activeEmployee;
    return menuConfigurations.activeEmployee; // Default configuration
  }, [menuConfigurations, pathname]);

  const onChangeStatus = (rowId) => {
    setShowModal(true);
    setRowIDOfCampaign(rowId);
  };

  const handleMenuClick = (rowData, clickedItem) => {
    if (clickedItem === "change_status") onChangeStatus(rowData?.id);
    if (clickedItem === "change_status_bulk") setShowModalForBulk(true);
    if (clickedItem === "proceed")
      router.push(`/admin/employees/incomplete-profile/form?id=${rowData?.id}`);
    if (clickedItem === "view") {
      router.push(
        `/admin/employees/incomplete-profile/view-profile?id=${rowData?.id}`
      );
    }
  };

  // Define the full columns configuration
  const fullColumns = useMemo(
    () => [
      {
        field: "id",
        showFilter: true,
        headerName: "ID",
        align: "left",
        width: 120,
        renderCell: (params) => (
          <Typography
            variant="body2"
            sx={{
              borderBottom: "1px solid #20A4D5E5",
              color: "#20A4D5E5",
              cursor: "pointer",
              width: "fit-content",
              textTransform: "uppercase",
            }}
          >
            {params?.row?.id}
          </Typography>
        ),
      },
      {
        field: "createdDate",
        showFilter: true,
        headerName: "DATE",
        align: "left",
        width: 120,
        renderCell: (params) => (
          <FormattedDate isoDate={params?.row?.createdDate} />
        ),
      },
      {
        field: "fullName",
        showFilter: true,
        headerName: "FULL NAME",
        align: "left",
        width: 210,
        renderCell: (params) => (
          <CustomAvatar
            image={params?.row?.image || ""}
            email={params?.row?.email}
            fullName={params?.row?.fullName}
          />
        ),
      },
      {
        field: "residentCountry",
        showFilter: true,
        headerName: "RESIDENT COUNTRY",
        align: "left",
        width: 190,
        renderCell: (params) => {
          return params?.row?.residentCountry?.countryName || "N/A";
        },
      },
      {
        field: "currentCountry",
        showFilter: true,
        headerName: "COUNTRY",
        align: "left",
        width: 190,
        renderCell: (params) => {
          return params?.row?.currentCountry?.countryName || "N/A";
        },
      },
      {
        field: "residentCity",
        showFilter: true,
        headerName: "CITY",
        align: "left",
        width: 190,
        renderCell: (params) => params?.row?.residentCity?.cityName,
      },
      {
        field: "isValidDrivingLicense",
        showFilter: true,
        headerName: "DRIVING LICENSE",
        align: "left",
        width: 190,
        renderCell: (params) =>
          params?.row?.isValidDrivingLicense === true ? "Yes" : "No",
      },
      {
        field: "passportNo",
        headerName: "PASSPORT NUMBER",
        align: "left",
        showFilter: true,
        width: 190,
        renderCell: (params) => params?.row?.passportNo || "N/A",
      },
      {
        field: "contactNumber",
        showFilter: true,
        headerName: "PHONE NUMBER",
        align: "left",
        width: 190,
        renderCell: (params) => params?.row?.contactNumber || "N/A",
      },
      {
        field: "preferedWorkingCity",
        headerName: "PREFERRED WORKING CITY",
        align: "left",
        showFilter: true,
        width: 220,
        renderCell: (params) => params?.row?.workingCity?.cityName || "N/A",
      },
      {
        field: "referralBy",
        headerName: "REFER BY",
        align: "left",
        showFilter: true,
        width: 100,
        renderCell: (params) => params?.row?.referralBy || "N/A",
      },
      {
        field: "campaignName",
        showFilter: true,
        headerName: "CAMPAIGN NAME",
        align: "left",
        width: 200,
        renderCell: (params) => {
          return params?.row?.campaign?.campaignName || "N/A";
        },
      },
      {
        field: "reason",
        headerName: "REMARKS",
        align: "left",
        showFilter: true,
        width: 150,
        renderCell: (params) => {
          return params?.row?.reason || "N/A";
        },
      },
      {
        field: "status",
        showFilter: true,
        headerName: "STATUS",
        align: "left",
        width: 150,
        renderCell: (params) => (
          <StatusIndicator status={params?.row?.status} />
        ),
      },
      {
        field: "action",
        headerName: "ACTION",
        align: "left",
        width: 100,
        renderCell: (params) => (
          <ActionMenu
            menuItems={currentMenuConfig.menuItems}
            onMenuItemClick={(item) =>
              handleMenuClick(params?.row, item.action)
            }
          />
        ),
      },
    ],
    [currentMenuConfig, pathname, router]
  );

  // Dynamically set columns based on the current path
  const columns = useMemo(() => {
    let key = "incompleteProfileCol"; // Default to incomplete profile

    // Check and assign the correct key based on the path
    if (pathname === "/admin/employees/incomplete-profile") {
      key = "incompleteProfileCol";
    } else if (pathname === "/admin/employees") {
      key = "activeEmployeeCol";
    } else if (pathname === "/admin/employees/inactive-employee") {
      key = "inActiveEmployeeCol";
    }

    // Filter columns based on the selected key
    const selectedColumns = fullColumns.filter((column) =>
      columnConfig[key]?.includes(column.field)
    );

    // console.log("Pathname:", pathname); // Debugging
    // console.log("Key:", key); // Debugging
    // console.log("Selected Columns:", selectedColumns); // Debugging

    return selectedColumns;
  }, [pathname, fullColumns]);

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [campaignOptions, setCampaignOptions] = useState([]);

  const { advanceFilterDropdownData: FilterDropDown } = useSelector(
    (state) => state.dataBankSlice
  );

  useEffect(() => {
    dispatch(GenericGetAdvancefilterDropdown());
  }, [dispatch]);

  // Update Campaigns options
  useEffect(() => {
    if (FilterDropDown.listCampaigns?.length > 0) {
      const formattedOptions = FilterDropDown.listCampaigns?.map(
        (campaign) => ({
          value: campaign?.id,
          label: campaign?.name,
        })
      );
      setCampaignOptions(formattedOptions);
    }
  }, [FilterDropDown.listCampaigns]);

  // Update country options
  useEffect(() => {
    if (FilterDropDown.listCountries?.length > 0) {
      const formattedOptions = FilterDropDown.listCountries.map((country) => ({
        value: country?.id,
        label: country?.name,
      }));
      setCountryOptions(formattedOptions);
    }
  }, [FilterDropDown.listCountries]);

  // Update state options
  useEffect(() => {
    if (FilterDropDown.listStates?.length > 0) {
      const formattedOptions = FilterDropDown.listStates.map((state) => ({
        value: state?.id,
        label: state?.name,
      }));
      setStateOptions(formattedOptions);
    }
  }, [FilterDropDown.listStates]);

  // Update city options
  useEffect(() => {
    if (FilterDropDown.listCities?.length > 0) {
      const formattedOptions = FilterDropDown.listCities.map((city) => ({
        value: city.id,
        label: city.name,
      }));
      setCityOptions(formattedOptions);
    }
  }, [FilterDropDown.listCities]);

  useEffect(() => {
    // const isActiveEmployee = pathname.includes("employees");
    // const isInActiveEmployee = pathname.includes("employees/inactive-employee");
    // const isIncompleteProfile = pathname.includes(
    //   "employees/incomplete-profile"
    // );

    const baseFilters = [
      {
        id: 1,
        filterName: "Resident",
        placeholder: "UAE",
        options: [
          { value: "Non UAE Resident", label: "Non UAE Resident" },
          { value: "UAE Resident", label: "UAE Resident" },
        ],
      },
      {
        id: 2,
        filterName: "Country",
        placeholder: "Select Country",
        options: countryOptions,
      },
      {
        id: 3,
        filterName: "State",
        placeholder: "Select State",
        options: stateOptions,
      },
      {
        id: 4,
        filterName: "City",
        placeholder: "Select City",
        options: cityOptions,
      },
      {
        id: 5,
        filterName: "Campaign",
        placeholder: "Select campaigns",
        options: campaignOptions,
      },
    ];

    // if (isActiveEmployee) {
    //   setFilters([

    //     ...baseFilters,
    //   ]);
    // } else {
    setFilters(baseFilters);
    // }
  }, [pathname, countryOptions, stateOptions, cityOptions]);

  // Transform filters to API format
  useEffect(() => {
    const filtersToApi = appliedFilters.reduce((acc, filter, index) => {
      if (filter.filterName === "Resident") {
        acc.filter = filter.value;
      } else if (filter.filterName === "Campaign") {
        acc.parentId = filter.value;
      } else if (filter.filterName === "Country") {
        acc.SubParentId = filter.value;
      } else if (filter.filterName === "State") {
        acc.SubParentId1 = filter.value;
      } else if (filter.filterName === "City") {
        acc.SubParentId2 = filter.value;
      }
      return acc;
    }, {});
    // console.log("pageSize__01", pageSize);

    // Construct API request params for FILTER
    const param = {
      page: currentPage,
      pageLength: pageSize,
      statuses: filteredStatuses,
      filter: filtersToApi.filter || "", // resident
      filter2: search, // Search
      desc: "false",
      orderBy: "CreatedBy",
      parentId: filtersToApi.parentId || "", // Campaign
      SubParentId: filtersToApi.SubParentId || "", // Country
      SubParentId1: filtersToApi.SubParentId1 || "", // State
      SubParentId2: filtersToApi.SubParentId2 || "", // City
    };
    // console.log("API Request Params:", param);
    dispatch(getCampaignListByStatus(param));
  }, [
    dispatch,
    currentPage,
    pageSize,
    search,
    appliedFilters,
    filteredStatuses,
  ]);

  // for change status globally
  useEffect(() => {
    if (submitSuccess) {
      const params = {
        page: currentPage,
        pageLength: pageSize,
        statuses: filteredStatuses,
        filter2: search,
        desc: "false",
        orderBy: "CreatedBy",
      };
      dispatch(getCampaignListByStatus(params));
      dispatch(updateSuccess());
    }
  }, [
    filteredStatuses,
    dispatch,
    submitSuccess,
    currentPage,
    pageSize,
    search,
  ]);

  // for Submit Form
  useEffect(() => {
    if (submitApplicantSuccess) {
      const params = {
        page: currentPage,
        pageLength: pageSize,
        statuses: filteredStatuses,
        filter2: search,
        desc: "false",
        orderBy: "CreatedBy",
      };
      dispatch(getCampaignListByStatus(params));
      dispatch(updateEmployeeSuccess());
    }
  }, [
    filteredStatuses,
    dispatch,
    submitApplicantSuccess,
    currentPage,
    pageSize,
    search,
  ]);

  const handleExport = () => {
    const params = {
      page: 1,
      pageLength: "",
      filter: "",
      filter2: "",
      filter3: "",
      desc: false,
      orderBy: "",
      statuses: filteredStatuses,
      parentId: "",
      SubParentId: "",
      SubParentId1: "",
      SubParentId2: "",
    };
    // Dispatch the export action
    dispatch(ExportEmployeeByStatus(params)).then((action) => {
      if (action.payload) {
        // Ensure Blob is handled correctly
        const blob = new Blob([action.payload], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel MIME type
        });

        // Create a temporary link element for downloading
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Employees.xlsx_${Date.now()}.xlsx`; // Set file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Failed to export data:", action.error);
      }
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        overflow: "hidden",
        m: 1.5,
        borderRadius: "25px", // Updated to 25px
        boxShadow: "0px 3px 12px 0px rgba(47, 43, 61, 0.14)", // Added shadow
      }}
    >
      <TableFilters
        filters={filters}
        onApplyFilters={handleApplyFilters}
        isBtnSearch={true}
        multiSelect={true}
      />
      <TableExportRow
        isBtnAdd={isBtnAdd}
        totalEntries={pageSize}
        setTotalEntries={setPageSize}
        onSearch={handleSearchChange}
        pathname={pathname}
        // BulkMenu
        isMenu={isMenu}
        menuItems={menuItemsBulk}
        handleMenuClick={handleMenuClick}
        // Export
        isExportBtn={true}
        handleExport={handleExport}
      />

      {loading ? (
        <Loader size="small" />
      ) : (
        <Box sx={{ height: "100%" }}>
          <DataGridTable
            onRowSelect={handleRowSelect}
            isSelectedOption={isSelectedOption}
            data={getListByStatus?.data}
            columns={columns}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </Box>
      )}
      {showModal && (
        <ActionModalCardCampaign
          rowIDOfCampaign={rowIDOfCampaign}
          onClose={() => setShowModal(false)}
        />
      )}
      {showModalForBulk && (
        <BulkActionChangeStatus
          bulkRowIds={bulkRowIds}
          onClose={() => setShowModalForBulk(false)}
        />
      )}
    </Box>
  );
};

export default ApplicantsTableWrapper;
