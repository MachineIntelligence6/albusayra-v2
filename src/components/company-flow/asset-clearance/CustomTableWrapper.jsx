"use client";
import React, { useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import TablePagination from "@/components/shared-components/Table-components/TablePagination";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { CustomTableFilter } from "@/components/shared-components/Table-components/customTableFilter";
import CustomTableExportRow from "@/components/shared-components/customTableExportRow";

const CustomTableWrapper = ({
  handleOpenModal,
  handleCloseModal,
  setCurrentPage,
  rowsPerPage,
  currentPage,
  filters,
  column,
  handleRowSelect,
  handleMenuClick,
  handleFilterClick,
  tableData,
  // header export row
  totalEntries,
  setTotalEntries,
  isBtnAdd,
  isExportBtn,
  isActionMenu,
  showSearch,
  menuItems,
  onSearchChange,
  btnText,
  filterTitle = "Advanced Filter",
  isShow = true,
  isWidth = false,
  isHeader = true,
  isBorderRadius = false,
}) => {
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return tableData?.slice(startIndex, endIndex);
  }, [currentPage, rowsPerPage, tableData]);
  return (
    <Box
      sx={{
        bgcolor: "white",
        overflow: "hidden",
        width: isWidth ? "100%" : "auto",
        borderRadius: isBorderRadius ? "25px" : 0,
      }}
    >
      {isHeader && (
        <Box display="flex" justifyContent="space-between" sx={{ m: 2 }}>
          <Typography variant="caption" sx={{ fontSize: 16 }}>
            {filterTitle}
          </Typography>
          {isShow && (
            <Button color="#2F2B3D" onClick={handleCloseModal}>
              <ClearOutlinedIcon />
            </Button>
          )}
        </Box>
      )}
      <CustomTableFilter filters={filters} />
      <CustomTableExportRow
        onAddButtonClick={handleOpenModal}
        isBtnAdd={isBtnAdd}
        isExportBtn={isExportBtn}
        isActionMenu={isActionMenu}
        showSearch={showSearch}
        onSearchChange={onSearchChange}
        setTotalEntries={setTotalEntries}
        totalEntries={totalEntries}
        menuItems={menuItems}
        btnText={btnText}
        onMenuItemClick={handleMenuClick}
      />
      <Box sx={{ height: "100%" }}>
        <CustomTable
          columns={column}
          data={paginatedData}
          onRowSelect={handleRowSelect}
          handleFilterClick={handleFilterClick}
          isSelectedOption={false}
        />
        {/* Pagination Component */}
        <TablePagination
          totalEntries={totalEntries}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </Box>
  );
};

export default CustomTableWrapper;

// usage
//  <CustomTableWrapper
//         handleOpenModal={handleOpenModal}
//         handleCloseModal={handleCloseModal}
//         rowsPerPage={rowsPerPage}
//         setCurrentPage={setCurrentPage}
//         currentPage={currentPage}
//         filters={filters}
//         column={column}
//         handleFilterClick={handleFilterClick}
//         handleMenuClick={handleMenuClick}
//         handleRowSelect={handleRowSelect}
//         pathname={pathname}
//         tableData={assetClarenceData}
//         // Header export Row props
//         totalEntries={totalEntries}
//         setTotalEntries={handleTotalEntriesChange}
//         isBtnAdd={true}
//         isExportBtn={true}
//         isActionMenu={true}
//         showSearch={true}
//         menuItems={headerMenuItems}
//         onSearchChange={onSearchChange}
//         btnText="Add New Item"
//       />
