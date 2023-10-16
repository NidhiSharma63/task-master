import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ImageIcon from '@mui/icons-material/Image';
import { Box, Button, Typography } from '@mui/material';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { Field, FieldArray } from 'formik';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { IFormikValuesForUpdatingTask } from 'src/common/Interface/Interface';
import { storage } from 'src/firebase/config';
import useFormikInput from 'src/hook/boardDrawer/useFormikInput';
import colors from 'src/theme/variables';
import TitleCase from 'src/utils/TextTransformer';
import convertToBlob from 'src/utils/convertToBlob';
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

/**
 * interface
 */

interface IFile {
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

interface IFormikImage {
  name: string;
  handleSubmit: (values: IFormikValuesForUpdatingTask) => Promise<void>;
}

const FormikImage = (props: IFormikImage) => {
  const { name, handleSubmit } = props;
  const { setFieldValue } = useFormikInput(name);
  const { values } = useFormikInput(name);
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<Blob | null>(null);

  /**
   * open the file manager
   */
  const handleClick = () => {
    inputRef.current?.click();
  };

  /**
   * select the file
   */
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (!event.target.files) return;
    const uploadedFile = event && event.target.files[0];
    if (uploadedFile) {
      const modifiedFile = new File([uploadedFile], uploadedFile.name + v4(), {
        type: uploadedFile.type,
      });
      const updatedModifiedFile = {
        ...modifiedFile,
        lastModifiedDate: uploadedFile.lastModified.toString(),
      };
      // modifiedFile.push({ lastModifiedDate: uploadedFile.lastModified });
      const blobConverted = await convertToBlob(updatedModifiedFile);
      setImages(blobConverted);
      try {
        const imageRef = ref(storage, `/images/${modifiedFile.name}-${v4()}`);
        const snapshot = await uploadBytes(imageRef, modifiedFile);
        const url = await getDownloadURL(snapshot.ref);

        /* first make a copy of all the values after that update the images field because
         * when we update the value using setFieldValue then we are not able to get the updated
         * value at same time so we are manually updating the object and calling the handleSubmit
         * function. but we need to update the setFieldValue[name] because in local we are not
         * updating the task when task is opened so to display the image we need to update the
         * setFieldValue
         */
        const updatedValues = {
          ...values,
          images: [...values.images, url],
        };

        // update the field for images to show the image in local
        setFieldValue(name, [...values[name], url]);

        // set images null to remove the loading state
        setImages(null);
        handleSubmit(updatedValues); // Call handleSubmit with updated values
      } catch (error) {
        toast.error("Couldn't upload the attachment");
        console.error('Error uploading attachment:', error);
      }
    }
  };

  /**
   * delete the attachment
   */

  const deleteimages = (url: string) => {
    const storageRef = ref(storage, url);
    deleteObject(storageRef)
      .then(() => {
        const updatedValues = {
          ...values,
          images: values.images.filter(
            (attachment: string) => attachment !== url,
          ),
        };
        if (updatedValues !== undefined) {
          handleSubmit(updatedValues);
        }
      })
      .catch(() => {
        toast.error("couldn't delete the image");
        console.log('something went wrong while deleting the file');
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {values[name].length > 0 && <Typography>{TitleCase(name)}</Typography>}

      <FieldArray
        name={name}
        render={(arrayHelpers) => {
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              {values[name] && values[name].length > 0
                ? values[name].map((imgUrl: string, index: number) => {
                    return (
                      <Field name={`${name}.${index}.value`} key={index}>
                        {() => {
                          return (
                            <Box
                              sx={{ display: 'flex', alignItems: 'flex-start' }}
                            >
                              <img
                                key={v4()}
                                width={600}
                                height="auto"
                                src={
                                  typeof imgUrl === 'string'
                                    ? imgUrl
                                    : URL.createObjectURL(imgUrl)
                                }
                                alt="attachment"
                              />
                              <DeleteOutlineIcon
                                type="button"
                                sx={{
                                  cursor: 'pointer',
                                  color: colors.textColor,
                                }}
                                className="not-remove-input"
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                  deleteimages(imgUrl);
                                }}
                              />
                            </Box>
                          );
                        }}
                      </Field>
                    );
                  })
                : null}
            </Box>
          );
        }}
      />
      {images && (
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
            src={URL.createObjectURL(images)}
            alt="attachment"
            style={{ borderRadius: '50%', height: '50px', width: '50px' }}
          />
        </Box>
      )}
      <Button
        type="button"
        variant="contained"
        onClick={handleClick}
        sx={{ display: 'flex', gap: 1 }}
      >
        <ImageIcon />
        Add images
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleFileSelect(event)
        }
      />
    </Box>
  );
};

export default FormikImage;
