import { Box, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";

const TaskBoxConatiner = ({ name }) => {
  const textAreaRef = useRef();

  const refMap = {
    Todo: useRef(null),
    "In progress": useRef(null),
    "In priority": useRef(null),
    Done: useRef(null),
  };

  function autoResize() {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set the height to the scroll height
  }

  const handleChange = () => {
    console.log("first");
  };

  const handleClick = (name) => {
    if (refMap[name].current) {
      const iconString = ReactDOMServer.renderToString(<AddIcon />);
      refMap[name].current.insertAdjacentHTML(
        "afterbegin",
        `<div>
        <textarea
          id="${name}"
          onChange = {handleChange}
          cols="34"
          class="textarea-for-adding-task"
        ></textarea>
        ${iconString}
      </div>`
      );
      const textArea = document.getElementById(name);
      textArea.addEventListener("input", () => {
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight}px`;
      });
    }
  };

  //  onInput={${autoResize}} // ref={${textAreaRef}}
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
        <Typography sx={{ fontWeight: 600 }} variant="subtitle">
          {" "}
          {name}
        </Typography>
        <AddIcon
          onClick={() => handleClick(name)}
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
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
        className="box"
        ref={refMap[name]}
      ></Box>
    </Grid>
  );
};

export default TaskBoxConatiner;
