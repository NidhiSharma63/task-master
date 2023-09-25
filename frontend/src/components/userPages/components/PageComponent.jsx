import { Box, Button } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import PagesModal from 'src/components/userPages/components/PagesModal';

import usePage from 'src/hook/page/usePage';

const PageComponent = () => {
  const { handleClick, editorRef, innerHTML } = usePage();
  return (
    <Box
      sx={{
        display: 'flex',
        width: '98%',
        marginLeft: '1rem',
        height: 'calc(100vh - 70px)',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
    >
      <Button
        variant="contained"
        sx={{
          position: 'fixed',
          right: '1rem',
          top: '5rem',
          color: 'white',
          fontSize: '.7rem',
          zIndex: 99,
        }}
        onClick={handleClick}
      >
        Save
      </Button>
      <Editor
        apiKey="your-api-key"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={innerHTML}
        init={{
          content_css: 'dark',
          height: '100%',
          width: '100%',
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: `body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: rgb(18,18,18);color:white}
           .tox-toolbar { background-color: black; }
           .tox:not(.tox-tinymce-inline) .tox-editor-header{
            background-color: black;
           }`,
        }}
      />
      <PagesModal />
    </Box>
  );
};

export default PageComponent;
