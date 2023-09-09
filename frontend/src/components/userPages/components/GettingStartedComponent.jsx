import { Box, Button, Typography } from "@mui/material";
import { useRef, useState } from "react";
import PagesModal from "src/components/userPages/components/PagesModal";

const GettingStartedComponent = () => {
  const editorRef = useRef();
  const [content, setContent] = useState();

  const handleContentChange = () => {
    setContent(editorRef.current);
  };

  const handleClick = () => {};

  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "300px",
        maxWidth: "80%",
        margin: "auto",
        marginTop: "1rem",
      }}>
      <Button
        variant="contained"
        sx={{ position: "fixed", right: "1rem", color: "white", fontSize: ".7rem" }}
        onClick={handleClick}>
        Save
      </Button>
      <Box
        onInput={handleContentChange}
        ref={editorRef}
        onFocus={() => {
          console.log("focus");
        }}>
        <Typography contentEditable="true" variant="h1" sx={{ outline: "none" }}>
          Untitled
        </Typography>
        <Box contentEditable="true" sx={{ outline: "none", marginTop: 3, fontSize: "1.3rem" }}>
          Start typing
        </Box>
      </Box>
      <PagesModal />
    </Box>
  );
};

export default GettingStartedComponent;
