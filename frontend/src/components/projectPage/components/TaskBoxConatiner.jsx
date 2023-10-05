import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React from 'react';
import { FadeLoader } from 'react-spinners';
import DropCard from 'src/components/projectPage/components/DropCard';
import TaskCard from 'src/components/projectPage/components/TaskCard';
import useAddColumn from 'src/hook/board/useAddColumn';
import useDeleteColumn from 'src/hook/board/useDeleteColumn';
import useTaskBoxContainer from 'src/hook/board/useTaskBoxContainer';
import colors from 'src/theme/variables';

const TaskBoxContainer = ({ name, data, colId, onDrop }) => {
  const {
    handleClickOnTask,
    handleInput,
    handleBlur,
    handleChange,
    handleAddTask,
    handleClickForAddingTaskFromBottom,
    handleClickOnThreeDots,
    handleCloseOfColsIcons,
    handleClickOnRename,
    setisColumnRename,
    setAnchorElForColumnIcons,
    textAreaValuesBottom,
    textAreaValuesTop,
    anchorElForColumnIcons,
    openColsIcons,
    isColumnRename,
    show_loader_for_task,
  } = useTaskBoxContainer({ data, name });

  const { columnValue, handlecolumnValue, handleColsSubmit } = useAddColumn({
    setIsAddColBtnClicked: setisColumnRename,
    isColumnRename,
    colId,
    prevColumnName: name,
  });

  const { deleteColumn } = useDeleteColumn({
    colId,
    setAnchorElForColumnIcons,
  });

  return (
    <Box sx={{ height: '100%', minWidth: '260px' }}>
      <Box
        sx={{
          padding: '0 .7rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {isColumnRename ? (
          <textarea
            value={columnValue}
            className="textarea-col"
            onChange={handlecolumnValue}
          ></textarea>
        ) : (
          <Typography sx={{ fontWeight: 600 }} variant="subtitle1">
            {name}
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isColumnRename ? (
            <Button
              onClick={handleColsSubmit}
              variant="contained"
              sx={{ ml: 1 }}
            >
              Add
            </Button>
          ) : (
            <>
              <IconButton
                disabled={show_loader_for_task}
                onClick={handleAddTask}
              >
                {' '}
                <AddIcon
                  sx={{
                    cursor: 'pointer',
                    color: colors.secondaryTextColor,
                  }}
                />
              </IconButton>
              <MoreVertIcon
                sx={{ cursor: 'pointer', color: colors.secondaryTextColor }}
                onClick={handleClickOnThreeDots}
              />
            </>
          )}
          <Menu
            id="logout"
            anchorEl={anchorElForColumnIcons}
            open={openColsIcons}
            onClose={handleCloseOfColsIcons}
          >
            <MenuItem
              sx={{
                color: colors.secondaryTextColor,
              }}
              onClick={handleClickOnRename}
            >
              <DriveFileRenameOutlineIcon />
            </MenuItem>
            <MenuItem
              sx={{
                color: colors.secondaryTextColor,
              }}
              onClick={deleteColumn}
            >
              <DeleteIcon />
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box
        key={name}
        sx={{
          width: '100%',
          mt: 1,
          height: 'calc(100% - 30px)',
          borderRadius: '.6rem',
          boxShadow: '0px 0px 4px 1px #00000014',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          overflowY: 'auto',
          p: '0 .7rem .7rem .7rem',
        }}
        className="box"
      >
        {textAreaValuesTop?.map((value, index) => (
          <>
            <textarea
              key={index}
              value={value}
              data-id={name}
              onChange={(event) =>
                handleChange(event, index, event.target.value)
              }
              onBlur={(event) => handleBlur(event, index)}
              onInput={handleInput}
              className="textArea"
            />
            {show_loader_for_task && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  mt: -1,
                }}
              >
                <FadeLoader sx={{ mt: -2 }} />
              </Box>
            )}
          </>
        ))}
        {/* {console.log(data.column, 'Data.column', data)} */}
        <DropCard onDrop={() => onDrop(data.name, 0)} index={0} />
        {data.tasks?.map((item, i) => {
          return (
            <React.Fragment key={item._id}>
              <TaskCard item={item} handleClickOnTask={handleClickOnTask} />
              <DropCard onDrop={() => onDrop(item.status, i + 1)} />
            </React.Fragment>
          );
        })}
        {/* {provided.placeholder} */}
        {textAreaValuesBottom?.map((value, index) => (
          <>
            <textarea
              key={index}
              value={value}
              data-id={name}
              onChange={(event) =>
                handleChange(event, index, event.target.value)
              }
              onBlur={(event) => handleBlur(event, index)}
              onInput={handleInput}
              className="textArea"
            />
            {show_loader_for_task && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  mt: -1,
                }}
              >
                <FadeLoader sx={{ mt: -2 }} />
              </Box>
            )}
          </>
        ))}
        {data?.length > 0 ? (
          <Button
            variant="contained"
            disabled={show_loader_for_task}
            onClick={handleClickForAddingTaskFromBottom}
          >
            Add Task
          </Button>
        ) : null}
      </Box>
    </Box>
  );
};
export default TaskBoxContainer;
