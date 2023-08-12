import { Field, FieldArray, useFormikContext } from "formik";
import { Box, Button, TextField } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useCallback, useEffect } from "react";

const FormikInputArray = (props) => {
  const { name } = props;
  const { values, setFieldValue } = useFormikContext();

  const removeAllEmptyField = useCallback(() => {
    if (name) {
      const allValuesOfSubtasks = values?.[name] ?? [];
      if (allValuesOfSubtasks?.length > 0) {
        // filterOut All the values that are no empty
        const allNonEmptyValues = allValuesOfSubtasks?.filter(
          (val) => val.trim() !== ""
        );
        setFieldValue(name, allNonEmptyValues);
      }
    }
  }, [values, setFieldValue, name]);

  useEffect(() => {
    const windowEvent = (e) => {
      if (
        e.target?.classList?.contains("not-remove-input") ||
        e.target?.child?.classList?.contains("not-remove-input") ||
        e.target.tagName === "INPUT" ||
        e.target.tagName === ""
      ) {
        return;
      }
      removeAllEmptyField();
    };
    window.addEventListener("click", windowEvent);
    return () => {
      window.removeEventListener("click", windowEvent);
    };
  }, [removeAllEmptyField]);

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
                            className="not-remove-input"
                          />
                          <DeleteOutlineIcon
                            sx={{
                              cursor: "pointer",
                              color: (theme) => theme.palette.primary.main,
                            }}
                            className="not-remove-input"
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
              className="not-remove-input"
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
