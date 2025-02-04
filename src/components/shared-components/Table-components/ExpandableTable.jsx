import React from "react";
import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ExpandableTable = (props) => {
  const {
    columns,
    data,
    nestedColumns,
    renderNestedData,
    selectedRows,
    setSelectedRows,
    expandedRows,
    setExpandedRows,
    onRowSelect,
    isFiltered = false,
    isSelectedOption = false,
  } = props;

  const isAllSelected =
    selectedRows?.length === data?.length && data?.length > 0;
  const isIndeterminate =
    selectedRows?.length > 0 && selectedRows?.length < data?.length;

  const handleSelectRow = (rowId) => {
    const updatedSelection = selectedRows.includes(rowId)
      ? selectedRows.filter((id) => id !== rowId)
      : [...selectedRows, rowId];

    setSelectedRows(updatedSelection);
    onRowSelect && onRowSelect(updatedSelection);
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
      onRowSelect && onRowSelect([]);
    } else {
      const allRowIds = data.map((row) => row.id);
      setSelectedRows(allRowIds);
      onRowSelect && onRowSelect(allRowIds);
    }
  };

  const toggleExpandRow = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };
  console.log("renderNestedData", renderNestedData);
  console.log("nestedColumns", nestedColumns);
  return (
    <TableContainer>
      <Table>
        <TableHead sx={{ bgcolor: "#80839014", textTransform: "uppercase" }}>
          <TableRow>
            {isSelectedOption && (
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={isIndeterminate}
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </TableCell>
            )}
            <TableCell />
            {columns.map((column) => (
              <TableCell
                key={column.field}
                align={column.align || "left"}
                size="small"
                sx={{ py: 1.5 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontWeight: 500, fontSize: 13 }}>
                    {column.headerName}
                  </Typography>
                  {isFiltered &&
                    column?.headerName?.toLowerCase() !=
                      "Actions".toLowerCase() && (
                      <Box
                        component="img"
                        src="/icons/filter.svg"
                        sx={{ width: 20, height: 20, cursor: "pointer" }}
                        onClick={() => {}}
                      ></Box>
                    )}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <React.Fragment key={row.id}>
              {/* Parent Row */}
              <TableRow hover>
                {isSelectedOption && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </TableCell>
                )}
                <TableCell padding="checkbox">
                  <IconButton onClick={() => toggleExpandRow(row.id)}>
                    {expandedRows[row.id] ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowRightIcon />
                    )}
                  </IconButton>
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.field} align={column.align || "left"}>
                    {column.render
                      ? column.render(row)
                      : typeof row[column.field] === "object"
                      ? row[column.field]?.name || "-"
                      : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>

              {/* Expandable Content */}
              <TableRow>
                <TableCell colSpan={columns.length + 2} style={{ padding: 0 }}>
                  <Collapse
                    in={expandedRows[row.id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box sx={{ margin: 2, borderRadius: 3 }}>
                      <Table size="small" sx={{}}>
                        <TableHead sx={{}}>
                          <TableRow sx={{ bgcolor: "#23567F" }}>
                            {nestedColumns.map((nestedColumn) => (
                              <TableCell
                                key={nestedColumn.field}
                                sx={{
                                  color: "white",
                                  fontSize: 13,
                                  fontWeight: 500,
                                  textTransform: "uppercase",
                                }}
                              >
                                {nestedColumn.headerName}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {renderNestedData(row.id)?.map((nestedRow, index) => (
                            <TableRow key={index}>
                              {nestedColumns.map((nestedColumn) => (
                                <TableCell key={nestedColumn.field}>
                                  {nestedColumn.render
                                    ? nestedColumn.render(nestedRow)
                                    : nestedRow[nestedColumn.field]}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpandableTable;
