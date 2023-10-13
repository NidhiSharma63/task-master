import { Box, TextField, Typography } from '@mui/material';
import { Field } from 'formik';
import TitleCase from 'src/utils/TextTransformer';

const FormikTextArea = (props) => {
  const { name, ...rest } = props;
  return (
    <Field name={name}>
      {({ field }) => {
        return (
          <Box
            sx={{
              mt: 2,
            }}
          >
            <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h6">
              {TitleCase(name)}
            </Typography>
            <TextField
              {...field}
              multiline
              {...rest}
              rows={5}
              sx={{
                width: '100%',
              }}
            />
          </Box>
        );
      }}
    </Field>
  );
};

export default FormikTextArea;
