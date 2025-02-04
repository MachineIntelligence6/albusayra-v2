"use client";

import { ViewCard, ViewItem } from "@/components/shared-components/ViewCard";
import { Box, Divider } from "@mui/material";

export default function VisaInfo({ profile, onEdit }) {
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
            value={item.value}
          />
          {index < profile.data.length - 1 && (
            <Divider sx={{ borderStyle: "dotted", marginTop: 1 }} />
          )}
        </Box>
      ))}
    </ViewCard>
  );
}
