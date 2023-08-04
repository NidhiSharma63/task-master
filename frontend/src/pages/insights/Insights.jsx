import { useParams } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";
import TitleCase from "../../utils/TextTransformer";
import InsightsCharts from "../../components/insights/InsightsCharts";
import useAllTaskAccordingToSatusQuery from "../../hook/useAllTaskAccordingToSatusQuery";

const Insights = () => {
  const { status } = useParams();
  const { useGetTaskQuery } = useAllTaskAccordingToSatusQuery(status);
  const { data, isLoading } = useGetTaskQuery();

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
      <InsightsCharts data={data} isLoading={isLoading} status={status} />
    </Box>
  );
};

export default Insights;
