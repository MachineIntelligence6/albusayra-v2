"use client";

import Select from "@mui/material/Select";
import { Box, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";
import CustomButton from "./CustomButton";
import ActionMenu from "./ActionMenu";
import CustomTextField from "./CustomTextField";

const CustomTableExportRow = ({
  onAddButtonClick, // Function to handle Add button click
  isBtnAdd = true, // Controls the visibility of the Add button
  isExportBtn = true, // Controls the visibility of the Export button
  isActionMenu = true, // Controls the visibility of the ActionMenu
  showSearch = true, // Controls the visibility of the search bar
  setTotalEntries, // Function to handle changes in total entries
  totalEntries, // Current value for total entries dropdown
  btnText = "Add New", // Text for the Add button
  menuItems = [], // Menu items for the ActionMenu
  onSearchChange, // Function to handle search input changes
  onMenuItemClick, // Function to handle menu item click
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        marginBottom: 1,
        padding: 1,
      }}
    >
      <div>
        <FormControl sx={{ minWidth: 80 }}>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={totalEntries}
            onChange={(e) => setTotalEntries && setTotalEntries(e.target.value)}
            autoWidth
            sx={{
              width: 70,
              height: 40,
              fontSize: 15,
              borderRadius: "6px",
            }}
          >
            <MenuItem value={10} defaultChecked>
              10
            </MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: 2,
          alignItems: "center",
          marginRight: 1,
        }}
      >
        {showSearch && (
          <CustomTextField
            placeholder="Search"
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
        )}

        <Box>
          {isExportBtn && (
            <CustomButton
              bgColor="foreground"
              color="#808390"
              endIcon={<FileUploadIcon />}
            >
              Export
            </CustomButton>
          )}
        </Box>
        {isBtnAdd && (
          <CustomButton
            endIcon={<AddIcon />}
            onClick={onAddButtonClick ? () => onAddButtonClick() : null}
          >
            {btnText}
          </CustomButton>
        )}
        {isActionMenu && (
          <Box
            component="div"
            sx={{
              backgroundColor: "#80839029",
              textAlign: "center",
              borderRadius: "5px",
            }}
          >
            <ActionMenu
              menuItems={menuItems}
              onMenuItemClick={(value) =>
                onMenuItemClick && onMenuItemClick(value)
              }
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CustomTableExportRow;
