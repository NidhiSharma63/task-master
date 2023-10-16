import { TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Field } from 'formik';
import TitleCase from 'src/utils/TextTransformer';
// date-fns

/**
 * interface
 */

// interface IFormikDatePicker {
//   name: string;
// }
const FormikDatePicker = (props) => {
  const { name } = props;
  return (
    <Field name={name}>
      {({ form, field }) => {
        // console.log(form, 'this is form', field, '::fiedl');
        const { setFieldValue } = form;
        const { value } = field;

        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Typography sx={{ mb: 1 }} variant="h6">
              {TitleCase(name)}
            </Typography>
            <DatePicker
              name={name}
              value={value}
              inputFormat="MM/dd/yyyy"
              sx={{
                outline: 'none',
                backgroundColor: 'white',
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
                  0,
                );
                // console.log(dateWithNumbers, "Dates with numbers");
                if (date) {
                  setFieldValue(name, dateWithNumbers);
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
                      border: 'none', // Set the desired color for the outline in error state
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
