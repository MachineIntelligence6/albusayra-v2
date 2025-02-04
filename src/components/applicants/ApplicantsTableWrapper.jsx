"use client";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation"; // Import useRouter
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import { data } from "@/utils/campaigns.data";
import CustomAvatar from "../shared-components/CustomAvatar";
import ActionMenu from "../shared-components/ActionMenu";
import TableExportRow from "../shared-components/Table-components/TableExportRow";
import TablePagination from "../shared-components/Table-components/TablePagination";
import { StatusIndicator } from "./StatusIndicator";
import TableFilters from "../shared-components/Table-components/TableFilters";
import { useDispatch, useSelector } from "react-redux";
import FormattedDate from "@/utils/reusable-functions/FormattedDate ";
import Loader from "@/utils/reusable-functions/Loader";
import {
  getProceedDetails,
  getCampaignListByStatus,
  ExportEmployeeByStatus,
} from "@/redux/reducers/applicants/applicantThunk";
import ActionModalCardCampaign from "../shared-components/ActionModalCardCampaign";
import { updateSuccess } from "@/redux/reducers/campaign/campaignSlice";
import { updateEmployeeSuccess } from "@/redux/reducers/applicants/applicantSlice";
import { CustomTableFilter } from "../shared-components/Table-components/customTableFilter";
import {
  GenericGetAdvancefilterDropdown,
  getCampaignsInFilter,
  getCitiesByStatus,
  getCountriesByStatus,
  getStatesByStatus,
} from "@/redux/reducers/dataBank/dataBankThunk";
import BulkActionChangeStatus from "./BulkActionChangeStatus";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DataGridTable from "../shared-components/Table-components/DataGridTable";

