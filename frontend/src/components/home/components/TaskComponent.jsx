import { Box, Typography, Stack, Divider, Button } from "@mui/material";
import colors from "../../../theme/variables";
import { statesOfTaskManager } from "../../../constant/Misc";
import { ClipLoader } from "react-spinners";
import CreateTaskPopup from "../../../components/home/components/CreateTaskPopup";
import { activeLink } from "../../../redux/task/taskSlice";
import useTaskComponent from "../../../hook/home/useTaskComponent";

const TaskComponent = ({
  backgroundColors,
  projectData,
  taskData,
  isLoading,
}) => {
  const {
    handleClickOnAddTask,
    handleClickOnLink,
    handleClickOnTask,
    totalTask,
    getTaskToDisplay,
  } = useTaskComponent({
    backgroundColors,
    projectData,
    taskData,
  });

  const data = getTaskToDisplay();

  return (
    <Box
      sx={{
        width: "50%",
        border: "1px solid",
        borderColor: (theme) => theme.palette.grey[400],
        borderRadius: "0.3rem",
        height: "100%",
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  borderBottom:
                    activeLink === item
                      ? `1px solid  ${colors.primaryColor}`
                      : "1px solid transparent",
                  "&:hover": {
                    borderBottom: `1px solid  ${colors.primaryColor}`, // Change border on hover
                  },
                  transition: "border 0.3s ease",
                }}
                onClick={() => handleClickOnLink(item)}
              >
                <Typography>{item}</Typography>
                <Box
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    borderRadius: "50%",
                    padding: "0rem .5rem",
                    color: "white",
                  }}
                >
                  {totalTask?.[i] ? totalTask?.[i]?.count : 0}
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Box>
      <Divider />
      <Box
        sx={{
          padding: "0.4rem",
          height: "calc(100% - 100px)",
          overflowY: "auto",
        }}
      >
        {isLoading ? (
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
          data?.map((item, i) => {
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
