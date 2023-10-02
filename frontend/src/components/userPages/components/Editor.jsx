import EditorJS from '@editorjs/editorjs';
import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useUpdatePage } from 'src/hook/usePagesQuery';
import { tools } from './EditorTool';

const Editor = () => {
  const editorRef = useRef(null);
  const { id } = useParams();
  console.log(id, '::::d');
  const { mutate } = useUpdatePage();
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(['pages']) ?? {};

  useEffect(() => {
    const currentPage = data?.find((item) => item._id === id);
    // Initialize the editor once when the component mounts
    const editor = new EditorJS({
      data: currentPage?.content && JSON.parse(currentPage?.content),
      placeholder: "Let's write an awesome story!",
      holder: editorRef.current,
      onChange: (api, event) => {
        editor
          .save()
          .then((outputData) => {
            console.log('output - onchange', outputData);
            mutate({
              _id: id,
              content: JSON.stringify(outputData),
            });
            localStorage.setItem('text', JSON.stringify(outputData));
          })
          .catch((error) => {
            console.log('Saving failed: ', error);
          });
      },
      tools: tools,
    });

    // Return a cleanup function to destroy the editor when the component unmounts
    // return () => {
    //   if (editor) {
    //     editor?.destroy();
    //   }
    // };
  }, []); // Only run this effect once on mount

  return <Box sx={{ minWidth: '100%' }} ref={editorRef} />;
};

export default Editor;