const columnConfig = {
  shortlistedApplicants: [
    "createdDate",
    "fullName",
    "residentCountry",
    "residentCity",
    "isValidDrivingLicense",
    "contactNumber",
    "campaignName",
    // "status",
    "action",
  ],
  campaignList: [
    "createdDate",
    "fullName",
    "residentCountry",
    "residentCity",
    "isValidDrivingLicense",
    "contactNumber",
    "campaignName",
    "status",
    "action",
  ],
  finalReview: [
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
  hold: [
    "createdDate",
    "fullName",
    "residentCountry",
    "residentCity",
    "isValidDrivingLicense",
    "contactNumber",
    "campaignName",
    "reason",
    "status",
    "action",
  ],
  notQualified: [
    "createdDate",
    "fullName",
    "residentCountry",
    "residentCity",
    "isValidDrivingLicense",
    "contactNumber",
    "campaignName",
    "reason",
    "status",
    "action",
  ],
};

// Define all statuses
const ALL_STATUSES = [
  6, // OnHold
  7, // ShortListed
  8, // CallBack
  9, // NotQualified
  10, // FinalReview
  11, // IncompleteProfile
];

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const ApplicantsTableWrapper = ({
  handleOpenModal,
  pageSize,
  setPageSize,
  setCurrentPage,
  currentPage,
  notQualifiedTableFilters,
  filteredStatuses,
  search,
  setSearch,
  setSelectedApplicantId,
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

  const handleFilterClick = (field) => {
    console.log(`Filter clicked for: ${field}`);
    // Add your filter logic here, such as opening a dropdown or modal
  };

  const menuConfigurations = useMemo(
    () => ({
      home: {
        menuItems: [
          { label: "Proceed", action: "proceed" },
          { label: "Change Status", action: "change_status" },
        ],
      },
      finalReview: {
        menuItems: [
          { label: "View Details", action: "view" },
          { label: "Change Status", action: "change_status" },
        ],
      },
      hold: {
        menuItems: [{ label: "Change Status", action: "change_status" }],
      },
      notQualify: {
        menuItems: [{ label: "Change Status", action: "change_status" }],
      },
    }),
    []
  );

  const menuItemsBulk = [
    { label: "Change Status", action: "change_status_bulk" },
  ];

  const currentMenuConfig = useMemo(() => {
    if (pathname.includes("final-review"))
      return menuConfigurations.finalReview;
    if (pathname.includes("not-qualified"))
      return menuConfigurations.notQualify;
    if (pathname.includes("hold")) return menuConfigurations.hold;
    return menuConfigurations.home; // Default configuration
  }, [menuConfigurations, pathname]);

  const onProceed = (rowData) => {
    // console.log("rowData", rowData);
    // dispatch(getProceedDetails(rowData));
    setSelectedApplicantId(rowData?.id);
    handleOpenModal();
  };

  const OnView = (rowId) => {
    router.push(`/admin/applicants/view-details?id=${rowId}`);
  };

  const onChangeStatus = (rowId) => {
    setShowModal(true);
    setRowIDOfCampaign(rowId);
  };

  const handleMenuClick = (rowData, clickedItem) => {
    if (clickedItem === "proceed") onProceed(rowData);
    if (clickedItem === "view") OnView(rowData?.id);
    if (clickedItem === "change_status") onChangeStatus(rowData?.id);
    if (clickedItem === "change_status_bulk") setShowModalForBulk(true);
  };

  // Define the full columns configuration
  const fullColumns = useMemo(
    () => [
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
        width: 200,
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
        headerName: "RESIDENT COUNTRY",
        align: "left",
        width: 190,
        renderCell: (params) => {
          return params?.row?.currentCountry?.countryName || "N/A";
        },
      },
      {
        field: "residentCity",
        showFilter: true,
        headerName: "RESIDENT CITY",
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
        width: 130,
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
    let key = "campaignList";
    if (pathname.includes("shortlisted-applicants")) {
      key = "shortlistedApplicants";
      setIsBtnAdd(true);
    } else if (pathname.includes("final-review")) {
      key = "finalReview";
    } else if (pathname.includes("hold")) {
      key = "hold";
    } else if (pathname.includes("not-qualified")) {
      key = "notQualified";
    }
    return fullColumns.filter((column) =>
      columnConfig[key]?.includes(column.field)
    );
  }, [pathname, fullColumns]);

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [campaignOptions, setCampaignOptions] = useState([]);

  // const {
  //   getCountryByStatuses,
  //   getStateByStatuses,
  //   getCityByStatuses,
  //   campaignFilterData,
  // } = useSelector((state) => state.dataBankSlice);

  const { advanceFilterDropdownData: FilterDropDown } = useSelector(
    (state) => state.dataBankSlice
  );

  useEffect(() => {
    dispatch(GenericGetAdvancefilterDropdown());
  }, [dispatch]);

  // useEffect(() => {
  //   const params = { page: 1, pageLength: 1000, statuses: 1 };
  //   const paramsCampaign = {
  //     page: 1,
  //     pageLength: 1000,
  //     statuses: [1, 2],
  //   };
  //   dispatch(getCountriesByStatus(params));
  //   dispatch(getCampaignsInFilter(paramsCampaign));
  // }, [dispatch]);

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

  // Fetch cities based on selected state
  const handleStateChange = (stateId) => {
    dispatch(getCitiesByStatus({ statuses: 1, parentId: stateId }));
  };

  const handleCountryChange = (countryId) => {
    dispatch(
      getStatesByStatus({
        statuses: 1,
        parentId: countryId,
      })
    );
  };

  useEffect(() => {
    const isFinalReview = pathname.includes("final-review");

    const baseFilters = [
      {
        id: 2,
        filterName: "Country",
        placeholder: "Select Country",
        options: countryOptions,
        // onChange: (value) => handleCountryChange(value),
      },
      {
        id: 3,
        filterName: "State",
        placeholder: "Select State",
        options: stateOptions,
        // onChange: (value) => handleStateChange(value),
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

    if (isFinalReview) {
      // Show all filters including "Resident"
      setFilters([
        {
          id: 1,
          filterName: "Resident",
          placeholder: "UAE",
          options: [
            { value: "Non UAE Resident", label: "Non UAE Resident" },
            { value: "UAE Resident", label: "UAE Resident" },
          ],
        },
        ...baseFilters,
      ]);
    } else {
      // Exclude "Resident" filter
      setFilters(baseFilters);
    }
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

    // Construct API request params for FILTER
    const param = {
      page: currentPage,
      pageLength: pageSize,
      statuses: filteredStatuses,
      filter: filtersToApi.filter || "", // resident
      filter2: search, // Search
      desc: "false",
      orderBy: "CreatedDate",
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
        filter2: search, // Search
        desc: "false",
        orderBy: "CreatedDate",
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
        filter2: search, // Search
        desc: "false",
        orderBy: "CreatedDate",
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
        link.download = `Applicants.xlsx_${Date.now()}.xlsx`; // Set file name
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
        handleOpenModal={() => {
          handleOpenModal();
          setSelectedApplicantId(null);
        }}
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

          {/* {columns?.length > 10 && (
            <TablePagination
              totalEntries={getListByStatus?.rowCount || 0}
              rowsPerPage={pageSize}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
              setPageSize={handlePageSizeChange}
            />
          )} */}
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
