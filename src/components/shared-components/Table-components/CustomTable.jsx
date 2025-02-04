"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Box,
  Typography,
  styled,
} from "@mui/material";
import { custom } from "@/app/theme";

const CustomTable = ({
  columns,
  data,
  onRowSelect,
  handleFilterClick,
  isSelectedOption,
  headTextTransform = "capitalize",
  headingTextColor = "#2F2B3DE5",
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const isAllSelected =
    selectedRows.length === data?.length && data?.length > 0;
  const isIndeterminate =
    selectedRows.length > 0 && selectedRows?.length < data?.length;

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

  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    "&.Mui-checked": {
      color: custom.deepBlue,
      backgroundColor: "transparent",
    },
  }));

  return (
    <TableContainer
      sx={{
        maxWidth: "100vw",
      }}
      className="no-scroll-show"
    >
      <Table stickyHeader>
        <TableHead
          sx={{
            "& .MuiTableCell-root": {
              fontWeight: "500",
              bgcolor: "#80839014",
            },
          }}
        >
          <TableRow sx={{ "& .MuiTableCell-root": { py: "5px" } }}>
            {isSelectedOption && (
              <TableCell padding="checkbox">
                <CustomCheckbox
                  indeterminate={isIndeterminate}
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  size="small"
                />
              </TableCell>
            )}
            {columns.map((column) => {
              return (
                <TableCell
                  key={column.field}
                  align={column.align || "left"}
                  sx={{
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    wordSpacing: 1,
                    width: 200,
                  }}
                >
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                      py: 1,
                      minWidth: 140,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: 13,
                        fontWeight: 500,
                        textTransform: headTextTransform,
                        color: headingTextColor,
                        letterSpacing: 0.5,
                      }}
                    >
                      {column.headerName}
                    </Typography>
                    {column.showFilter && (
                      <Box
                        component="img"
                        src="/icons/filter.svg"
                        sx={{ width: 20, height: 20, cursor: "pointer" }}
                        onClick={() => handleFilterClick(column.field)}
                      ></Box>
                    )}
                  </Box>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.id}
              hover
              sx={{
                "& .MuiTableCell-root": { py: "13px" },
                color: custom.primaryText,
              }}
            >
              {isSelectedOption && (
                <TableCell padding="checkbox">
                  <CustomCheckbox
                    size="small"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </TableCell>
              )}
              {columns?.map((column) => (
                <TableCell
                  key={column.field}
                  align={column?.align || "left"}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  <Box>
                    {column.render ? (
                      column.render(row)
                    ) : typeof row[column.field] === "object" ? (
                      (
                        <Typography
                          color={custom.primaryText}
                          fontSize="14px"
                          fontWeight="400"
                        >
                          {row[column.field]?.name}
                        </Typography>
                      ) || "-"
                    ) : (
                      <Typography
                        color={custom.primaryText}
                        fontSize="14px"
                        fontWeight="400"
                      >
                        {row[column.field]}
                      </Typography>
                    )}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
