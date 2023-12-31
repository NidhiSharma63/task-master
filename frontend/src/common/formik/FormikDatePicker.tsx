import { Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Field } from 'formik';
import { IField } from '../Interface/Interface';

/**
 * interface
 */

interface IFormikDatePicker {
  name: string;
  label: string;
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
  const { name, label } = props;
  return (
    <Field name={name}>
      {({ form, field }: IExtendedField) => {
        const { setFieldValue } = form;

        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Typography sx={{ mb: 1 }} variant="h6">
              {label}
            </Typography>
            <DatePicker
              {...field}
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
