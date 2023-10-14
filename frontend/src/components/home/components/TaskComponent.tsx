import { Box, Divider, IconButton, Typography } from '@mui/material';
import { FadeLoader } from 'react-spinners';
import { plusIcon } from 'src/assets/assets';
import CreateTaskPopup from 'src/components/home/components/CreateTaskPopup';
import useTaskComponent from 'src/hook/home/useTaskComponent';
import colors from 'src/theme/variables';

/**
 * interface
 */

interface ITaskComponent {
  backgroundColors: string[];
  projectData: any;
  taskData: any;
  isLoading: boolean;
}

const TaskComponent = ({
  backgroundColors,
  projectData,
  taskData,
  isLoading,
}: ITaskComponent) => {
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
        backgroundColor: colors.offWhite,
        borderRadius: '0.3rem',
        height: '100%',
      }}
    >
      <Box sx={{ padding: ' 0.8rem', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">My Tasks</Typography>
          <IconButton
            sx={{
              mb: 1,
              backgroundColor: colors.primaryColor,
              '&:hover': {
                backgroundColor: colors.primaryColor,
              },
            }}
            onClick={handleClickOnAddTask}
            aria-label="Add"
          >
            <img src={plusIcon} alt="Add Task" width={'15px'} />
          </IconButton>
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
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: colors.scrollbarColor,
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
                    active_link === `${item.taskName}`
                      ? colors.primaryColor
                      : 'none',
                  color:
                    active_link === `${item.taskName}`
                      ? 'white'
                      : colors.textColor,
                  '&:hover': {
                    backgroundColor: colors.primaryColor, // Change border on hover
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
      <Divider sx={{ borderColor: colors.lineColor }} />
      <Box
        sx={{
          padding: '0.4rem',
          height: 'calc(100% - 120px)',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '5px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: colors.scrollbarColor,
            borderRadius: '4px',
          },
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
        ) : data?.length === 0 ? (
          <Typography sx={{ textAlign: 'center' }} variant="h5">
            You don't have Task
          </Typography>
        ) : (
          data?.map((item, i) => {
            return (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0px 0px 4px 0px #0000001a',
                  backgroundColor: 'white',
                  padding: '0.5rem',
                  borderRadius: '.4rem',
                  mb: 1,
                  cursor: 'pointer',
                  ml: 1,
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
