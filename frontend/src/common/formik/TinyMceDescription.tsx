import { Box, Button } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { Field, FormikValues, useFormikContext } from 'formik';
import { useCallback } from 'react';
import { IField } from 'src/common/Interface/Interface';
import { useAppSelector } from 'src/hook/redux/hooks';
import { taskDataInStore } from 'src/redux/task/taskSlice';
import colors from 'src/theme/variables';

/*
 * interface
 */

interface ITinyMceDescription {
  name: string;
  label: string;
  setToggleEditModeForDescription?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const TinyMceDescription = (props: ITinyMceDescription) => {
  const { name, setToggleEditModeForDescription } = props;
  const { active_task } = useAppSelector(taskDataInStore);
  const { setFieldValue, initialValues } = useFormikContext<FormikValues>();
  /**
   * on cancel set the toggle to false
   */
  const handleCancel = useCallback(() => {
    if (setToggleEditModeForDescription !== undefined) {
      setToggleEditModeForDescription(false);
      setFieldValue(name, initialValues[name]);
    }
  }, [setToggleEditModeForDescription, initialValues, setFieldValue, name]);

  return (
    <Field name={name}>
      {({ field, form }: IField) => {
        const { setFieldValue } = form;
        return (
          <>
            <Editor
              apiKey={process.env.REACT_APP_TINY_MCE_KEY}
              onEditorChange={(content) => {
                setFieldValue(name, content);
              }}
              {...field}
              init={{
                directionality: 'ltr',
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
                    backgroundColor: colors.greyColor,
                    '&:hover': {
                      backgroundColor: colors.greyColor,
                    },
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
