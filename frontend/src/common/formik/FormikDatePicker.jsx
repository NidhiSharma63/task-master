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
    <Field name={name}>
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
              value={new Date(value)}
              inputFormat="MM/dd/yyyy"
              sx={{
                outline: "none",
              }}
              onChange={(date) => {
                const dates = new Date(date);
                var dateWithNumbers = new Date(
                  dates.getFullYear(),
                  dates.getMonth(),
                  dates.getDate(),
                  new Date().getHours(),
                  0,
                  0,
                  0
                );
                console.log(dateWithNumbers, "Dates with numbers");
                if (date) {
                  setFieldValue(name, dateWithNumbers);
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
