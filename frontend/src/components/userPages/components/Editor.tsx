import EditorJS from '@editorjs/editorjs';
import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useDebounce from 'src/hook/useDebounce';
import { useUpdatePage } from 'src/hook/usePagesQuery';
import { tools } from './EditorTool';

const Editor = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams<{ id: string }>();
  const { mutate } = useUpdatePage();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<{ _id: string; content: string }[]>([
    'pages',
  ]);
  const debounceFunc = useDebounce();

  useEffect(() => {
    const currentPage = data?.find(
      (item: { _id: string; content: string }) => item._id === id,
    );
    if (editorRef.current === null) return;
    // Initialize the editor once when the component mounts
    const editor = new EditorJS({
      data: currentPage?.content && JSON.parse(currentPage?.content),
      placeholder: "Let's write an awesome story!",
      holder: editorRef.current,
      onChange: (api, event) => {
        editor
          .save()
          .then((outputData) => {
            if (id === 'string') {
              debounceFunc(
                mutate({
                  _id: id,
                  content: JSON.stringify(outputData),
                }),
                2000,
              );
            }
          })
          .catch((error) => {
            console.log('Saving failed: ', error);
          });
      },
      // @ts-ignore
      tools: tools,
    });
  }, []); // Only run this effect once on mount

  return <Box sx={{ minWidth: '100%' }} ref={editorRef} />;
};

export default Editor;