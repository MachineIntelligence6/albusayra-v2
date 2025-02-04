import React from "react";
import { Typography } from "@mui/material";
import { STATUS_MAPPING } from "@/utils/reusable-functions/statusColors";

export function StatusIndicator({ status }) {
  const statusArr = STATUS_MAPPING[status];
  return (
    <>
      <Typography
        variant="caption"
        sx={{
          py: 1,
          px: 2,
          borderRadius: 1,
          backgroundColor: statusArr?.bg,
          color: statusArr?.color,
        }}
      >
        {statusArr?.name || "NA"}
      </Typography>
    </>
  );
}
