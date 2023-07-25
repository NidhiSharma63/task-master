import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Typography, TextField } from "@mui/material";
import TitleCase from "src/utils/TextTransformer";
import { Field } from "formik";
// date-fns

const FormikDatePicker = (props) => {
  const { name } = props;
  return (
    <Field>
      {({ form, field }) => {
        const { setFieldValue } = form;
        const { value } = field;

        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              {TitleCase(name)}
            </Typography>
            <DatePicker
              name={name}
              value={value}
              sx={{
                outline: "none",
              }}
              onChange={(date) => {
                if (date) {
                  setFieldValue(name, new Date(date));
                } else {
                  setFieldValue(name, null);
                }
              }}
              textField={(params) => (
                <TextField
                  error={form.errors[name]}
                  helperText={form.errors[name] ? form.errors[name] : null}
                  {...params}
                  inputProps={{
                    style: {
                      border: "none", // Set the desired color for the outline in error state
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        );
      }}
    </Field>
  );
};

export default FormikDatePicker;
