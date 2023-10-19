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
import { IUpdatedColumnItem } from 'src/common/Interface/Interface';
import DropCard from 'src/components/projectPage/components/DropCard';
import TaskCard from 'src/components/projectPage/components/TaskCard';
import useAddColumn from 'src/hook/board/useAddColumn';
import useDeleteColumn from 'src/hook/board/useDeleteColumn';
import useTaskBoxContainer from 'src/hook/board/useTaskBoxContainer';
import colors from 'src/theme/variables';
/**
 * interface
 */

interface ITaskBoxContainer {
  name: string;
  colId: string;
  onDrop: (id: string, i: number) => void;
  data: IUpdatedColumnItem;
}

const TaskBoxContainer = ({ name, data, colId, onDrop }: ITaskBoxContainer) => {
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
                  }}
                />
              </IconButton>
              <MoreVertIcon
                sx={{ cursor: 'pointer' }}
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
            <MenuItem onClick={handleClickOnRename}>
              <DriveFileRenameOutlineIcon />
            </MenuItem>
            <MenuItem onClick={deleteColumn}>
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
          height: 'calc(100% - 40px)',

          borderRadius: '.6rem',
          // boxShadow: '0px 0px 4px 1px #00000014',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          overflowY: 'auto',
          p: '0 .7rem .7rem .7rem',
          border:
            data.tasks?.length > 0
              ? `1px solid transparent`
              : `1px solid ${colors.lineColor}`,
          transition: 'border .3s ease',
          '&:hover': {
            border: `1px solid ${colors.lineColor}`,
          },
        }}
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
              onBlur={(event: React.FocusEvent<HTMLTextAreaElement, Element>) =>
                handleBlur(event, index)
              }
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
                <FadeLoader style={{ marginTop: '1.6rem' }} />
              </Box>
            )}
          </>
        ))}
        {/* {console.log(data.column, 'Data.column', data)} */}
        <DropCard onDrop={() => onDrop(data.name, 0)} />
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
                <FadeLoader style={{ marginTop: '1.6rem' }} />
              </Box>
            )}
          </>
        ))}
        {data.tasks?.length > 0 ? (
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
