import {
  Box,
  Typography,
  Divider,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import { projectDataInStore } from "src/redux/projects/projectSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Headers = () => {
  const { active_project } = useSelector(projectDataInStore);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location, "Location");

  useEffect(() => {
    if (
      location.pathname === "/Dashboard" ||
      location.pathname.includes("/Dashboard/activeProject/board")
    ) {
      navigate(`/Dashboard/activeProject/board/${active_project}`);
    }
  }, [active_project, location.pathname]);

  return (
    <Box>
      <Box>
        <Typography
          variant="h4"
          sx={{
            textTransform: "capitalize",
            fontWeight: "600",
            pl: 2,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          {active_project}
        </Typography>
        <Box>
          <Link to={`activeProject/board/${active_project}`}>Board</Link>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default Headers;
