import { Field, FieldArray, useFormikContext } from "formik";
import { Box, Button, TextField } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            // border: "1px solid red",
                            width: "100%",
                            gap: 2,
                          }}
                        >
                          <TextField
                            sx={{ width: "100%" }}
                            {...field}
                            value={val}
                          />
                          <DeleteOutlineIcon
                            sx={{
                              cursor: "pointer",
                              color: (theme) => theme.palette.primary.main,
                            }}
                            onClick={() => arrayHelpers.remove(index)}
                          />
                        </Box>
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
              Sub task
            </Button>
          </>
        )}
      />
    </Box>
  );
};
export default FormikInputArray;
