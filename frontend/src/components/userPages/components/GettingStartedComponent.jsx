import { Box, Button } from "@mui/material";
import PagesModal from "src/components/userPages/components/PagesModal";
import usePage from "src/hook/page/usePage";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

const GettingStartedComponent = () => {
  const { handleClick, handleChange, innerHTML, editorRef } = usePage();

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

      <ContentEditable
        html={sanitizeHtml(innerHTML)}
        className="editable-content"
        ref={editorRef}
        onChange={handleChange}
      />
      <PagesModal />
    </Box>
  );
};

export default GettingStartedComponent;
