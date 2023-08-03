import { Box, Typography, Stack, Divider, Button } from "@mui/material";
import { useEffect, useState } from "react";
import colors from "theme/variables";
import useChartsQuery from "hook/useChartsQuery";
import { statesOfTaskManager } from "constant/Misc";
import { ClipLoader } from "react-spinners";
import CreateTaskPopup from "components/home/components/CreateTaskPopup";
import { useDispatch } from "react-redux";
import { isCreateTaskModalOpen } from "redux/boolean/booleanSlice";
import { activeTask } from "redux/task/taskSlice";

const TaskComponent = ({ backgroundColors, projectData }) => {
  const [activeLink, setActiveLink] = useState(null);
  const [allTask, setAllTask] = useState([]);
  const dispatch = useDispatch();

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
    if (!activeLink) {
      setActiveLink("Todo");
    }
  }, [allTaskProjectWideAccordingToStatus, backgroundColors]);

  const handleClickOnAddTask = () => {
    dispatch(isCreateTaskModalOpen(true));
  };

  const handleClickOnTask = (item) => {
    dispatch(activeTask(item));
    dispatch(isCreateTaskModalOpen(true));
  };

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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            My Tasks
          </Typography>
          <Button
            variant="contained"
            sx={{ mb: 1, display: "flex" }}
            onClick={handleClickOnAddTask}
          >
            Add Task
          </Button>
        </Box>
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
                onClick={() => handleClickOnTask(item)}
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
      <CreateTaskPopup status={activeLink} projectData={projectData} />
    </Box>
  );
};

export default TaskComponent;
