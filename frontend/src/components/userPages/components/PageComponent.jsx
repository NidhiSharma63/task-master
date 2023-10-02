import { Box } from '@mui/material';
// import { Editor } from '@tinymce/tinymce-react';
import PagesModal from 'src/components/userPages/components/PagesModal';
import Editor from './Editor';

const PageComponent = () => {
  // const { handleClick, editorRef, innerHTML } = usePage();
  return (
    <Box
      sx={{
        display: 'flex',
        width: '98%',
        marginLeft: '1rem',
        height: 'calc(100vh - 70px)',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        fontSize: '1.3rem',
      }}
    >
      <Editor />
      <PagesModal />
    </Box>
  );
};

export default PageComponent;
