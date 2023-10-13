import { Box, TextField, Typography } from '@mui/material';
import { Field } from 'formik';
import React from 'react';
import colors from 'src/theme/variables';
import TitleCase from 'src/utils/TextTransformer';

/**
 * Function that returns custom input component
 * @param {object} props
 * @returns a custom input component for formik to hook into
 */

function FormikInput(props) {
  const { name, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta }) => {
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
              {name === 'email' ? TitleCase('e-mail') : TitleCase(name)}
            </Typography>
            <TextField
              id={name}
              error={meta.error && meta.touched}
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
                meta.touched && meta.error ? (
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
