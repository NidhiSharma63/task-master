import { Box, MenuItem, Select, Typography } from '@mui/material';
import { Field } from 'formik';
import { IField } from 'src/common/Interface/Interface';
/**
 * interface
 */
interface IObj {
  key: string;
  value: string;
}

interface IFormikSelect {
  name: string;
  values: IObj[];
  label: string;
}

const FormikSelect = (props: IFormikSelect) => {
  const { name, values, label } = props;
  return (
    <Field name={name}>
      {({ field, meta }: IField) => {
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 1, width: '100%' }}>
              {label}
            </Typography>
            <Select
              {...field}
              sx={{
                minWidth: '240px',
                background: 'white',
              }}
            >
              {values.map((item) => (
                <MenuItem key={item.key} value={item.key}>
                  {item.value}
                </MenuItem>
              ))}
            </Select>
            {meta !== undefined && meta.error && (
              <Typography color="red">{meta.error}</Typography>
            )}
          </Box>
        );
      }}
    </Field>
  );
};

export default FormikSelect;
