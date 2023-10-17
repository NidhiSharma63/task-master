import { Box, Button, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import CommonLoader from 'src/common/loader/CommonLoader';
import ProjectNameModal from 'src/components/Layout/components/ProjectNameModal';
import Headers from 'src/components/projectPage/components/Headers';
import { useAppDispatch } from 'src/hook/redux/hooks';
import { useGetProjectQuery } from 'src/hook/useProjectQuery';
import { isProjectNameModalOpen } from 'src/redux/boolean/booleanSlice';

const ProjectPage = () => {
  const { data, isLoading } = useGetProjectQuery();
  const dispatch = useAppDispatch();

  const handleOpenProjectModal = () => {
    dispatch(isProjectNameModalOpen(true));
  };

  if (isLoading) {
    return <CommonLoader value={'Loading...'} />;
  }

  return (
    <Box>
      {data?.projects?.length > 0 ? (
        <Headers />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // border: "1px solid red",
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '1rem',
            mb: 4,
            mr: 8,
          }}
        >
          <Typography variant="h5">
            You have no project. <br />
            Create projects to manage your tasks
          </Typography>
          <Button variant="contained" onClick={handleOpenProjectModal}>
            Add Project
          </Button>
        </Box>
      )}
      <Outlet />
      <ProjectNameModal />
    </Box>
  );
};

export default ProjectPage;
