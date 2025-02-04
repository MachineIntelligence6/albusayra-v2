import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton } from "@mui/material";

const customTheme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "1px solid #ccc",
          fontFamily: "Public Sans, sans-serif",
          fontSize: "14px",
        },
        columnHeaders: {
          fontWeight: "bold",
          fontSize: "13px",
          border: "0px ",
        },
        columnHeader: {
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
        },
        // row: {
        //   "&:nth-of-type(odd)": {
        //     backgroundColor: "#fff",
        //     height: "70px", // Set the height for all rows
        //     maxHeight: "70px !important", // Ensure the height is fixed
        //     minHeight: "70px !important", // Ensure the height is fixed
        //   },
        //   "&:nth-of-type(even)": {
        //     backgroundColor: "#fff",
        //     height: "70px", // Set the height for all rows
        //     maxHeight: "70px !important", // Ensure the height is fixed
        //     minHeight: "70px !important", // Ensure the height is fixed
        //   },
        // },
      },
    },
  },
});

// const DataGridTable = ({
//   data,
//   columns,
//   onRowSelect,
//   isSelectedOption,
//   pageSize,
//   setPageSize,
// }) => {
//   const [selectedRows, setSelectedRows] = useState([]);

//   const handleRowSelection = (newSelection) => {
//     setSelectedRows(newSelection);
//     onRowSelect && onRowSelect(newSelection);
//   };

//   const handlePageSizeChange = (newPageSize) => {
//     setPageSize(newPageSize); // Update pageSize state when the dropdown changes
//   };

//   return (
//     <ThemeProvider theme={customTheme}>
//       <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
//         <DataGrid
//           rows={data}
//           columns={columns}
//           pageSize={pageSize} // Sync with current pageSize
//           onPageSizeChange={handlePageSizeChange} // Handle pageSize changes
//           pagination
//           paginationMode="client" // Ensure client-side pagination
//           checkboxSelection={isSelectedOption}
//           // hideFooterPagination // Hide the default pagination at the bottom
//           pageSizeOptions={false}
//           onRowSelectionModelChange={
//             isSelectedOption ? handleRowSelection : undefined
//           }
//           sx={{
//             "& .MuiDataGrid-cell": {
//               padding: "14px",
//               display: "flex",
//               alignItems: "center",
//               // height: "70px",
//             },
//             "& .MuiDataGrid-columnHeader": {
//               borderBottom: "0px solid #ddd",
//             },
//             "& .MuiDataGrid-footerContainer": {
//               justifyContent: "space-between",
//               padding: "8px",
//             },
//           }}
//         />
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default DataGridTable;

const DataGridTable = ({
  data,
  columns,
  onRowSelect,
  isSelectedOption,
  pageSize,
  setPageSize,
  showFilters = true, // Default to true
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelection = (newSelection) => {
    setSelectedRows(newSelection);
    onRowSelect && onRowSelect(newSelection);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          pagination
          paginationMode="client"
          checkboxSelection={isSelectedOption}
          disableColumnFilter={!showFilters} // Disable filters if showFilters is false
          disableColumnMenu={!showFilters} // Hide column menu if filters are disabled
          pageSizeOptions={false}
          onRowSelectionModelChange={
            isSelectedOption ? handleRowSelection : undefined
          }
          sx={{
            "& .MuiDataGrid-cell": {
              padding: "14px",
              display: "flex",
              alignItems: "center",
            },
            "& .MuiDataGrid-columnHeader": {
              borderBottom: "0px solid #ddd",
            },
            "& .MuiDataGrid-footerContainer": {
              justifyContent: "space-between",
              padding: "8px",
            },

            // "& .MuiDataGrid-columnHeaderTitleContainer": {
            //   opacity: "1 !important",
            // },
            // "& .MuiDataGrid-columnHeaders": {
            //   "& .MuiDataGrid-sortIcon": {
            //     opacity: "1 !important",
            //   },
            //   "& .MuiDataGrid-iconButtonContainer": {
            //     visibility: "visible !important", // Force visibility of filter icon
            //     opacity: "1 !important",
            //   },
            // },

            // "& .MuiDataGrid-columnHeaders": {
            //   backgroundColor: "#f8f9fa", // Light background for clarity (optional)
            // },
            // "& .MuiDataGrid-columnHeaderTitleContainer": {
            //   display: "flex",
            //   alignItems: "center",
            // },
            // "& .MuiDataGrid-columnHeader": {
            //   "& .MuiDataGrid-iconButtonContainer": {
            //     visibility: "visible !important", // Always show filter icon (three dots)
            //     display: "flex !important",
            //   },
            //   "& .MuiDataGrid-sortIcon": {
            //     opacity: 1, // Make sure sorting icon is visible
            //   },
            // },
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default DataGridTable;
