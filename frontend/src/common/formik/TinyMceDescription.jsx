import { Box, Button } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { Field } from 'formik';
import { useCallback, useRef } from 'react';
import colors from 'src/theme/variables';

const TinyMceDescription = (props) => {
  const { name, setToggleEditModeForDescription, active_task } = props;
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
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'code',
                ],
                toolbar:
                  'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ',
                content_style: `body { font-family:'Quicksand', sans-serif; font-size:16px; background-color: #353535;color:white}
                 .tox:not(.tox-tinymce-inline) `,
              }}
            />
            <Box sx={{ display: 'flex', alignItem: 'center', gap: 2, mt: 2 }}>
              {active_task.description && (
                <Button
                  sx={{
                    background: 'none',
                    border: `1px solid${colors.lightGrey}`,
                  }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </>
        );
      }}
    </Field>
  );
};

export default TinyMceDescription;
