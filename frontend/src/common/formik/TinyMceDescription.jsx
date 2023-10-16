import { Box, Button } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { Field } from 'formik';
import { useCallback, useRef } from 'react';
import { useAppSelector } from 'src/hook/redux/hooks';
import { taskDataInStore } from 'src/redux/task/taskSlice';
import colors from 'src/theme/variables';

const TinyMceDescription = (props) => {
  const { name, setToggleEditModeForDescription } = props;
  const { active_task } = useAppSelector(taskDataInStore);
  const editorRef = useRef();
  /**
   * on cancel set the toggle to false
   */
  const handleCancel = useCallback(() => {
    setToggleEditModeForDescription(false);
  }, [setToggleEditModeForDescription]);

  return (
    <Field name={name}>
      {({ field, form }) => {
        const { value } = field;
        const { setFieldValue } = form;
        return (
          <>
            <Editor
              apiKey={process.env.REACT_APP_TINY_MCE_KEY}
              onInit={(evt, editor) => (editorRef.current = editor)}
              onChange={() => {
                setFieldValue(name, editorRef.current.getContent());
              }}
              initialValue={value}
              init={{
                content_css: 'dark',
                entity_encoding: 'raw',
                button_tile_map: true,
                height: '100%',
                width: '100%',
                menubar: false,
                plugins: [
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'charmap',
                  'preview',
                  'anchor',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'code',
                ],
                toolbar:
                  'undo redo | blocks |  code' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ',
                content_style: `body { font-family:'Quicksand', sans-serif; font-size:16px; background-color: white;color:#3E3A3A}
                 .tox:not(.tox-tinymce-inline) `,
              }}
            />
            {active_task.description && (
              <Box sx={{ display: 'flex', alignItem: 'center', gap: 2, mt: 2 }}>
                <Button
                  sx={{
                    background: 'none',
                    border: `1px solid${colors.lightGrey}`,
                  }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </>
        );
      }}
    </Field>
  );
};

export default TinyMceDescription;
