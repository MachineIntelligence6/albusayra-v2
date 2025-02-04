import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DescriptiveText from "./DescriptiveText";
import { custom } from "@/app/theme";

const ActionMenu = ({
  menuItems = [],
  onMenuItemClick,
  color,
  vertical = false,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (menuItem) => {
    if (onMenuItemClick) {
      onMenuItemClick(menuItem);
    }
    handleCloseMenu();
  };

  return (
    <>
      <IconButton
        aria-label="more-options"
        aria-controls="more-options-menu"
        aria-haspopup="true"
        onClick={handleOpenMenu}
      >
        <MoreVertIcon
          sx={{
            color: color ? color : "",
            transform: vertical ? "rotate(90deg)" : "none",
          }}
        />
      </IconButton>
      <Menu
        id="more-options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5, // Limit menu height
            minWidth: "220px",
            p: 2,
            borderRadius: 8,
          },
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItemClick(item)}
            sx={{ mx: 1, "&:hover": { "& p": { color: custom.deepBlue } } }}
          >
            <DescriptiveText text={item.label} color={custom.primaryText} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ActionMenu;
