import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Box, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import UserName from 'src/common/UserName';
import {
  draggedTaskId,
  draggedTaskStatus,
  drggedTaskIndex,
} from 'src/redux/task/taskSlice';
import colors from 'src/theme/variables';

const TaskCard = ({ item, handleClickOnTask }) => {
  const [isDraggable, setIsDraggable] = useState(false);
  const dispatch = useDispatch();
  /**
   * whenever user drag the task then set the following values
   */
  const handleDragStart = useCallback(() => {
    dispatch(draggedTaskId(item._id));
    dispatch(drggedTaskIndex(item.index));
    dispatch(draggedTaskStatus(item.status));
    setIsDraggable(true);
  }, [dispatch, item._id, item.status, item.index]);

  /**
   * on drag end reset the values
   */
  const handleDragEnd = useCallback(() => {
    dispatch(draggedTaskId(null));
    dispatch(drggedTaskIndex(null));
    dispatch(draggedTaskStatus(null));
    setIsDraggable(false);
  }, [dispatch]);

  return (
    <Box
      draggable={true}
      onDragStart={handleDragStart}
      sx={{
        border: `1px solid ${colors.lightGrey}`,
        width: '100%',
        padding: 2,
        borderRadius: '0.4rem',
        // marginBottom: '1rem',
        cursor: 'grab',
        backgroundColor: isDraggable ? 'rgb(25,25,25)' : 'none',
        viewTransitionName: item._id,
      }}
      onClick={() => handleClickOnTask(item)}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'fles-start',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <Typography>{item?.task}</Typography>
        {item?.label && (
          <Typography
            sx={{
              backgroundColor: item?.labelColor,
              width: 'fit-content',
              padding: '.2rem .6rem',
              borderRadius: '1rem',
              color: 'white',
              mt: 2,
              ml: -1,
              fontSize: '.8rem',
            }}
          >
            {item?.label}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <UserName />
        {item?.subTasks?.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FormatListBulletedIcon
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontSize: '1.6rem',
              }}
            />
            <Typography sx={{ fontSize: '1.2rem' }}>
              {item?.subTasks?.length}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TaskCard;
