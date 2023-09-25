import { Box, MenuItem, Select, Typography } from '@mui/material';
import { Field } from 'formik';

const FormikSelect = (props) => {
  const { name, values, mt } = props;
  return (
    <Field name={name}>
      {({ form, field }) => {
        const { setFieldValue } = form;
        const { value } = field;
        return (
          <Box
            sx={{
              mt: mt,
            }}
          >
            <Typography sx={{ fontWeight: 700, mb: 1, width: '100%' }}>
              {name}
            </Typography>
            <Select
              value={value}
              onChange={(event) => {
                setFieldValue(name, event.target.value);
              }}
              sx={{
                minWidth: '240px',
              }}
            >
              {values.map((item) => (
                <MenuItem key={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        );
      }}
    </Field>
  );
};

export default FormikSelect;
