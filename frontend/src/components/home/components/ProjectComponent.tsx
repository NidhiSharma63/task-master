import { Box, Divider, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { plusIcon } from 'src/assets/assets';
import { IProjects } from 'src/common/Interface/Interface';
import ProjectNameModal from 'src/components/Layout/components/ProjectNameModal';
import { KEY_FOR_STORING_ACTIVE_PROJECT } from 'src/constant/Misc';
import { useAppDispatch } from 'src/hook/redux/hooks';
import { isProjectNameModalOpen } from 'src/redux/boolean/booleanSlice';
import { activeProject } from 'src/redux/projects/projectSlice';
import colors from 'src/theme/variables';
import { setValueToLs } from 'src/utils/localstorage';

/**
 * interface
 */

interface IProjectComponent {
  backgroundColors: string[];
  projectData: {
    projects: IProjects[];
  };
  isLoading: boolean;
}

const ProjectComponent = ({
  backgroundColors,
  projectData,
  isLoading,
}: IProjectComponent) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClickOnAddProject = (): void => {
    dispatch(isProjectNameModalOpen(true));
  };

  const handleNavigationToProject = (name: string): void => {
    navigate('/Dashboard');
    dispatch(activeProject(name));
    setValueToLs(
      KEY_FOR_STORING_ACTIVE_PROJECT,
      JSON.stringify({ activeProject: name }),
    );
  };

  return (
    <Box
      sx={{
        width: '500px',
        borderRadius: '0.3rem',
        height: '100%',
        backgroundColor: colors.offWhite,
      }}
    >
      <Box
        sx={{
          padding: ' 0.8rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">Projects</Typography>

        <IconButton
          sx={{
            mb: 1,
            backgroundColor: colors.primaryColor,
            '&:hover': {
              backgroundColor: colors.primaryColor,
            },
          }}
          onClick={handleClickOnAddProject}
          aria-label="Add"
        >
          <img src={plusIcon} alt="Add Task" width={'15px'} />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: colors.lineColor }} />
      <Box
        sx={{
          padding: '0.4rem',
          height: 'calc(100% - 60px)',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '4px',
            height: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: `transparent`,
          },
          '&::-webkit-scrollbar-thumb': {
            background: `${colors.scrollbarColor}`,
            borderRadius: '4px',
          },
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FadeLoader />
          </Box>
        ) : projectData?.projects?.length === 0 ? (
          <Typography sx={{ textAlign: 'center' }} variant="h5">
            You don't have Project
          </Typography>
        ) : (
          projectData?.projects?.map((item, i) => {
            return (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0px 0px 4px 0px #0000001a',
                  cursor: 'pointer',
                  borderRadius: '.4rem',
                  m: 1,
                }}
                onClick={() => handleNavigationToProject(item.name)}
              >
                <Box
                  sx={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: backgroundColors?.[i],
                    borderRadius: '0.3rem',
                  }}
                >
                  <Typography sx={{ fontWeight: 500, color: 'white' }}>
                    {' '}
                    {item?.name}
                  </Typography>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
      <ProjectNameModal />
    </Box>
  );
};

export default ProjectComponent;
