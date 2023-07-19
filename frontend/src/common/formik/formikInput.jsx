import { Field } from "formik";
import React from "react";
import { MuiLabel, MuiTextField } from "src/common";
import { TextField, Typography } from "@mui/material";
import { TitleCase } from "src/utils/TextTransformer";

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
          <>
            <Typography component={"Box"} color="textPrimary" my={1}>
              {TitleCase(name)}
            </Typography>
            <TextField
              id={name}
              variant="outlined"
              size="small"
              fullWidth={true}
              {...rest}
            />
          </>
        );
      }}
    </Field>
  );
}

export default FormikInput;
