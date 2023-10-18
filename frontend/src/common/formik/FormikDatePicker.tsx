import { Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Field } from 'formik';
import TitleCase from 'src/utils/TextTransformer';
import { IField } from '../Interface/Interface';

/**
 * interface
 */

interface IFormikDatePicker {
  name: string;
}
interface IExtendedField extends Omit<IField, 'field'> {
  field: {
    name: string;
    onBlur: () => void;
    onChange: () => void;
    value: Date;
  };
}
const FormikDatePicker = (props: IFormikDatePicker) => {
  const { name } = props;
  return (
    <Field name={name}>
      {({ form, field }: IExtendedField) => {
        // console.log(form, 'this is form', field, '::fiedl');
        const { setFieldValue } = form;
        // const { value } = field;

        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Typography sx={{ mb: 1 }} variant="h6">
              {TitleCase(name)}
            </Typography>
            <DatePicker
              // name={name}
              // value={value}
              {...field}
              // inputFormat="MM/dd/yyyy"
              sx={{
                backgroundColor: 'white',
              }}
              onChange={(date: Date | null): void => {
                if (date) {
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
                  setFieldValue(name, dateWithNumbers);
                } else {
                  setFieldValue(name, null);
                }
              }}
            />
            {/* <TextField
              error={form.errors[name]}
              helperText={form.errors[name] ? form.errors[name] : null}
              inputProps={{
                style: {
                  border: 'none', // Set the desired color for the outline in error state
                },
              }} */}
            {/* /> */}
            {console.log(form.errors[name], 'Error')}
            {form.errors[name] && (
              <Typography sx={{ color: 'red' }}>{form.errors[name]}</Typography>
            )}
          </LocalizationProvider>
        );
      }}
    </Field>
  );
};

export default FormikDatePicker;
