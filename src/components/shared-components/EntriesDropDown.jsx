"Use Client";

import * as React from "react";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ActionMenu from "./ActionMenu";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Button, TextField } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const EntriesDropDown = () => {
  const [entries, setEntries] = React.useState(10);

  const handleChange = (event) => {
    setEntries(event.target.value);
  };

  const MenuItems = React.useMemo(() => {
    return [
      { label: "Edit Details", action: "edit" },
      { label: "Change Status", action: "change status" },
    ];
  }, []);

  const handleMenuClick = (value) => {
    console.log("clicked menu", value);
    setShowPopup(true);
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
      }}
    >
      <div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          {/* <InputLabel id="demo-simple-select-autowidth-label">Entries</InputLabel> */}
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={entries}
            onChange={handleChange}
            autoWidth
            sx={{
              width: 70,
              height: 40,
              fontSize: 15,
              borderRadius: "6px",
            }}
            //   label={entries}
          >
            {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
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
        }}
      >
        <TextField
          size="small"
          // onChange={onChange}
          customClass="w-2/3"
          placeholder="Search"
          // id={name}
          // name={name}
          // value={value}
          // onBlur={onBlur}
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<FileUploadIcon />}
          sx={{
            backgroundColor: "#808390", // Set background color
            "&:hover": {
              backgroundColor: "#707A80", // Set hover color if needed (slightly darker)
            },
            color: "black",
          }}
        >
          Export
        </Button>
        <Box
          sx={{
            backgroundColor: "rgba(128, 131, 144, 1)",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          <ActionMenu menuItems={MenuItems} onMenuItemClick={handleMenuClick} />
        </Box>
      </Box>
    </Box>
  );
};

export default EntriesDropDown;
