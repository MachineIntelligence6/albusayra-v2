"use client";

import { useMemo, useState } from "react";
import Select from "@mui/material/Select";
import { Box, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ActionMenu from "../ActionMenu";
import AddIcon from "@mui/icons-material/Add";
import CustomButton from "../CustomButton";
import CustomTextField from "../CustomTextField";
import { UploadIcon } from "@/utils/Icons";
import { custom } from "@/app/theme";
import * as XLSX from "xlsx";

const TableExportRow = ({
  handleOpenModal,
  isBtnAdd,
  setTotalEntries,
  handleMenuClick,
  totalEntries,
  btnText = "Add New",
  required = false,
  isExportBtn,
  isMenu,
  onSearch,
  showSearchField = true,
  handleExport,
  pagination = true,
  menuItems = [
    // Add menuItems prop with a default value
    { label: "Edit Details", action: "edit" },
    { label: "Change Status", action: "change status" },
  ],
}) => {
  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    onSearch(value);
  };

  const handleChange = (event) => {
    if (setTotalEntries) {
      setTotalEntries(event.target.value);
    } else {
      console.error("setTotalEntries is not defined");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        marginBottom: 1,
        padding: 1,
        px: 2,
      }}
    >
      <div>
        {pagination && (
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={totalEntries}
              onChange={handleChange}
              autoWidth
              sx={{
                width: 70,
                height: 40,
                fontSize: "15px",
                borderRadius: "7px",
                color: custom.primaryText,
                fontWeight: "400",
              }}
            >
              <MenuItem value={10} defaultChecked>
                10
              </MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        )}
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: 2,
          alignItems: "center",
        }}
      >
        {showSearchField && (
          <CustomTextField
            variant="outlined"
            placeholder="Search"
            type="text"
            required
            error={false}
            onChange={handleInputChange}
            sx={{
              borderRadius: "6px",
              width: "auto",
            }}
          />
        )}

        {isExportBtn && (
          <CustomButton
            bgColor="foreground"
            color={custom.secondaryText}
            startIcon={<UploadIcon />}
            onClick={handleExport}
          >
            Export
          </CustomButton>
        )}
        {isBtnAdd && (
          <CustomButton
            endIcon={<AddIcon />}
            onClick={handleOpenModal ? () => handleOpenModal() : () => {}}
          >
            {btnText}
          </CustomButton>
        )}
        <Box
          component="div"
          sx={{
            backgroundColor: "#80839029",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          {isMenu && (
            <ActionMenu
              menuItems={menuItems}
              onMenuItemClick={(item) => handleMenuClick(null, item.action)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TableExportRow;
