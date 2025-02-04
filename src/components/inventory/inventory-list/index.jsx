"use client";

import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import { Box, Divider } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import InventoryTableWrapper from "./InventoryTableWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  InventoryGetByStatusesBike,
  InventoryGetByStatusesSim,
} from "@/redux/reducers/inventory/inventoryThunk";
import { GenericGetProductCategoryDropdown } from "@/redux/reducers/dataBank/dataBankThunk";
import CustomDropdownButton from "@/components/shared-components/CustomDropdownButton";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
const InventoryList = () => {
  const dispatch = useDispatch();
  const [appliedFilters, setAppliedFilters] = useState([]); //Advance filters
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [pageSize, setPageSize] = useState(10); // Page size state
  const [search, setSearch] = useState(""); // Search state
  const [selectedProduct, setSelectedProduct] = useState({
    value: "",
    label: "",
  });
  const [productType, setProductType] = useState("");
  const { productCategoryData: productData } = useSelector(
    (state) => state.dataBankSlice
  );

  console.log("appliedFilters", appliedFilters);

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
    if (!selectedProduct || !selectedProduct.label) return;
    // Transform filters to API format based on selected product
    const filtersToApi = appliedFilters.reduce((acc, filter) => {
      if (selectedProduct.label === "Bike") {
        if (filter.filterName === "Bike Plate Number")
          acc.filter2 = filter.value;
        else if (filter.filterName === "Bike Type") acc.filter = filter.value;
        else if (filter.filterName === "Bike Cost") acc.filter3 = filter.value;
        else if (filter.filterName === "Country")
          acc.SubParentId = filter.value;
        else if (filter.filterName === "City") acc.SubParentId2 = filter.value;
      } else if (selectedProduct.label === "Sim") {
        if (filter.filterName === "Sim Number") acc.filter2 = filter.value;
        else if (filter.filterName === "Sim Ownership")
          acc.filter = filter.value;
        else if (filter.filterName === "Vendor Name")
          acc.SubParentId = filter.value;
      }
      return acc;
    }, {});

    // Bike Type // filter
    // Bike Plate Number // filter2
    // Bike Cost // filter3

    // Construct API request params
    const param = {
      page: currentPage,
      pageLength: 1000,
      statuses: [1, 2, 12],
      filter: filtersToApi.filter || "",
      filter2: filtersToApi.filter2 || "",
      filter3: filtersToApi.filter3 || "",
      desc: true,
      orderBy: "CreatedDate",
      parentId: selectedProduct?.value || "",
      SubParentId: filtersToApi.SubParentId || "",
      SubParentId1: filtersToApi.SubParentId1 || "",
      SubParentId2: filtersToApi.SubParentId2 || "",
    };

    // Conditionally call the appropriate API
    if (selectedProduct.label === "Bike") {
      dispatch(InventoryGetByStatusesBike(param));
    } else if (selectedProduct.label === "Sim") {
      dispatch(InventoryGetByStatusesSim(param));
    }
  }, [
    dispatch,
    currentPage,
    pageSize,
    search,
    appliedFilters,
    selectedProduct,
  ]);
  const inventoryBikeData = useSelector(
    (state) => state?.inventorySlice?.getByStatus
  );
  const inventorySimData = useSelector(
    (state) => state?.inventorySlice?.getByStatusSim
  );
  const handlePageChange = (page) => setCurrentPage(page);
  const handlePageSizeChange = (size) => setPageSize(size);
  const handleSearchChange = useCallback(
    debounce((value) => setSearch(value), 500),
    []
  );

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
      <InventoryTableWrapper
        tableData={
          selectedProduct?.label === "Bike"
            ? inventoryBikeData
            : inventorySimData
        }
        pageSize={pageSize}
        currentPage={currentPage}
        setPageSize={setPageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSearch={handleSearchChange}
        search={search}
        setAppliedFilters={setAppliedFilters}
        inventoryModuleName={selectedProduct?.label}
        selectedProduct={selectedProduct}
      />
    </Box>
  );
};

export default InventoryList;
