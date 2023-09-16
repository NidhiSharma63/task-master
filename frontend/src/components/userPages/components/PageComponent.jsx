import { Box, Button, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import PagesModal from "src/components/userPages/components/PagesModal";
import usePage from "src/hook/page/usePage";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import { ACTIONS_FOR_EDITABLE_CONTENT } from "src/constant/Misc";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const PageComponent = () => {
  const { handleClick, handleChange, openAccordianOnClick, handleListCreation, innerHTML, editorRef, isAccordianOpen } =
    usePage();

  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "300px",
        maxWidth: "80%",
        width: "800px",
        margin: "auto",
        marginTop: "1rem",
        height: "100%",
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
      <Accordion
        sx={{
          display: "flex",
          flexDirection: "row",
          maxWidth: `${isAccordianOpen ? "45rem" : "3.3rem"}`,
          borderRadius: `${isAccordianOpen ? ".3rem" : "50%"}`,
          position: "fixed",
          bottom: 0,
          // left: "50%",
          border: "none",
          marginBottom: 2,
          "&::before": {
            backgroundColor: "transparent",
          },
        }}>
        <AccordionSummary onClick={openAccordianOnClick}>
          <AddOutlinedIcon sx={{ cursor: "pointer" }} />
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "row", // Display children horizontally
            justifyContent: "flex-start", // Align children to the start
            gap: "8px",
            alignItems: "center",
            mt: 1.5,
          }}>
          {ACTIONS_FOR_EDITABLE_CONTENT.map((item) => {
            return (
              <Button
                key={item.value}
                arg={item.value}
                name={item.value === "h1" || item === "h2" || item === "h3" ? "heading" : ""}
                onMouseDown={(evt) => {
                  evt.preventDefault(); // Avoids loosing focus from the editable area
                  if (item.value === "ul") {
                    handleListCreation("ul");
                  } else if (item.value === "ol") {
                    handleListCreation("ol");
                  } else {
                    document.execCommand(item.key, false, item.value); // Send the command to the browser
                  }
                }}>
                {item.value}
              </Button>
            );
          })}
        </AccordionDetails>
      </Accordion>
      <PagesModal />
    </Box>
  );
};

export default PageComponent;
