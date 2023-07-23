import {
  Box,
  Typography,
  Divider,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import { projectDataInStore } from "src/redux/projects/projectSlice";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { queryClient } from "src";
import colors from "src/theme/variables";

const Headers = () => {
  const { active_project } = useSelector(projectDataInStore);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location, "Location");

  useEffect(() => {
    if (
      location.pathname === "/Dashboard" ||
      location.pathname.includes("/Dashboard/activeProject/board")
    ) {
      navigate(`/Dashboard/activeProject/board/${active_project}`);
      // queryClient.invalidateQueries("projects"); invalidate all the query
    }
  }, [active_project, location.pathname]);

  const activeLinkStyle = {
    color: "rgb(5, 5, 5)",
    border: "3px solid red",
    // Add any other styles you want to apply when the link is active
  };
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        top: "4.5rem",
      }}
    >
      <Box>
        <Typography
          variant="h5"
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
          <NavLink
            style={({ isActive }) => ({
              color: colors.primaryTextColor,
              fontWeight: isActive ? 600 : 100,
              textDecoration: "none",
              marginLeft: "1.2rem",
              borderBottom: isActive
                ? `1px solid ${colors.primaryTextColor}`
                : "",
            })}
            to={`activeProject/board/${active_project}`}
          >
            Board
          </NavLink>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default Headers;