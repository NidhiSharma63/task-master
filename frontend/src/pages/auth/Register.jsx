import {
  Grid,
  Box,
  IconButton,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { Logo } from "../../assets/assets";
import colors from "../../theme/variables";
import InfoPart from "../../components/auth/components/InfoPart";
import { Formik, Form } from "formik";
import { registerSchema } from "../../constant/validation";
import FormikControls from "../../common/formik/FormikControls";
import useRegisterQuery from "../../hook/useRegsiterQuery";
import { useState } from "react";

const Register = () => {
  const { mutate } = useRegisterQuery();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [valuesOfForm, setValuesOfForm] = useState({});

  window.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form default submission behavior

      // Validate the values using the schema
      registerSchema.validateSync(valuesOfForm, { abortEarly: false });
      handleSubmit(valuesOfForm);
    }
  });
  const handleSubmit = (values) => {
    mutate(values);
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            ml: 3,
            height: "2rem",
            padding: ".5rem 0",
          }}
        >
          <IconButton sx={{ width: "3rem" }}>
            <Logo />
          </IconButton>
          <Typography fontWeight={600}>Task Master</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            // border: "1px solid red",
            width: "70%",
            margin: "auto",
            marginTop: "2rem",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "1.7rem",
              }}
            >
              Register
            </Typography>
            <Typography
              sx={{
                marginTop: 3,
                fontWeight: "500",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              Welcome to Task Master. Manage your task with task master and make
              your life productive.
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Formik
              initialValues={initialValues}
              validationSchema={registerSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleSubmit }) => (
                <Form
                  onChange={() => {
                    setValuesOfForm(values);
                  }}
                >
                  <FormikControls control="formikInput" name="email" />
                  <FormikControls control="formikInput" name="password" />
                  <FormikControls
                    control="formikInput"
                    name="confirmPassword"
                  />
                  <Divider
                    sx={{
                      mt: 4,
                      mb: 3,
                    }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: colors.primaryHoverColor,
                        },
                      }}
                    >
                      register
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              mt: 2,
            }}
          >
            <Typography>
              Already have account{" "}
              <a style={{ fontWeight: "700" }} href="/login">
                login
              </a>
            </Typography>
          </Box>
        </Box>
      </Grid>
      <InfoPart />
    </Grid>
  );
};

export default Register;
