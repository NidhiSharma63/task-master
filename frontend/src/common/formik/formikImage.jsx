import { Box, Button } from '@mui/material';
import { Field, FieldArray } from 'formik';
import React, { useRef, useState } from 'react';
import useFormikInput from 'src/hook/boardDrawer/useFormikInput';
import { v4 } from 'uuid';

const FormikImage = (props) => {
  const { name } = props;
  const { setFieldValue } = useFormikInput(name);
  const { values } = useFormikInput(name);
  const inputRef = useRef();
  const [attachments, setAttachments] = useState([]);

  /**
   * open the file manager
   */
  const handleClick = () => {
    inputRef.current.click();
  };

  /**
   * select the file
   */
  const handleFileSelect = (event, file) => {
    const uploadedFile = (event && event.target.files[0]) || file;
    const modifiedFile = new File([uploadedFile], uploadedFile.name + v4(), {
      type: uploadedFile.type,
    });
    setAttachments((prev) => [...prev, modifiedFile]);
    setFieldValue(name, [...values[name], modifiedFile]);
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
