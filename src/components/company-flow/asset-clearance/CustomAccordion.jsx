"use client";
import { useState } from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import Scrollbars from "react-custom-scrollbars-2";

export default function CustomizedAccordions({ data, column, items, title }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box
      height="500px"
      sx={{
        width: "100%",
        maxWidth: "100%",
        backgroundColor: "#fff",
        borderRadius: "25px",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: "18px",
          color: "#4B465C",
          margin: "20px",
        }}
      >
        {title}
      </Typography>

      {/* Accordions */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
    </Box>
  );
}

CustomizedAccordions.propTypes = {
  data: PropTypes.array.isRequired,
  column: PropTypes.array.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      contentType: PropTypes.oneOf(["table"]).isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};
