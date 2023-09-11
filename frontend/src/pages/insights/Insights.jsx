import { Box, Divider, Typography } from "@mui/material";
import InsightsCharts from "src/components/insights/InsightsCharts";
import InsightsFilter from "./components/InsightsFilter";
import { useState } from "react";
import InsightsLogo from "src/assets/icons/Insights.png";

const Insights = () => {
  const [activeStatus, setActiveStatue] = useState("All");
  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        mt: ".2rem",
        height: "100%",
        mr: "29rem",
      }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Box sx={{ display: "flex", alignItems: "center", ml: 2, gap: 1 }}>
            <img src={InsightsLogo} alt="logo" style={{ width: "50px" }} />
            <Typography
              variant="h5"
              sx={{
                color: (theme) => theme.palette.secondary.main,
                fontWeight: "bold",
              }}>
              Insights
            </Typography>
          </Box>
          <InsightsFilter setActiveStatue={setActiveStatue} activeStatus={activeStatus} />
        </Box>
        <Divider />
      </Box>
      <InsightsCharts status={activeStatus} />
    </Box>
  );
};

export default Insights;
