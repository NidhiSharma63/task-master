import { Box, MenuItem, Select, Typography } from '@mui/material';
import { Field } from 'formik';

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
      {/* {({ field }: any) => {
        // const { setFieldValue } = form;
        // const { value } = field;
        return ( */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1, width: '100%' }}>
          {label}
        </Typography>
        <Select
          // value={value}
          // onChange={(event) => {
          //   setFieldValue(name, event.target.value);
          // }}
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
      </Box>
      {/* );
      }} */}
    </Field>
  );
};

export default FormikSelect;
