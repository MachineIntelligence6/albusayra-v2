import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AssetsAccordion = ({ data, column, items, title }) => {
  const [expanded, setExpanded] = useState("panel0");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {items.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          sx={{
            p: 0,
            m: 0,
            boxShadow: "none",
            borderBottom: "1px solid rgba(172, 170, 177, 0.20)",
            "&:last-child": { borderBottom: 0 },
          }}
        >
          {/* Accordion Header */}
          <Box sx={{ bgcolor: "#F4F4F4" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                p: 0,
                mx: 2,
                "& .MuiAccordionSummary-content": {
                  margin: 0,
                },
              }}
            >
              <Typography
                sx={{
                  color: "#000",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {item.title}
              </Typography>
            </AccordionSummary>
          </Box>

          {/* Accordion Content */}
          <AccordionDetails sx={{ padding: 0, margin: 0 }}>
            <Scrollbars style={{ height: 200, width: "100%" }}>
              <CustomTable
                columns={column}
                data={data}
                isSelectedOption={false}
              />
            </Scrollbars>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default AssetsAccordion;
