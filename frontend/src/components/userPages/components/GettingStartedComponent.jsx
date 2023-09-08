import { Box, Typography } from "@mui/material";
import { useRef } from "react";

const GettingStartedComponent = () => {
  const editorRef = useRef();

  const handleContentChange = (event) => {
    console.log(editorRef.current);
  };
  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "300px",
        maxWidth: "80%",
        margin: "auto",
        marginTop: "1rem",
      }}>
      <Box onInput={handleContentChange} ref={editorRef}>
        <Typography contentEditable="true" variant="h1" sx={{ outline: "none" }}>
          Untitled
        </Typography>
        <Box contentEditable="true" sx={{ outline: "none", marginTop: 3, fontSize: "1.3rem" }}>
          Start typing
        </Box>
      </Box>
    </Box>
  );
};

export default GettingStartedComponent;
