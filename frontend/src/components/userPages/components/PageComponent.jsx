import { Box } from '@mui/material';
// import { Editor } from '@tinymce/tinymce-react';
import PagesModal from 'src/components/userPages/components/PagesModal';
import Editor from './Editor';

const PageComponent = () => {
  // const { handleClick, editorRef, innerHTML } = usePage();
  return (
    <Box
      sx={{
        // display: 'flex',
        width: 'calc(100vw - 400px)',
        marginLeft: '1rem',
        // top: '4rem',
        margin: 'auto',
        position: 'relative',
        height: '100vh',
        // alignItems: 'center',
        // justifyContent: 'center',
        fontSize: '1.3rem',
        // border: '1px solid red',
      }}
    >
      <Editor />
      <PagesModal />
    </Box>
  );
};

export default PageComponent;
