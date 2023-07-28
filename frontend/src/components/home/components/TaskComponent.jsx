import { Box, Typography, Stack, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import colors from "src/theme/variables";
import useChartsQuery from "src/hook/useChartsQuery";
import { statesOfTaskManager } from "src/constant/Misc";
import { ClipLoader } from "react-spinners";

const TaskComponent = ({ backgroundColors }) => {
  const [activeLink, setActiveLink] = useState(null);
  const [allTask, setAllTask] = useState([]);

  const handleClick = (name) => {
    setActiveLink(name);
  };

  const { useGetTaskQuery } = useChartsQuery(activeLink ?? "Todo");
  const {
    data: allTaskProjectWideAccordingToStatus,
    isLoading: isTaskLoading,
  } = useGetTaskQuery();

  // adding colors property as well
  useEffect(() => {
    const tempData = [];
    let index = 0;
    allTaskProjectWideAccordingToStatus?.data?.forEach((task, i) => {
      const isAlreadyAddedProjectName = tempData.find(
        (val) => val.projectName === task.projectName
      );
      if (isAlreadyAddedProjectName) {
        isAlreadyAddedProjectName.task = isAlreadyAddedProjectName.task + 1;
        tempData.push({ ...task, color: isAlreadyAddedProjectName.color });
      } else {
        tempData.push({ ...task, color: backgroundColors[index] });
        index += 1;
      }
    });

    setAllTask(tempData);
  }, [allTaskProjectWideAccordingToStatus]);

  return (
    <Box
      sx={{
        width: "50%",
        border: "1px solid",
        borderColor: (theme) => theme.palette.grey[400],
        borderRadius: "0.3rem",
      }}
    >
      <Box sx={{ padding: " 0.8rem" }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          My Tasks
        </Typography>
        <Stack direction="row" spacing={2} mt={1}>
          {statesOfTaskManager?.map((item, i) => {
            return (
              <Box
                key={i}
                sx={{
                  cursor: "pointer",
                  fontWeight: 500,

                  borderBottom:
                    activeLink === item
                      ? `1px solid  ${colors.primaryColor}`
                      : "1px solid transparent",
                  "&:hover": {
                    borderBottom: `1px solid  ${colors.primaryColor}`, // Change border on hover
                  },
                  transition: "border 0.3s ease",
                }}
                onClick={() => handleClick(item)}
              >
                {item}
              </Box>
            );
          })}
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ padding: "0.4rem" }}>
        {isTaskLoading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ClipLoader color="#571159" />
          </Box>
        ) : (
          allTask?.map((item, i) => {
            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid",
                  borderColor: (theme) => theme.palette.grey[400],
                  padding: "0.5rem",
                  borderRadius: ".4rem",
                  mb: 1,
                  cursor: "pointer",
                }}
              >
                <Typography>{item.task}</Typography>
                <Box
                  sx={{
                    padding: "0 .8rem",
                    backgroundColor: item.color,
                    borderRadius: "0.3rem",
                    color: "white",
                  }}
                >
                  {item.projectName}
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default TaskComponent;
