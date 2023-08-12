import { Field, FieldArray, useFormikContext } from "formik";
import { Box, Button, TextField } from "@mui/material";

const FormikInputArray = (props) => {
  const { name } = props;
  const { values } = useFormikContext();

  console.log(values, "::values");
  return (
    <Box
      mt={2}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <>
            {values[name] && values[name].length > 0
              ? values[name].map((val, index) => (
                  <Field name={`${name}.${index}`} key={index}>
                    {({ field }) => {
                      return (
                        <TextField
                          sx={{ width: "100%" }}
                          {...field}
                          value={val}
                        />
                      );
                    }}
                  </Field>
                ))
              : null}
            <Button
              type="button"
              variant="outlined"
              onClick={() => arrayHelpers.push("")}
            >
              Add a friend
            </Button>
          </>
        )}
      />
    </Box>
  );
};
export default FormikInputArray;
