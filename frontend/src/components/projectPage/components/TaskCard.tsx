import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Box, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IForTaskDisplaying, ITaskItem } from 'src/common/Interface/Interface';
import UserName from 'src/common/UserName';
import {
  draggedTaskId,
  draggedTaskStatus,
  drggedTaskIndex,
} from 'src/redux/task/taskSlice';
import colors from 'src/theme/variables';

interface ITaskCard {
  item: IForTaskDisplaying;
  handleClickOnTask: (item: ITaskItem) => void;
}

const TaskCard = ({ item, handleClickOnTask }: ITaskCard) => {
  // console.log(item, 'items');
  const [isDraggable, setIsDraggable] = useState(false);
  const dispatch = useDispatch();
  /**
   * whenever user drag the task then set the following values
   */
  const handleDragStart = useCallback((): void => {
    dispatch(draggedTaskId(item._id));
    dispatch(drggedTaskIndex(item.index));
    dispatch(draggedTaskStatus(item.status));
    setIsDraggable(true);
  }, [dispatch, item._id, item.status, item.index]);

  /**
   * on drag end reset the values
   */
  const handleDragEnd = useCallback((): void => {
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
        border: `1px solid ${colors.lineColor}`,
        width: '100%',
        padding: 2,
        borderRadius: '0.4rem',
        cursor: 'grab',
        backgroundColor: isDraggable ? colors.offWhite : 'white',
        viewTransitionName: item._id,
        boxShadow: '0px 0px 1px 0px #0000001e',
      }}
      onClick={() => handleClickOnTask(item)}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          alignItems: 'baseline',
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {item?.task}
        </Typography>
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
              ml: 1,
            }}
          >
            <FormatListBulletedIcon
              sx={{
                color: colors.textColor,
                fontSize: '1.2rem',
              }}
            />
            <Typography sx={{ fontSize: '1rem' }}>
              {item?.subTasks?.length}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TaskCard;
