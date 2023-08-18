import { useParams } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";
import TitleCase from "../../utils/TextTransformer";
import InsightsCharts from "../../components/insights/InsightsCharts";
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
              fontWeight: 600,
              ml: 3,
              mb: 2,
              color: (theme) => theme.palette.primary.main,
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
