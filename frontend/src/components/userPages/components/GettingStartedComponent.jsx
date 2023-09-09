import { Box, Button, Typography } from "@mui/material";
import { useRef } from "react";
import PagesModal from "src/components/userPages/components/PagesModal";
import usePage from "src/hook/page/usePage";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

const GettingStartedComponent = () => {
  // const editorRef = useRef();
  // const handleContentChange = () => {
  //   setContent(editorRef.current);
  // };

  // const [content, setContent] = useState();

  const { handleClick, handleContentChange, innerHTML, content, editorRef } = usePage();

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

      <ContentEditable html={sanitizeHtml(innerHTML)} className="editable-content" ref={editorRef} />
      <PagesModal />
    </Box>
  );
};

export default GettingStartedComponent;
