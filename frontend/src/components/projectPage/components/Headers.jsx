import { Box, Divider, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import projectImage from 'src/assets/icons/Project.png';
import { projectDataInStore } from 'src/redux/projects/projectSlice';
import colors from 'src/theme/variables';

const Headers = () => {
  const { active_project } = useSelector(projectDataInStore);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === '/Dashboard' ||
      location.pathname.includes('/Dashboard/activeProject/board')
    ) {
      navigate(`/Dashboard/activeProject/board/${active_project}`);
      // queryClient.invalidateQueries("projects"); invalidate all the query
    }
  }, [active_project, location.pathname]);

  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100%',
        top: '4.5rem',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <img src={projectImage} alt="project" style={{ width: '40px' }} />
          <Typography
            variant="h5"
            sx={{
              textTransform: 'capitalize',
              pl: 2,
              color: colors.textColor,
              fontWeight: 'bold',
            }}
          >
            {active_project}
          </Typography>
        </Box>
        <Box sx={{ ml: 6.5 }}>
          <NavLink
            style={({ isActive }) => ({
              color: colors.textColor,
              fontWeight: isActive ? 600 : 100,
              textDecoration: 'none',
              marginLeft: '1.2rem',
              borderBottom: isActive ? `1px solid ${colors.textColor}` : '',
            })}
            to={`activeProject/board/${active_project}`}
          >
            Board
          </NavLink>
        </Box>
      </Box>
      <Divider sx={{ borderColor: colors.lineColor }} />
    </Box>
  );
};

export default Headers;
