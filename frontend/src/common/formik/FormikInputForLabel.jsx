import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React, { useState } from "react";
import FormikInput from "./FormikInput";
import { COLORS_FOR_PROJECTS } from "../../constant/colors";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const FormikInputForLabel = (props) => {
  const [isAccordianOpen, setIsAccodianOpen] = useState(false);

  const hanldeAccordianOpen = () => {
    setIsAccodianOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
      <FormikInput {...props} />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Accordion
          sx={{
            display: "flex",
            flexDirection: "row",
            width: `${isAccordianOpen ? "30rem" : "5rem"}`,
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon />}
            onClick={hanldeAccordianOpen}
          >
            <Box
              sx={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                backgroundColor: "black",
                cursor: "pointer",
              }}
              onClick={() => {
                //   setColorName(color);
              }}
            ></Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              flexDirection: "row", // Display children horizontally
              justifyContent: "flex-start", // Align children to the start
              gap: "8px",
              alignItems: "center",
              mt: 1.5,
            }}
          >
            {COLORS_FOR_PROJECTS.map((color) => {
              return (
                <Box
                  sx={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    backgroundColor: color,
                    cursor: "pointer",
                    //   border: `${color === colorName ? "3px solid black" : "none"}`,
                  }}
                  onClick={() => {
                    //   setColorName(color);
                  }}
                ></Box>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default FormikInputForLabel;
