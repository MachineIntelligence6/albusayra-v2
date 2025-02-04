import React, { useMemo } from "react";
import { Box, Typography, Pagination } from "@mui/material";
import { custom } from "@/app/theme";

// const TablePagination = ({
//   totalEntries,
//   rowsPerPage,
//   currentPage,
//   setCurrentPage,
//   setPageSize,
// }) => {
//   const totalPages = Math.ceil(totalEntries / rowsPerPage);

//   // Calculate the displayed range of entries
//   const rangeText = useMemo(() => {
//     const start = (currentPage - 1) * rowsPerPage + 1;
//     const end = Math.min(currentPage * rowsPerPage, totalEntries);
//     return `Showing ${start} to ${end} of ${totalEntries} entries`;
//   }, [currentPage, rowsPerPage, totalEntries]);

//   const handlePageChange = (event, page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         padding: "16px",
//       }}
//     >
//       {/* Entry Range Text */}
//       <Typography variant="body2" color="text.secondary">
//         {rangeText}
//       </Typography>

//       {/* Pagination Component */}
//       <Pagination
//         count={totalPages}
//         page={currentPage}
//         onChange={handlePageChange}
//         siblingCount={1}
//         boundaryCount={1}
//         variant="outlined"
//         shape="rounded"
//         sx={{
//           "& .MuiPaginationItem-root": {
//             borderRadius: "4px",
//             backgroundColor: "#1047741A",
//             color: custom.primaryText,
//             border: "none",
//           },
//           "& .Mui-selected": {
//             backgroundColor: "#004080 !important", // Custom color for the selected page
//             color: "white !important",
//           },
//         }}
//       />
//     </Box>
//   );
// };

// export default TablePagination;

const TablePagination = ({
  totalEntries,
  rowsPerPage,
  currentPage,
  setCurrentPage,
  setPageSize,
}) => {
  const totalPages = Math.ceil(totalEntries / rowsPerPage);

  const rangeText = useMemo(() => {
    if (totalEntries === 0) return "No entries available";
    const start = (currentPage - 1) * rowsPerPage + 1;
    const end = Math.min(currentPage * rowsPerPage, totalEntries);
    return `Showing ${start} to ${end} of ${totalEntries} entries`;
  }, [currentPage, rowsPerPage, totalEntries]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {rangeText}
      </Typography>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        siblingCount={1}
        boundaryCount={1}
        variant="outlined"
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: "4px",
            backgroundColor: "#1047741A",
            color: custom.primaryText,
            border: "none",
          },
          "& .Mui-selected": {
            backgroundColor: "#004080 !important",
            color: "white !important",
          },
        }}
      />
    </Box>
  );
};

export default TablePagination;
