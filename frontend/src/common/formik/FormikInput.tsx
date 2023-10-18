import { Box, TextField, Typography } from '@mui/material';
import { Field } from 'formik';
import colors from 'src/theme/variables';
import { IField } from '../Interface/Interface';

/**
 * Function that returns custom input component
 * @param {object} props
 * @returns a custom input component for formik to hook into
 */

interface IFormikInput {
  name: string;
  InputProps?: {
    endAdornment: JSX.Element;
  };
  type?: string;
  label: string;
}
function FormikInput(props: IFormikInput) {
  const { name, label, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta }: IField) => {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              mb: 2,
              width: '100%',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{
                maxWidth: '13rem',
                mb: 1,
              }}
              variant="h6"
            >
              {label}
            </Typography>
            <TextField
              id={name}
              error={
                meta !== undefined && meta.error && meta.touched ? true : false
              }
              {...rest}
              {...field}
              sx={{
                width: '100%',
                padding: 0,
                borderColor: 'white',
                '&:focus': {
                  boxShadow: '0 0 2px 2px rgba(0, 0, 255, 0.2)',
                  borderColor: 'red',
                },
                borderRadius: '.3rem',
                backgroundColor: 'white',
                fontSize: '1.2rem',
                '.MuiFormHelperText-root': {
                  m: '0 !important',
                  backgroundColor: colors.offWhite,
                },
              }}
              // outline="none"
              helperText={
                meta !== undefined && meta.touched && meta.error ? (
                  <Typography sx={{}}>{meta.error}</Typography>
                ) : null
              }
            />
          </Box>
        );
      }}
    </Field>
  );
}

export default FormikInput;
