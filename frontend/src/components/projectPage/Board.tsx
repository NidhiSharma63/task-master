import { Box, Button } from '@mui/material';
import { FadeLoader } from 'react-spinners';
import BoardDrawer from 'src/components/projectPage/components/BoardDrawer';
import useAddColumn from 'src/hook/board/useAddColumn';
import useBoard from 'src/hook/board/useBoard';
import colors from 'src/theme/variables';
import TaskBoxConatiner from './components/TaskBoxConatiner';

const Board = () => {
  const {
    finalState,
    isAddColBtnClicked,
    handleClickOnAddColsBtn,
    setIsAddColBtnClicked,
    onDrop,
    isLoading,
  } = useBoard();

  const { columnValue, handlecolumnValue, handleColsSubmit } = useAddColumn({
    isAddColBtnClicked,
    setIsAddColBtnClicked,
  });

  return (
    <Box
      sx={{
        position: 'relative',
        height: 'calc(100vh - 150px)',
        // height: '100vh',
        overflowY: 'hidden',
        marginTop: 7.2,
        pl: 3,
        pt: 1,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: colors.offWhite,
        gap: 2,
      }}
    >
      {finalState?.map((item: any) => {
        return (
          <TaskBoxConatiner
            key={item._id}
            colId={item._id}
            name={item.name}
            data={item}
            onDrop={onDrop}
          />
        );
      })}
      <BoardDrawer />
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <FadeLoader color="#3E3A3A" />
        </Box>
      ) : (
        <Box sx={{ height: '100%', minWidth: '250px' }}>
          {isAddColBtnClicked ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <textarea
                value={columnValue}
                className="textarea-column"
                onChange={handlecolumnValue}
              ></textarea>
              <Button
                onClick={handleColsSubmit}
                variant="contained"
                sx={{ ml: 1 }}
              >
                Add
              </Button>
            </Box>
          ) : (
            <Button
              // variant="contained"
              onClick={handleClickOnAddColsBtn}
              variant="contained"
              sx={{
                ml: 1,
              }}
            >
              Add Section
            </Button>
          )}

          <Box
            sx={{
              // border: "1px solid red",
              width: '100%',
              mt: 1,
              height: 'calc(100% - 30px)',
              borderRadius: '.6rem',
              // boxShadow: '0px 0px 4px 1px #00000014',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              overflowY: 'auto',
              p: 1,
              border: `1px solid transparent`,
              transition: 'border .3s ease',

              '&:hover': {
                border: `1px solid ${colors.lineColor}`,
              },
            }}
          ></Box>
        </Box>
      )}
    </Box>
  );
};

export default Board;
