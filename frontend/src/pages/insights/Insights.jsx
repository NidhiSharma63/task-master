import { useParams } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";
import TitleCase from "src/utils/TextTransformer";

const Insights = () => {
  const { status } = useParams();
  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        mt: ".5rem",
      }}
    >
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            ml: 3,
            mb: 2,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          {TitleCase(status)}
        </Typography>
        <Divider />
      </Box>
    </Box>
  );
};

export default Insights;
