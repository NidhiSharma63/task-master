import { Box } from '@mui/material';
import PagesModal from 'src/components/userPages/components/PagesModal';
import Editor from './Editor';

const PageComponent = () => {
  return (
    <Box
      sx={{
        width: 'calc(100vw - 400px)',
        marginLeft: '1rem',
        margin: 'auto',
        position: 'relative',
        height: '100vh',
        fontSize: '1.3rem',
      }}
    >
      <Editor />
      <PagesModal />
    </Box>
  );
};

export default PageComponent;
