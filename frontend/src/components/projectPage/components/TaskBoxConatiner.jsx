import { Box, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import {
  useAddTaskQuery,
  useGetTaskAccordingToStatus,
} from "src/hook/useTaskQuery";
import colors from "src/theme/variables";

const TaskBoxContainer = ({ name, data }) => {
  const [textAreaValues, setTextAreaValues] = useState([]);
  const { isLoading } = useGetTaskAccordingToStatus();

  const { mutate } = useAddTaskQuery();
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

  const handleBlur = (event, index) => {
    if (textAreaValues[index].trim().length === 0) {
      setTextAreaValues((prevValues) => {
        const copyValues = [...prevValues];
        copyValues.splice(index, 1);
        return copyValues;
      });
      return;
    }
    const payloadForTask = {
      task: textAreaValues[index].trim(),
      status: name,
    };
    mutate(payloadForTask);
    // Remove the textarea from the state after successful mutation
    setTimeout(() => {
      setTextAreaValues((prevValues) => {
        const copyValues = [...prevValues];
        copyValues.splice(index, 1);
        return copyValues;
      });
    }, 1000);
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
        className="box"
      >
        {textAreaValues?.map((value, index) => (
          <textarea
            key={index}
            value={value}
            data-id={name}
            onChange={(event) => handleChange(event, index, event.target.value)}
            onBlur={(event) => handleBlur(event, index)}
            onInput={handleInput}
            className="textArea"
          />
        ))}

        {data?.map((item) => {
          return (
            <Box
              sx={{
                border: `1px solid ${colors.lightGrey}`,
                width: "100%",
                padding: 2,
                backgroundColor: "rgba(255, 255, 255, 0.64)",
                borderRadius: "0.4rem",
                marginBottom: "1rem",
                cursor: "pointer",
              }}
            >
              <Typography>{item.task}</Typography>
            </Box>
          );
        })}
      </Box>
    </Grid>
  );
};
export default TaskBoxContainer;
