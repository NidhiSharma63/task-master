import { Box, Button, Divider, Typography } from '@mui/material';
import { FadeLoader } from 'react-spinners';
import CreateTaskPopup from 'src/components/home/components/CreateTaskPopup';
import useTaskComponent from 'src/hook/home/useTaskComponent';
import colors from 'src/theme/variables';

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
    active_link,
  } = useTaskComponent({
    backgroundColors,
    projectData,
    taskData,
  });

  const data = getTaskToDisplay();

  return (
    <Box
      sx={{
        width: '500px',
        border: '1px solid',
        borderColor: (theme) => theme.palette.grey[400],
        borderRadius: '0.3rem',
        height: '100%',
      }}
    >
      <Box sx={{ padding: ' 0.8rem', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            My Tasks
          </Typography>
          <Button
            variant="contained"
            sx={{
              mb: 1,
              display: 'flex',
            }}
            onClick={handleClickOnAddTask}
          >
            Add Task
          </Button>
        </Box>
        <Box
          mt={1}
          sx={{
            display: 'flex',
            overflowX: 'scroll',
            width: '100%',
            '&::-webkit-scrollbar': {
              width: '2px',
              height: '5px',
            },
            '&::-webkit-scrollbar-track': {
              background: `${colors.primaryColor}`,
            },
            '&::-webkit-scrollbar-thumb': {
              background: `${colors.secondaryTextColor}`,
              borderRadius: '4px',
            },
          }}
        >
          {totalTask?.map((item, i) => {
            return (
              <Box
                key={i}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: 1,
                  mb: 1,
                  backgroundColor:
                    active_link === item ? colors.mainColor : 'none',
                  '&:hover': {
                    backgroundColor: colors.mainColor, // Change border on hover
                  },
                  transition: '0.3s ease',
                  ml: i === 0 ? '0rem' : '2rem',
                  padding: '.2rem .4rem',
                  borderRadius: '.3rem',
                }}
                onClick={() => handleClickOnLink(item.taskName)}
              >
                <Typography sx={{ width: 'max-content' }}>
                  {item.taskName}
                </Typography>
                <Box
                  sx={{
                    borderRadius: '50%',
                    padding: '0rem .5rem',
                    color: 'white',
                    background: colors.bannerColor,
                  }}
                >
                  {item?.count ?? 0}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          padding: '0.4rem',
          height: 'calc(100% - 120px)',
          overflowY: 'scroll',
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FadeLoader />
          </Box>
        ) : (
          data?.map((item, i) => {
            return (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.grey[400],
                  padding: '0.5rem',
                  borderRadius: '.4rem',
                  mb: 1,
                  cursor: 'pointer',
                }}
                onClick={() => handleClickOnTask(item)}
              >
                <Typography>{item.task}</Typography>
                <Box
                  sx={{
                    padding: '0 .8rem',
                    backgroundColor: item.color,
                    borderRadius: '0.3rem',
                    color: 'white',
                  }}
                >
                  {item.projectName}
                </Box>
              </Box>
            );
          })
        )}
      </Box>
      <CreateTaskPopup status={active_link} projectData={projectData} />
    </Box>
  );
};

export default TaskComponent;
