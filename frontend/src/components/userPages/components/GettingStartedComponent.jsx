import { Box, Button, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import PagesModal from "src/components/userPages/components/PagesModal";
import usePage from "src/hook/page/usePage";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { ACTIONS_FOR_EDITABLE_CONTENT } from "src/constant/Misc";

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
      <Accordion
        sx={
          {
            // display: "flex",
            // flexDirection: "row",
            // width: `${isAccordianOpen ? "30rem" : "5rem"}`,
            // background: colors.primaryColor,
            // border: `1px solid ${colors.secondaryTextColor}`,
            // borderRadius: ".3rem",
          }
        }>
        <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon />} onClick={() => {}}>
          <Box
            sx={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              backgroundColor: "ornage",
              cursor: "pointer",
            }}></Box>
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
            console.log(item, ":::item:::");
            return (
              <Button
                key={item.value}
                arg={item.value}
                name={item.value === "h1" || item === "h2" || item === "h3" ? "heading" : ""}
                onMouseDown={(evt) => {
                  evt.preventDefault(); // Avoids loosing focus from the editable area
                  document.execCommand(item.key, false, item.value); // Send the command to the browser
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

export default GettingStartedComponent;
