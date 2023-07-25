import { Box, TextField, Typography } from "@mui/material";
import { Field } from "formik";
import TitleCase from "src/utils/TextTransformer";

const FormikTextArea = (props) => {
  const { name, ...rest } = props;
  return (
    <Field name={name}>
      {({ field }) => {
        console.log(field, "::field input");

        const { value } = field;
        const { description } = value;
        console.log(description, "des");
        return (
          <Box
            sx={{
              mt: 2,
            }}
          >
            <Typography sx={{ fontWeight: 700, mb: 1 }}>
              {TitleCase(name)}
            </Typography>
            <TextField
              {...field}
              multiline
              {...rest}
              rows={8}
              sx={{
                height: "9rem",
                width: "100%",
              }}
            />
          </Box>
        );
      }}
    </Field>
  );
};

export default FormikTextArea;
