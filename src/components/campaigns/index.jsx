"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import TableFilters from "../shared-components/Table-components/TableFilters";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import { data } from "@/utils/campaigns.data";
import CustomAvatar from "../shared-components/CustomAvatar";
import ActionMenu from "../shared-components/ActionMenu";
import TableExportRow from "../shared-components/Table-components/TableExportRow";
import ActionModalCardCampaign from "../shared-components/ActionModalCardCampaign";
import TablePagination from "../shared-components/Table-components/TablePagination";
import CampaignCreateModal from "../shared-components/CampaignCreateModal";
import { useDispatch, useSelector } from "react-redux";
import {
  ExportCampaignByStatus,
  getCampaignListByStatus,
  getFilteredCampaignsByEmployee,
} from "@/redux/reducers/campaign/campaignThunk";
import FormattedDate from "@/utils/reusable-functions/FormattedDate ";
import { updateSuccess } from "@/redux/reducers/campaign/campaignSlice";
import Loader from "@/utils/reusable-functions/Loader";
import { StatusIndicator } from "../applicants/StatusIndicator";
import {
  GenericGetAdvancefilterDropdown,
  getCampaignsInFilter,
  getCitiesByStatus,
  getCountriesByStatus,
  getStatesByStatus,
} from "@/redux/reducers/dataBank/dataBankThunk";
import BulkActionChangeStatus from "../applicants/BulkActionChangeStatus";
import { updateSuccessBank } from "@/redux/reducers/dataBank/dataBankSlice";
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
  ],
  campaignList: [
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

const CampaignsWrapper = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [rowIDOfCampaign, setRowIDOfCampaign] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModalForBulk, setShowModalForBulk] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [pageSize, setPageSize] = useState(10); // Page size state
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState(""); // Search state
  const [isMenu, setIsMenu] = useState(true); // Set Menu
  const [isSelectedOption, setIsSelectedOption] = useState(true); // Set Row Selection

  const { loading, submitSuccess, getListByStatus } = useSelector(
    (state) => state.campaignSlice
  );

  const { statusChangeSuccessBulk } = useSelector(
    (state) => state.dataBankSlice
  );

  const getCampaignId = searchParams.get("id");

  // Define all statuses
  const ALL_STATUSES = [5, 6, 7, 8, 15];

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePageSizeChange = (size) => setPageSize(size);

  const handleSearchChange = useCallback(
    debounce((value) => setSearch(value), 500),
    []
  );

  // Determine statuses dynamically based on the URL
  const filteredStatuses = useMemo(() => {
    if (pathname.includes("not-qualified")) {
      return [15]; // NotQualified
    }
    if (pathname.includes("admin/applicants/shortlisted-applicants")) {
      return [7]; // ShortListed
    }
    return ALL_STATUSES; // Default: All statuses
  }, [pathname]);

  useEffect(() => {
    const params = {
      page: currentPage,
      pageLength: pageSize,
      statuses: filteredStatuses,
      filter2: search, // Search
      desc: "false",
      orderBy: "CreatedDate",

      filter: null, // Extra Param
      parentId: getCampaignId
        ? Array.isArray(getCampaignId)
          ? getCampaignId
          : [getCampaignId]
        : null, // CampaignID
      SubParentId: null, // Country
      SubParentId1: null, // State
      SubParentId2: null, // City
    };

    dispatch(getCampaignListByStatus(params));
  }, [
    currentPage,
    pageSize,
    filteredStatuses,
    search,
    getCampaignId,
    dispatch,
  ]);

  useEffect(() => {
    if (submitSuccess) {
      const params = {
        page: currentPage,
        pageLength: pageSize,
        statuses: filteredStatuses,
        filter2: search,
        desc: "false",
        orderBy: "CreatedDate",
        parentId: getCampaignId
          ? Array.isArray(getCampaignId)
            ? getCampaignId
            : [getCampaignId]
          : null,
        filter: null, // Extra Param
        SubParentId: null,
        SubParentId1: null,
        SubParentId2: null,
      };

      dispatch(getCampaignListByStatus(params));
      dispatch(updateSuccess());
    }
  }, [
    submitSuccess,
    currentPage,
    pageSize,
    filteredStatuses,
    search,
    getCampaignId,
    dispatch,
  ]);

  useEffect(() => {
    if (statusChangeSuccessBulk) {
      const params = {
        page: currentPage,
        pageLength: pageSize,
        statuses: filteredStatuses,
        filter2: search,
        desc: "false",
        orderBy: "CreatedDate",
        parentId: getCampaignId
          ? Array.isArray(getCampaignId)
            ? getCampaignId
            : [getCampaignId]
          : null, // CampaignID
        filter: null, // Extra Param
        SubParentId: null,
        SubParentId1: null,
        SubParentId2: null,
      };

      dispatch(getCampaignListByStatus(params));
      dispatch(updateSuccessBank());
    }
  }, [
    statusChangeSuccessBulk,
    currentPage,
    pageSize,
    filteredStatuses,
    search,
    getCampaignId,
    dispatch,
  ]);

  const handleRowSelect = (selectedRowIds) => {
    console.log("Selected Row IDs:", selectedRowIds);
    setBulkRowIds(selectedRowIds);
  };

  const handleMenuClick = (item, rowID) => {
    if (item?.action === "change_status") {
      setShowModal(true);
      setRowIDOfCampaign(rowID);
    }
    if (item?.action === "edit") setShowEditModal(true);
  };

  const handleMenuClickBulk = (rowData, clickedItem) => {
    console.log(clickedItem);

    if (clickedItem === "change_status_bulk") setShowModalForBulk(true);
  };

  const menuItems = useMemo(
    () => [
      // { label: "Edit Details", action: "edit" },
      { label: "Change Status", action: "change_status" },
    ],
    []
  );

  const menuItemsBulk = [
    { label: "Change Status", action: "change_status_bulk" },
  ];

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
        field: "contactNumber",
        showFilter: true,
        headerName: "PHONE NUMBER",
        align: "left",
        width: 190,
        renderCell: (params) => params?.row?.contactNumber || "N/A",
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
        headerName: "Action",
        align: "left",
        width: 100,
        renderCell: (params) => (
          <ActionMenu
            menuItems={menuItems}
            onMenuItemClick={(value) => handleMenuClick(value, params?.row?.id)}
          />
        ),
      },
    ],
    [menuItems]
  );

  // Dynamically set columns based on the current path
  const columns = useMemo(() => {
    const key = pathname.includes("not-qualified")
      ? "notQualified"
      : pathname.includes("admin/applicants/shortlisted-applicants")
      ? "shortlistedApplicants"
      : "campaignList";
    return fullColumns.filter((column) =>
      columnConfig[key]?.includes(column.field)
    );
  }, [pathname, fullColumns]);

  // Filters
  const [appliedFilters, setAppliedFilters] = useState([]); //Advance filters
  const [bulkRowIds, setBulkRowIds] = useState([]); //Advance Menu
  const filtersList = filters || [];
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

  //// Update campaign options and set default campaign if ID is in URL
  // useEffect(() => {
  //   if (campaignFilterData?.data?.length > 0) {
  //     const formattedOptions = campaignFilterData.data.map((campaign) => ({
  //       value: campaign.id,
  //       label: campaign.campaignName,
  //     }));

  //     setCampaignOptions(formattedOptions);

  //     // Pre-select the campaign if `id` exists in URL
  //     if (getCampaignId) {
  //       setAppliedFilters([
  //         {
  //           filterName: "Campaign",
  //           value: getCampaignId,
  //         },
  //       ]);
  //     }
  //   }
  // }, [campaignFilterData, getCampaignId]);

  // Get Campaigns in DropDown
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

  // Fetch cities/states based on selected Id
  // const handleCountryChange = (countryId) => {
  //   dispatch(
  //     getStatesByStatus({
  //       statuses: 1,
  //       parentId: countryId,
  //     })
  //   );
  // };

  // const handleStateChange = (stateId) => {
  //   dispatch(getCitiesByStatus({ statuses: 1, parentId: stateId }));
  // };

  useEffect(() => {
    const baseFilters = [
      {
        id: 0,
        filterName: "Campaign",
        placeholder: "Select campaigns",
        options: campaignOptions,
      },
      {
        id: 1,
        filterName: "Country",
        placeholder: "Select Country",
        options: countryOptions,
        // onChange: (value) => handleCountryChange(value),
      },
      {
        id: 2,
        filterName: "State",
        placeholder: "Select State",
        options: stateOptions,
        // onChange: (value) => handleStateChange(value),
      },
      {
        id: 3,
        filterName: "City",
        placeholder: "Select City",
        options: cityOptions,
      },
    ];

    setFilters(baseFilters);
  }, [campaignOptions, countryOptions, stateOptions, cityOptions]);

  // Transform filters to API format
  useEffect(() => {
    const filtersToApi = appliedFilters.reduce((acc, filter) => {
      if (filter.filterName === "Campaign") {
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

    // Maintain previous values if they exist
    const param = {
      page: currentPage,
      pageLength: pageSize,
      statuses: filteredStatuses,
      filter: filtersToApi.filter ?? null, // Extra Param
      filter2: search ?? "", // Ensure search is not resetting other params
      desc: "false",
      orderBy: "CreatedDate",

      parentId: filtersToApi.parentId
        ? Array.isArray(filtersToApi.parentId)
          ? filtersToApi.parentId
          : [filtersToApi.parentId]
        : getCampaignId
        ? [getCampaignId]
        : null, // Ensure it's always an array

      SubParentId: filtersToApi.SubParentId ?? null,
      SubParentId1: filtersToApi.SubParentId1 ?? null,
      SubParentId2: filtersToApi.SubParentId2 ?? null,
    };

    dispatch(getCampaignListByStatus(param));
  }, [
    dispatch,
    currentPage,
    pageSize,
    search,
    appliedFilters,
    filteredStatuses,
    getCampaignId,
  ]);

  // Export
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
    dispatch(ExportCampaignByStatus(params)).then((action) => {
      if (action.payload) {
        // Ensure Blob is handled correctly
        const blob = new Blob([action.payload], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel MIME type
        });

        // Create a temporary link element for downloading
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `CamaignList.xlsx_${Date.now()}.xlsx`; // Set file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Failed to export data:", action.error);
      }
    });
  };

  // DataBank
  useEffect(() => {
    const isNotQualified = pathname.includes("not-qualified");
    if (isNotQualified) {
      setIsMenu(false);
      setIsSelectedOption(false);
    }
  }, []);

  return (
    <Box sx={{ bgcolor: "white", overflow: "hidden", m: 1.5, borderRadius: 6 }}>
      <TableFilters
        filters={filters}
        onApplyFilters={handleApplyFilters}
        isBtnSearch={true}
        multiSelect={true}
      />
      <TableExportRow
        isBtnAdd={false}
        totalEntries={pageSize}
        setTotalEntries={setPageSize}
        onSearch={handleSearchChange}
        // BulkMenu
        isMenu={isMenu}
        menuItems={menuItemsBulk}
        handleMenuClick={handleMenuClickBulk}
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
      {/* {showEditModal && (
        <CampaignCreateModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )} */}
    </Box>
  );
};

export default CampaignsWrapper;
