import { useParams } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";
import TitleCase from "src/utils/TextTransformer";
import InsightsCharts from "src/components/insights/InsightsCharts";
import useChartsQuery from "src/hook/useChartsQuery";

const Insights = () => {
  const { status } = useParams();
  const { useGetTaskQuery } = useChartsQuery(status);
  const { data } = useGetTaskQuery();

  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        mt: ".5rem",
        height: "100%",
      }}
    >
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            ml: 3,
            mb: 2,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          {TitleCase(status)}
        </Typography>
        <Divider />
      </Box>
      <InsightsCharts data={data} />
    </Box>
  );
};

export default Insights;
