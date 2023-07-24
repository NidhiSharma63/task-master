import { Box, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
const TaskBoxContainer = ({ name }) => {
  const [textAreaValues, setTextAreaValues] = useState([]);

  const handleAddTask = () => {
    setTextAreaValues((prevValues) => [...prevValues, ""]);
  };

  const handleChange = (event, index, newValue) => {
    // console.log(event.target.dataset);
    setTextAreaValues((prevValues) => {
      const copyValues = [...prevValues];
      copyValues[index] = newValue;
      return copyValues;
    });
  };

  const handleBlur = () => {
    console.log(textAreaValues);
  };

  /**
   * for managing style of textarea
   */
  const handleInput = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <Grid item xs={2.8} sx={{ height: "100%" }}>
      <Box
        sx={{
          padding: "0 .7rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontWeight: 600 }} variant="subtitle1">
          {name}
        </Typography>
        <AddIcon
          onClick={handleAddTask}
          sx={{
            cursor: "pointer",
            color: (theme) => theme.palette.primary.main,
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: 1,
          height: "calc(100% - 30px)",
          borderRadius: ".6rem",
          boxShadow: "0px 0px 4px 1px #00000014",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
          overflowY: "auto",
          p: 1,
        }}
      >
        {textAreaValues.map((value, index) => (
          <textarea
            key={index}
            value={value}
            data-id={name}
            onChange={(event) => handleChange(event, index, event.target.value)}
            onBlur={handleBlur}
            onInput={handleInput}
            className="textArea"
          />
        ))}
      </Box>
    </Grid>
  );
};
export default TaskBoxContainer;
