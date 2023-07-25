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
        // console.log(field, "::field input");
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              mb: 2,
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                maxWidth: "13rem",
                mb: 1,
              }}
            >
              {name === "email" ? TitleCase("e-mail") : TitleCase(name)}
            </Typography>
            <TextField
              id={name}
              error={meta.error && meta.touched}
              {...rest}
              {...field}
              sx={{
                width: "100%",
                padding: 0,
                borderColor: (theme) => theme.palette.grey[50],
                "&:focus": {
                  outline: "none", // Change this to the desired border color on focus.
                  boxShadow: "0 0 2px 2px rgba(0, 0, 255, 0.2)", // Optional: Add a box-shadow for visual emphasis.
                },
                borderRadius: ".3rem",
              }}
              outline="none"
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
