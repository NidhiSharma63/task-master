import { Box, Button } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Field, FieldArray } from 'formik';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { storage } from 'src/firebase/config';
import useFormikInput from 'src/hook/boardDrawer/useFormikInput';
import { v4 } from 'uuid';

const keyframes = {
  '@keyframes rotateClockwise': {
    '0%': {
      transform: 'rotate(0deg)',
      boxShadow: '1px 1px 0px 0px orange inset',
    },
    '100%': {
      transform: 'rotate(360deg)',
      boxShadow: '1px 1px 0px 0px orange inset',
    },
  },
};

const FormikImage = (props) => {
  const { name, handleSubmit } = props;
  const { setFieldValue } = useFormikInput(name);
  const { values } = useFormikInput(name);
  const inputRef = useRef();
  const [attachments, setAttachments] = useState(null);

  /**
   * open the file manager
   */
  const handleClick = () => {
    inputRef.current.click();
  };

  /**
   * select the file
   */
  const handleFileSelect = async (event, file) => {
    const uploadedFile = (event && event.target.files[0]) || file;
    if (uploadedFile) {
      const modifiedFile = new File([uploadedFile], uploadedFile.name + v4(), {
        type: uploadedFile.type,
      });
      setAttachments(modifiedFile);
      try {
        const imageRef = ref(storage, `/images/${modifiedFile.name}-${v4()}`);
        const snapshot = await uploadBytes(imageRef, modifiedFile);
        const url = await getDownloadURL(snapshot.ref);

        /* first make a copy of all the values after that update the attachments field because
         * when we update the value using setFieldValue then we are not able to get the updated
         * value at same time so we are manually updating the object and calling the handleSubmit
         * function. but we need to update the setFieldValue[name] because in local we are not
         * updating the task when task is opened so to display the image we need to update the
         * setFieldValue
         */
        const updatedValues = {
          ...values,
          attachments: [...values.attachments, url],
        };

        // update the field for attachments to show the image in local
        setFieldValue(name, [...values[name], url]);

        // set attachments null to remove the loading state
        setAttachments(null);
        handleSubmit(updatedValues); // Call handleSubmit with updated values
      } catch (error) {
        toast.error("Couldn't upload the attachment");
        console.error('Error uploading attachment:', error);
      }
    }
  };

  return (
    <Box
      mt={2}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <FieldArray
        name={name}
        render={(arrayHelpers) => {
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // border: "1px solid red",
                width: '100%',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              {values[name] && values[name].length > 0
                ? values[name].map((task, index) => (
                    <Field name={`${name}.${index}.value`} key={index}>
                      {({ field }) => {
                        return (
                          <img
                            key={v4()}
                            width={350}
                            height="auto"
                            src={
                              typeof task === 'string'
                                ? task
                                : URL.createObjectURL(task)
                            }
                            alt="attachment"
                          />
                        );
                      }}
                    </Field>
                  ))
                : null}
            </Box>
          );
        }}
      />
      {attachments && (
        <Box
          sx={{
            display: 'flex',
            borderRadius: ' 50%',
            padding: '0.5rem',
            boxShadow: '1px 4px 0px 0px orange inset',
            animation: 'rotateClockwise 1s linear infinite',
            ...keyframes,
          }}
        >
          <img
            width={100}
            height="auto"
            src={URL.createObjectURL(attachments)}
            alt="attachment"
            style={{ borderRadius: '50%', height: '50px', width: '50px' }}
          />
        </Box>
      )}
      <Button type="button" variant="contained" onClick={handleClick}>
        Add Attachments
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
    </Box>
  );
};

export default FormikImage;
