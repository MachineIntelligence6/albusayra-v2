"use client";

import { ViewCard, ViewItem } from "@/components/shared-components/ViewCard";
import { Box, Divider, IconButton } from "@mui/material";

export default function DLInfo({ profile, onEdit }) {
  return (
    <ViewCard title={profile.title} onEdit={onEdit}>
      {profile.data.map((item, index) => (
        <Box key={item.id}>
          <ViewItem
            label={
              <Box
                component="label"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {item.icon}
                <span>{item.label}</span>
              </Box>
            }
            value={
              <Box
                component="label"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {item.icon1}
                <span>{item.value}</span>
                {item.icon2 && (
                  <IconButton size="small" sx={{ color: "#BDBDBD", p: 0, m: 0  }}>
                    {item.icon2}
                  </IconButton>
                )}
              </Box>
            }
          />
          {index < profile.data.length - 1 && (
            <Divider sx={{ borderStyle: "dotted", marginTop: 1 }} />
          )}
        </Box>
      ))}
    </ViewCard>
  );
}
