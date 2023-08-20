import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { capitalizeFirstLetter } from "src/utils/TextTransformer";
import { ClipLoader } from "react-spinners";
import colors from "src/theme/variables";
import useInsight from "src/hook/insights/useInsight";

ChartJS.register(ArcElement, Tooltip, Legend);

const InsightsCharts = ({ status }) => {
  const { data, isLoading, chartData, allProjects, allTask, bgColors } =
    useInsight({
      status,
    });

  if (data?.data?.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mr: 5,
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {" "}
          You have no task!
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mr: 5,
          justifyContent: "center",
          height: "100%",
        }}
      >
        <ClipLoader color="#571159" />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: "100%",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          width: { xs: "18rem", md: "25rem" },
          height: { md: "100%", xs: "auto" },
        }}
      >
        <Doughnut data={chartData} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          position: "relative",
          padding: "2rem",
          borderRadius: ".3rem",
          backgroundColor: (theme) => theme.palette.primary.main,
          boxShadow: "0px 0px 32px -4px #00000054",
          height: { md: "calc(100vh - 200px)", xs: "200px" },
          // overflowY: "scroll",
          maxWidth: "40rem",
        }}
      >
        <Box
          sx={{
            // border: "1px solid red",
            position: "fixed",
            maxWidth: "40rem",
          }}
        >
          <Typography sx={{ color: "white" }} variant="h5">
            Project List
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: "100%",
            // border: "1px solid green",
            mt: 7,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "2px",
              height: "5px",
            },
            "&::-webkit-scrollbar-track": {
              background: `${colors.primaryColor}`,
            },
            "&::-webkit-scrollbar-thumb": {
              background: `${colors.secondaryTextColor}`,
              borderRadius: "4px",
            },
          }}
        >
          {allProjects?.map((item, i) => {
            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: ".7rem",
                  // border: "1px solid red",
                  minWidth: "15rem",
                  padding: "0.5rem",
                  borderRadius: ".3rem",
                  border: `1px solid ${colors.lightGrey}`,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: bgColors[i],
                    width: "2rem",
                    height: "1.7rem",
                    borderRadius: "50%",
                    boxShadow: "0px 0px 32px -4px #00000054",
                  }}
                ></Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                    padding: "0rem .4rem",
                  }}
                >
                  <Typography>{capitalizeFirstLetter(item)}</Typography>
                  <Typography>{allTask[i]}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default InsightsCharts;
