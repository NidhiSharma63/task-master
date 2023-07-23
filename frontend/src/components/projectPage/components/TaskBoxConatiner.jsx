import { Box, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef, useState } from "react";

const TaskBoxConatiner = ({ name }) => {
  const textAreaRef = useRef();
  const [activeBox, setActiveBox] = useState("");

  const currentBoxRef = useRef(null);
  const todoRef = useRef(null);
  const progressRef = useRef(null);
  const priorityRef = useRef(null);
  const doneRef = useRef(null);

  function autoResize() {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set the height to the scroll height
  }

  useEffect(() => {
    console.log(currentBoxRef.current);
    if (currentBoxRef.current) {
      currentBoxRef.current.innerHTML += `
         <div>
            <textarea
            name=""
            id=""
            onInput=${autoResize}
            cols="34"
            ref=${textAreaRef}
            
            className="textarea-for-adding-task"
            ></textarea>
        </div>
      `;
    }
  }, [activeBox]);

  const handleClick = (name) => {
    setActiveBox(name);
    if (name === "Todo") {
      todoRef.current.innerHTML += `
         <div>
            <textarea
            onInput=${autoResize}
            cols="34"
            ref=${textAreaRef}
            
            className="textarea-for-adding-task"
            ></textarea>
        </div>
      `;
    }
    if (name === "In progress") {
      progressRef.current.innerHTML += `
      <div>
         <textarea
         onInput=${autoResize}
         cols="34"
         ref=${textAreaRef}
         
         className="textarea-for-adding-task"
         ></textarea>
     </div>
   `;
    }
    if (name === "In priority") {
      priorityRef.current.innerHTML += `
      <div>
         <textarea
         onInput=${autoResize}
         cols="34"
         ref=${textAreaRef}
         
         className="textarea-for-adding-task"
         ></textarea>
     </div>
   `;
    }
    if (name === "Done") {
      doneRef.current.innerHTML += `
      <div>
         <textarea
         onInput=${autoResize}
         cols="34"
         ref=${textAreaRef}
         
         className="textarea-for-adding-task"
         ></textarea>
     </div>
   `;
    }
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
        ref={
          name === "Todo"
            ? todoRef
            : name === "In progress"
            ? progressRef
            : name === "In priority"
            ? priorityRef
            : doneRef
        }
      >
        {/* <textarea
          name=""
          id=""
          onInput={autoResize}
          cols="34"
          ref={textAreaRef}
          onFocus={() => {
            setActiveBox(name);
          }}
          className="textarea-for-adding-task"
        ></textarea> */}
      </Box>
    </Grid>
  );
};

export default TaskBoxConatiner;
