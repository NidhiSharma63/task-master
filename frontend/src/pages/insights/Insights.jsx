import { useParams } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";
import TitleCase from "src/utils/TextTransformer";
import InsightsCharts from "src/components/insights/InsightsCharts";
import InsightsFilter from "./components/InsightsFilter";
import { useState } from "react";

const Insights = () => {
  const { status } = useParams();
  const [activeStatus, setActiveStatue] = useState("All");
  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        mt: ".2rem",
        height: "100%",
        mr: "29rem",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              ml: 3,
              mb: 2,
              color: (theme) => theme.palette.secondary.main,
            }}
          >
            Insights
          </Typography>
          <InsightsFilter
            setActiveStatue={setActiveStatue}
            activeStatus={activeStatus}
          />
        </Box>
        <Divider />
      </Box>
      <InsightsCharts status={activeStatus} />
    </Box>
  );
};

export default Insights;
