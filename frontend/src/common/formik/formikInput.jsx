import { Field } from "formik";
import React from "react";
import { TextField, Typography, Box } from "@mui/material";
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 5,
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              {name === "email" ? TitleCase("e-mail") : TitleCase(name)}
            </Typography>
            <TextField
              id={name}
              error={meta.error && meta.touched}
              {...rest}
              {...field}
              placeholder="Enter your email here"
              sx={{
                width: "60%",
                border: meta.error && meta.touched ? "" : "1px solid",
                borderColor: (theme) => theme.palette.grey[50],
              }}
              helperText={
                meta.touched && meta.error ? (
                  <Typography>{meta.error}</Typography>
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
