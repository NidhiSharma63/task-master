import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { capitalizeFirstLetter } from "src/utils/TextTransformer";
import { ClipLoader } from "react-spinners";

ChartJS.register(ArcElement, Tooltip, Legend);

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const InsightsCharts = ({ data, isLoading }) => {
  const [allProjects, setAllProjects] = useState([]);
  const [allTask, setAllTasks] = useState([]);

  const generateBackgroundColors = () => {
    const colors = [];
    for (let i = 0; i < allProjects.length; i++) {
      colors.push(generateRandomColor());
    }
    return colors;
  };

  const colors = generateBackgroundColors();

  useEffect(() => {
    let tempData = [];
    data?.data.map((item) => {
      // check if project name is already added or not
      const isAlreadyAddedProjectName = tempData.find(
        (val) => val.projectName === item.projectName
      );

      if (isAlreadyAddedProjectName) {
        isAlreadyAddedProjectName.task = isAlreadyAddedProjectName.task + 1;
      }
      if (!isAlreadyAddedProjectName) {
        tempData.push({ projectName: item.projectName, task: 1 });
      }
    });

    let allProjects = [];
    let allTaskOfEachProjects = [];

    tempData?.map((item) => {
      allProjects.push(item.projectName);
      allTaskOfEachProjects.push(item.task);
    });

    setAllProjects(allProjects);
    setAllTasks(allTaskOfEachProjects);
  }, [data]);

  console.log(data);
  const chartData = {
    labels: allProjects,
    datasets: [
      {
        label: "# Tasks",
        data: allTask,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  if (data?.data.length === 0) {
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
      }}
    >
      <Box
        sx={{
          width: "25rem",
          height: "100%",
        }}
      >
        <Doughnut data={chartData} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          padding: "2rem 3rem",
          borderRadius: ".3rem",
          backgroundColor: (theme) => theme.palette.primary.main,
          boxShadow: "0px 0px 32px -4px #00000054",
        }}
      >
        <Typography sx={{ color: "white" }} variant="h5">
          Tasks List
        </Typography>
        {allProjects.map((item, i) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: ".7rem",
                // border: "1px solid red",
                minWidth: "15rem",
                padding: "0.5rem",
                borderRadius: ".3rem",
                backgroundColor: "white",
              }}
            >
              <Box
                sx={{
                  backgroundColor: colors[i],
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
                <Typography sx={{ fontWeight: 600 }}>
                  {capitalizeFirstLetter(item)}
                </Typography>
                <Typography sx={{ fontWeight: 600 }}>{allTask[i]}</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default InsightsCharts;
