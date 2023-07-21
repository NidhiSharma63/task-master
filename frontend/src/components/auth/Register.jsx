// import { useState } from "react";
// import axiosRequest from "../utils/axiosRequest";
import {
  Grid,
  Box,
  IconButton,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { Logo } from "src/assets/assets";
import colors from "src/theme/variables";
import InfoPart from "src/components/auth/components/InfoPart";
import { Formik, Form } from "formik";
import { registerSchema } from "src/constant/validation";
import FormikControls from "src/common/formik/FormikControls";
import userRegisterQuery from "src/hook/useRegsiterQuery";

const Register = () => {
  const { mutate } = userRegisterQuery();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values) => {
    mutate(values);
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={6}
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
            marginTop: "5rem",
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
              <Form>
                <FormikControls control="formikInput" name="email" />
                <FormikControls control="formikInput" name="password" />
                <FormikControls control="formikInput" name="confirmPassword" />
                <Divider
                  sx={{
                    mt: 4,
                    mb: 3,
                  }}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    sx={{
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                      "&:hover": {
                        backgroundColor: colors.primaryHoverColor,
                      },
                    }}
                  >
                    register
                  </Button>
                </Box>
              </Form>
            </Formik>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              mt: 4,
            }}
          >
            <Typography>
              Don't have account{" "}
              <a style={{ fontWeight: "700" }} href="/register">
                sign up
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

// const [userValue, setUserValue] = useState({
//   email: "",
//   password: "",
//   confirmPassword: "",
// });

// const handleChange = (event) => {
//   console.log(event.target.name, event.target.value);
//   setUserValue({
//     ...userValue,
//     [event.target.name]: event.target.value,
//   });
// };

// const handleSubmit = async (event) => {
//   event.preventDefault();

//   if (userValue.password !== userValue.confirmPassword) {
//     window.alert("password should be matched with confrim password");
//     return;
//   }
//   axiosRequest({ method: "post", url: "/register", data: userValue });
// };

/* <div className="App">
  <form onSubmit={handleSubmit}>
    <input
      name="email"
      type="email"
      value={userValue.email}
      onChange={handleChange}
      required={true}
    />
    <input
      name="password"
      type="password"
      value={userValue.password}
      onChange={handleChange}
      required={true}
    />
    <input
      name="confirmPassword"
      type="password"
      value={userValue.confirmPassword}
      onChange={handleChange}
      required={true}
    />
    <button type="submit"> submit </button>
  </form>
  </div> */
